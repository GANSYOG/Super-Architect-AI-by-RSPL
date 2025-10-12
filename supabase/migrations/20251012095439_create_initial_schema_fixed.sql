/*
  # Initial Database Schema for SuperArchitect AI

  ## Overview
  Complete database schema for architectural design platform with authentication,
  project management, collaboration, and version control capabilities.

  ## New Tables
  
  ### 1. `profiles` - User profiles
  ### 2. `projects` - Main project records
  ### 3. `project_collaborators` - Project sharing and collaboration
  ### 4. `project_versions` - Version control for designs
  ### 5. `design_sessions` - Saved design sessions
  ### 6. `ai_generations` - AI generation history
  
  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own data
  - Project collaborators have appropriate access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'architect' CHECK (role IN ('architect', 'client', 'contractor', 'admin')),
  company text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text NOT NULL DEFAULT '',
  type text NOT NULL CHECK (type IN ('Residential', 'Commercial')),
  subtype text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
  description text,
  project_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  thumbnail_url text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create project_collaborators table (must come after projects)
CREATE TABLE IF NOT EXISTS project_collaborators (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  invited_by uuid NOT NULL REFERENCES auth.users(id),
  invited_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

ALTER TABLE project_collaborators ENABLE ROW LEVEL SECURITY;

-- Now create projects policies that reference project_collaborators
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM project_collaborators
      WHERE project_collaborators.project_id = projects.id
      AND project_collaborators.user_id = auth.uid()
    ) OR
    is_public = true
  );

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM project_collaborators
      WHERE project_collaborators.project_id = projects.id
      AND project_collaborators.user_id = auth.uid()
      AND project_collaborators.role IN ('editor', 'admin')
    )
  )
  WITH CHECK (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM project_collaborators
      WHERE project_collaborators.project_id = projects.id
      AND project_collaborators.user_id = auth.uid()
      AND project_collaborators.role IN ('editor', 'admin')
    )
  );

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid());

-- Create project_collaborators policies
CREATE POLICY "Collaborators can view their collaborations"
  ON project_collaborators FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_collaborators.project_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Project owners can manage collaborators"
  ON project_collaborators FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_collaborators.project_id
      AND projects.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_collaborators.project_id
      AND projects.owner_id = auth.uid()
    )
  );

-- Create project_versions table
CREATE TABLE IF NOT EXISTS project_versions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version_number integer NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, version_number)
);

ALTER TABLE project_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view versions of accessible projects"
  ON project_versions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_versions.project_id
      AND (
        projects.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM project_collaborators
          WHERE project_collaborators.project_id = projects.id
          AND project_collaborators.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can create versions for editable projects"
  ON project_versions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_versions.project_id
      AND (
        projects.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM project_collaborators
          WHERE project_collaborators.project_id = projects.id
          AND project_collaborators.user_id = auth.uid()
          AND project_collaborators.role IN ('editor', 'admin')
        )
      )
    ) AND
    created_by = auth.uid()
  );

-- Create design_sessions table
CREATE TABLE IF NOT EXISTS design_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type text NOT NULL CHECK (session_type IN ('revamp', 'generation', 'inspiration', 'agent')),
  session_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE design_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON design_sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create sessions"
  ON design_sessions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own sessions"
  ON design_sessions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own sessions"
  ON design_sessions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create ai_generations table
CREATE TABLE IF NOT EXISTS ai_generations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt text NOT NULL,
  generation_type text NOT NULL CHECK (generation_type IN ('image', 'plan', 'design', 'render')),
  result_data jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generations"
  ON ai_generations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create generations"
  ON ai_generations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_owner ON projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_versions_project ON project_versions(project_id);
CREATE INDEX IF NOT EXISTS idx_collaborators_project ON project_collaborators(project_id);
CREATE INDEX IF NOT EXISTS idx_collaborators_user ON project_collaborators(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON design_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_user ON ai_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_project ON ai_generations(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON design_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();