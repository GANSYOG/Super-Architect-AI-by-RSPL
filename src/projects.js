import { supabase } from './supabase.js';

export class ProjectManager {
  async createProject(projectData) {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProject(projectId, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getProject(projectId) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getUserProjects(userId, status = null) {
    let query = supabase
      .from('projects')
      .select('*')
      .eq('owner_id', userId)
      .order('updated_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async deleteProject(projectId) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
  }

  async saveVersion(projectId, versionData, notes = '') {
    const latestVersion = await this.getLatestVersion(projectId);
    const versionNumber = (latestVersion?.version_number || 0) + 1;

    const { data, error } = await supabase
      .from('project_versions')
      .insert([{
        project_id: projectId,
        version_number: versionNumber,
        data: versionData,
        notes,
        created_by: (await supabase.auth.getUser()).data.user.id
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLatestVersion(projectId) {
    const { data, error } = await supabase
      .from('project_versions')
      .select('*')
      .eq('project_id', projectId)
      .order('version_number', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getVersionHistory(projectId) {
    const { data, error } = await supabase
      .from('project_versions')
      .select('*')
      .eq('project_id', projectId)
      .order('version_number', { ascending: false });

    if (error) throw error;
    return data;
  }

  async addCollaborator(projectId, userId, role = 'viewer') {
    const currentUser = (await supabase.auth.getUser()).data.user;

    const { data, error } = await supabase
      .from('project_collaborators')
      .insert([{
        project_id: projectId,
        user_id: userId,
        role,
        invited_by: currentUser.id
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCollaborators(projectId) {
    const { data, error } = await supabase
      .from('project_collaborators')
      .select(`
        *,
        profiles:user_id (full_name, avatar_url, company)
      `)
      .eq('project_id', projectId);

    if (error) throw error;
    return data;
  }

  async removeCollaborator(collaboratorId) {
    const { error } = await supabase
      .from('project_collaborators')
      .delete()
      .eq('id', collaboratorId);

    if (error) throw error;
  }
}

export const projectManager = new ProjectManager();
