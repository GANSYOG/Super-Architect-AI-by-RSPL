import { authManager } from './auth.js';
import { projectManager } from './projects.js';
import { sessionManager } from './sessions.js';
import { showToast } from './utils.js';

export class App {
  constructor() {
    this.currentStudio = 'architecture';
    this.projectForm = {};
    this.generatedProject = null;
    this.chatHistory = [];
    this.isGenerating = false;
    this.uploadedImage = null;
    this.revampedImage = null;
    this.virtualItems = [];
    this.currentProjectId = null;
  }

  async initialize() {
    const authScreen = document.getElementById('auth-screen');
    const appContainer = document.getElementById('app');

    const user = await authManager.initialize();

    if (!user) {
      authScreen.classList.remove('hidden');
      appContainer.classList.add('hidden');
      this.setupAuthScreenListeners();
    } else {
      authScreen.classList.add('hidden');
      appContainer.classList.remove('hidden');
      await this.initializeApp();
    }

    authManager.onAuthChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        authScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
        this.initializeApp();
      } else if (event === 'SIGNED_OUT') {
        authScreen.classList.remove('hidden');
        appContainer.classList.add('hidden');
      }
    });
  }

  setupAuthScreenListeners() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabName = tab.dataset.tab;
        if (tabName === 'signin') {
          signinForm.classList.remove('hidden');
          signupForm.classList.add('hidden');
        } else {
          signinForm.classList.add('hidden');
          signupForm.classList.remove('hidden');
        }
      });
    });

    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signin-email').value;
      const password = document.getElementById('signin-password').value;

      try {
        await authManager.signIn(email, password);
        showToast('Successfully signed in!');
      } catch (error) {
        showToast(error.message, 'error');
      }
    });

    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      try {
        await authManager.signUp(email, password, name);
        showToast('Account created! Please check your email.');
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }

  async initializeApp() {
    await this.loadUserProfile();
    this.setupEventListeners();
    this.renderCurrentStudio();
    await this.loadSavedData();
  }

  async loadUserProfile() {
    try {
      const profile = await authManager.getProfile();
      if (profile) {
        document.getElementById('user-name-display').textContent = profile.full_name || 'User';
        document.getElementById('user-role-display').textContent =
          profile.role.charAt(0).toUpperCase() + profile.role.slice(1);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  setupEventListeners() {
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        const studio = e.currentTarget.dataset.studio;
        this.switchStudio(studio);
      });
    });

    document.querySelectorAll('.modal-close').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.dataset.modal;
        this.closeModal(modalId);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        const modal = e.currentTarget.closest('.modal');
        if (modal) {
          modal.classList.add('hidden');
        }
      });
    });

    document.getElementById('ai-assistant-btn').addEventListener('click', () => {
      this.openModal('ai-assistant-modal');
    });

    document.getElementById('send-message').addEventListener('click', () => this.sendChatMessage());
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendChatMessage();
      }
    });

    const userProfileBtn = document.getElementById('user-profile-btn');
    const userMenu = document.getElementById('user-menu');

    userProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      if (!userMenu.classList.contains('hidden')) {
        userMenu.classList.add('hidden');
      }
    });

    document.getElementById('sign-out-btn').addEventListener('click', async () => {
      try {
        await authManager.signOut();
        showToast('Signed out successfully');
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }

  switchStudio(studioName) {
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.classList.remove('active');
    });
    document.querySelector(`[data-studio="${studioName}"]`).classList.add('active');

    this.currentStudio = studioName;
    this.renderCurrentStudio();
  }

  renderCurrentStudio() {
    const studioContent = document.getElementById('studio-content');
    const contextualContent = document.getElementById('contextual-content');

    switch (this.currentStudio) {
      case 'portfolio':
        this.renderPortfolio(studioContent, contextualContent);
        break;
      case 'architecture':
        this.renderArchitectureStudio(studioContent, contextualContent);
        break;
      case 'interior':
        this.renderInteriorRevampStudio(studioContent, contextualContent);
        break;
      case 'inspiration':
        this.renderInspirationHub(studioContent, contextualContent);
        break;
      case 'superhuman':
        this.renderSuperhumanDesigner(studioContent, contextualContent);
        break;
      case 'agent':
        this.renderAgentDesigner(studioContent, contextualContent);
        break;
    }
  }

  async renderPortfolio(content, contextual) {
    content.innerHTML = `
      <div class="studio-header">
        <h1 class="studio-title">My Projects</h1>
        <p class="studio-description">View and manage your architectural projects</p>
      </div>
      <div id="projects-grid" class="projects-grid">
        <div class="loading-state">
          <i class="fas fa-spinner fa-spin"></i> Loading projects...
        </div>
      </div>
    `;

    contextual.innerHTML = `
      <h3>Portfolio</h3>
      <p>All your architectural projects in one place</p>
      <div class="contextual-stats">
        <div class="stat-item">
          <strong id="project-count">0</strong> Projects
        </div>
      </div>
    `;

    try {
      const projects = await projectManager.getUserProjects(authManager.getUser().id);
      const projectsGrid = document.getElementById('projects-grid');

      if (projects.length === 0) {
        projectsGrid.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-folder-open"></i>
            <h3>No projects yet</h3>
            <p>Create your first architectural design project</p>
            <button class="btn btn--primary" onclick="app.switchStudio('architecture')">
              <i class="fas fa-plus"></i> New Project
            </button>
          </div>
        `;
      } else {
        projectsGrid.innerHTML = projects.map(project => `
          <div class="project-card" data-project-id="${project.id}">
            <div class="project-thumbnail" style="background-image: url('${project.thumbnail_url || '/api/placeholder/400/300'}')"></div>
            <div class="project-card-content">
              <h3>${project.name}</h3>
              <p>${project.location}</p>
              <div class="project-meta">
                <span class="status status--${project.status}">${project.status}</span>
                <span class="project-type">${project.type}</span>
              </div>
              <div class="project-actions">
                <button class="btn btn--sm btn--primary" onclick="app.openProject('${project.id}')">
                  <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn--sm btn--secondary" onclick="app.deleteProjectConfirm('${project.id}')">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        `).join('');

        document.getElementById('project-count').textContent = projects.length;
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      showToast('Failed to load projects', 'error');
    }
  }

  async openProject(projectId) {
    try {
      const project = await projectManager.getProject(projectId);
      if (project) {
        this.generatedProject = {
          ...project.project_data,
          id: project.id,
          name: project.name,
          location: project.location
        };
        this.currentProjectId = project.id;
        this.switchStudio('architecture');
      }
    } catch (error) {
      console.error('Error opening project:', error);
      showToast('Failed to open project', 'error');
    }
  }

  async deleteProjectConfirm(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectManager.deleteProject(projectId);
        showToast('Project deleted successfully');
        this.renderPortfolio(
          document.getElementById('studio-content'),
          document.getElementById('contextual-content')
        );
      } catch (error) {
        console.error('Error deleting project:', error);
        showToast('Failed to delete project', 'error');
      }
    }
  }

  async loadSavedData() {
    if (this.currentStudio === 'architecture') {
      const projects = await projectManager.getUserProjects(authManager.getUser().id);
      const lastProject = projects[0];
      if (lastProject) {
        this.generatedProject = {
          ...lastProject.project_data,
          id: lastProject.id,
          name: lastProject.name,
          location: lastProject.location
        };
        this.currentProjectId = lastProject.id;
        this.renderCurrentStudio();
      }
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }

  sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message) return;

    this.addChatMessage(message, 'user');
    input.value = '';

    setTimeout(() => {
      const responses = [
        "Great question! In architectural design, it's important to consider both form and function.",
        "I can help you with that! Material selection depends on durability, sustainability, cost, and aesthetics.",
        "Modern architecture emphasizes clean lines, open spaces, and natural light integration.",
        "For sustainability, focus on energy efficiency, renewable materials, and passive design strategies.",
        'Spatial flow, lighting, and material choices all contribute to the overall architectural experience.'
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];
      this.simulateTypingResponse(response);
    }, 1000);
  }

  addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
      </div>
      <div class="message-content">
        <p>${message}</p>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  simulateTypingResponse(response) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';

    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <p id="typing-response"></p>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);

    const typingElement = document.getElementById('typing-response');
    let currentIndex = 0;

    function typeNextCharacter() {
      if (currentIndex < response.length) {
        typingElement.textContent += response[currentIndex];
        currentIndex++;
        setTimeout(typeNextCharacter, 30);
      }
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    typeNextCharacter();
  }

  renderArchitectureStudio(content, contextual) {
    throw new Error('Method must be implemented by importing from original app.js');
  }

  renderInteriorRevampStudio(content, contextual) {
    throw new Error('Method must be implemented by importing from original app.js');
  }

  renderInspirationHub(content, contextual) {
    throw new Error('Method must be implemented by importing from original app.js');
  }

  renderSuperhumanDesigner(content, contextual) {
    throw new Error('Method must be implemented by importing from original app.js');
  }

  renderAgentDesigner(content, contextual) {
    throw new Error('Method must be implemented by importing from original app.js');
  }
}
