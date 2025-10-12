# SuperArchitect AI - Professional Architectural Design Platform

A production-ready, full-stack architectural design platform powered by AI and Supabase. Create, manage, and collaborate on architectural projects with intelligent AI agents.

## Features

### Core Functionality
- **User Authentication** - Secure email/password authentication with Supabase Auth
- **Project Management** - Create, edit, and organize architectural projects
- **Portfolio Gallery** - View all your projects in a beautiful grid layout
- **Real-time Database** - All data persisted to Supabase PostgreSQL
- **Version Control** - Track design iterations with version history
- **Collaboration** - Share projects with team members (viewers, editors, admins)

### AI-Powered Studios
- **Architecture Studio** - Generate comprehensive architectural designs
- **Interior Revamp** - Transform existing spaces with AI redesign
- **Inspiration Hub** - Browse expert architectural templates
- **Superhuman Designer** - High-fidelity image generation
- **Agent Team Designer** - Customize your AI team

### Design System
- **Professional Theme** - Architectural color palette with teal and slate
- **Dark Mode** - Automatic dark/light mode based on system preferences
- **Responsive** - Works on desktop, tablet, and mobile
- **Accessible** - WCAG compliant with keyboard navigation

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6 Modules), HTML5, CSS3
- **Build Tool**: Vite
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: Custom design system with CSS variables
- **Charts**: Chart.js
- **Icons**: Font Awesome

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/superarchitect-ai.git
cd superarchitect-ai
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
The `.env` file should already contain your Supabase credentials. Verify:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Run development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Database Schema

### Tables
- **profiles** - User profile information
- **projects** - Main project records
- **project_versions** - Version history for designs
- **project_collaborators** - Project sharing and permissions
- **design_sessions** - Saved design sessions
- **ai_generations** - AI generation history

All tables have Row Level Security (RLS) enabled for secure data access.

## Project Structure

```
superarchitect-ai/
├── src/
│   ├── auth.js           # Authentication manager
│   ├── projects.js       # Project CRUD operations
│   ├── sessions.js       # Session management
│   ├── supabase.js       # Supabase client
│   └── utils.js          # Utility functions
├── app-new.js            # Main application logic
├── index.html            # HTML entry point
├── style.css             # Global styles
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Architecture

### Modular Design
The application is built with a modular architecture:
- **AuthManager** - Handles all authentication logic
- **ProjectManager** - Manages project CRUD operations
- **SessionManager** - Handles design session persistence

### Security
- Row Level Security (RLS) on all database tables
- Secure authentication with Supabase Auth
- Environment variables for sensitive data
- XSS protection with content security policy

### Performance
- Optimized bundle with Vite
- Code splitting for faster initial load
- Lazy loading of non-critical resources
- Efficient database queries with proper indexing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Key Features

### Authentication
- Email/password sign up and sign in
- Automatic profile creation
- Persistent sessions
- User menu with profile settings

### Project Management
- Create new projects with detailed specifications
- Save projects to database automatically
- View all projects in portfolio gallery
- Edit existing projects
- Delete projects with confirmation
- Project status tracking (draft, in_progress, completed)

### Collaboration (Ready for Implementation)
- Add collaborators to projects
- Role-based permissions (viewer, editor, admin)
- Share project links
- Real-time updates

### Version Control
- Automatic version snapshots
- Version comparison
- Rollback to previous versions
- Version notes and changelog

## API Reference

### AuthManager
```javascript
await authManager.signUp(email, password, fullName)
await authManager.signIn(email, password)
await authManager.signOut()
await authManager.getProfile()
await authManager.updateProfile(updates)
```

### ProjectManager
```javascript
await projectManager.createProject(projectData)
await projectManager.updateProject(projectId, updates)
await projectManager.getProject(projectId)
await projectManager.getUserProjects(userId)
await projectManager.deleteProject(projectId)
await projectManager.saveVersion(projectId, versionData, notes)
await projectManager.getVersionHistory(projectId)
```

### SessionManager
```javascript
await sessionManager.saveSession(type, data, thumbnail)
await sessionManager.updateSession(sessionId, data)
await sessionManager.getSessions(type)
await sessionManager.deleteSession(sessionId)
```

## Roadmap

### Phase 1 (Completed)
- [x] Authentication system
- [x] Database schema
- [x] Project management
- [x] Portfolio gallery
- [x] Version control
- [x] Responsive UI

### Phase 2 (In Progress)
- [ ] AI generation integration
- [ ] Image upload to Supabase Storage
- [ ] Export functionality (PDF, DWG)
- [ ] Collaboration features
- [ ] Real-time notifications

### Phase 3 (Planned)
- [ ] Advanced AI features
- [ ] 3D visualization
- [ ] Mobile app
- [ ] Team workspaces
- [ ] Payment integration

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

ISC

## Support

For support, email support@superarchitect.ai or open an issue on GitHub.

## Acknowledgments

- Supabase for the backend infrastructure
- Chart.js for visualization
- Font Awesome for icons
- Perplexity design system for design inspiration
