import { authManager } from './src/auth.js';
import { projectManager } from './src/projects.js';
import { sessionManager } from './src/sessions.js';
import { showToast } from './src/utils.js';

let appState = {
  currentStudio: 'architecture',
  projectForm: {},
  generatedProject: null,
  chatHistory: [],
  isGenerating: false,
  uploadedImage: null,
  revampedImage: null,
  virtualItems: [],
  currentProjectId: null,
};

document.addEventListener('DOMContentLoaded', async function () {
  const authScreen = document.getElementById('auth-screen');
  const appContainer = document.getElementById('app');

  const user = await authManager.initialize();

  if (!user) {
    authScreen.classList.remove('hidden');
    appContainer.classList.add('hidden');
    setupAuthScreen();
  } else {
    authScreen.classList.add('hidden');
    appContainer.classList.remove('hidden');
    initializeApp();
  }

  authManager.onAuthChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      authScreen.classList.add('hidden');
      appContainer.classList.remove('hidden');
      initializeApp();
    } else if (event === 'SIGNED_OUT') {
      authScreen.classList.remove('hidden');
      appContainer.classList.add('hidden');
    }
  });
});

function setupAuthScreen() {
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
      showToast('Account created! You can now sign in.');
    } catch (error) {
      showToast(error.message, 'error');
    }
  });
}

async function initializeApp() {
  await loadUserProfile();
  setupEventListeners();
  renderCurrentStudio();
  await loadSavedData();
}

async function loadUserProfile() {
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

function setupEventListeners() {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      const studio = e.currentTarget.dataset.studio;
      switchStudio(studio);
    });
  });

  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modalId = e.currentTarget.dataset.modal;
      closeModal(modalId);
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
    openModal('ai-assistant-modal');
  });

  document.getElementById('send-message').addEventListener('click', sendChatMessage);
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
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

function switchStudio(studioName) {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-studio="${studioName}"]`).classList.add('active');

  appState.currentStudio = studioName;
  renderCurrentStudio();
}

function renderCurrentStudio() {
  const studioContent = document.getElementById('studio-content');
  const contextualContent = document.getElementById('contextual-content');

  switch (appState.currentStudio) {
    case 'portfolio':
      renderPortfolio(studioContent, contextualContent);
      break;
    case 'architecture':
      renderArchitectureStudio(studioContent, contextualContent);
      break;
    case 'interior':
      renderInteriorRevampStudio(studioContent, contextualContent);
      break;
    case 'inspiration':
      renderInspirationHub(studioContent, contextualContent);
      break;
    case 'superhuman':
      renderSuperhumanDesigner(studioContent, contextualContent);
      break;
    case 'agent':
      renderAgentDesigner(studioContent, contextualContent);
      break;
  }
}

async function renderPortfolio(content, contextual) {
  content.innerHTML = `
    <div class="studio-header">
      <div>
        <h1 class="studio-title">My Projects</h1>
        <p class="studio-description">View and manage your architectural projects</p>
      </div>
      <button class="btn btn--primary" onclick="switchStudio('architecture')">
        <i class="fas fa-plus"></i> New Project
      </button>
    </div>
    <div id="projects-grid" class="template-grid">
      <div class="loading-state" style="grid-column: 1 / -1; text-align: center; padding: 60px">
        <i class="fas fa-spinner fa-spin" style="font-size: 32px; color: var(--color-primary)"></i>
        <p style="margin-top: 16px; color: var(--color-text-secondary)">Loading projects...</p>
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
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px">
          <i class="fas fa-folder-open" style="font-size: 48px; color: var(--color-text-secondary); margin-bottom: 16px"></i>
          <h3 style="color: var(--color-text); margin-bottom: 8px">No projects yet</h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 24px">Create your first architectural design project</p>
          <button class="btn btn--primary" onclick="switchStudio('architecture')">
            <i class="fas fa-plus"></i> New Project
          </button>
        </div>
      `;
    } else {
      projectsGrid.innerHTML = projects.map(project => `
        <div class="template-card" onclick="openProject('${project.id}')">
          <div style="width: 100%; height: 180px; background: var(--color-bg-${Math.floor(Math.random() * 8) + 1}); border-radius: var(--radius-base); margin-bottom: var(--space-12); display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-building" style="font-size: 48px; color: var(--color-text-secondary); opacity: 0.5"></i>
          </div>
          <div class="template-category">${project.type} - ${project.status}</div>
          <h4 class="template-title">${project.name}</h4>
          <p class="template-description">${project.location}</p>
          <div style="display: flex; gap: var(--space-8); margin-top: var(--space-12)">
            <button class="btn btn--sm btn--primary" style="flex: 1" onclick="event.stopPropagation(); openProject('${project.id}')">
              <i class="fas fa-eye"></i> View
            </button>
            <button class="btn btn--sm btn--secondary" onclick="event.stopPropagation(); deleteProjectConfirm('${project.id}')">
              <i class="fas fa-trash"></i>
            </button>
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

async function openProject(projectId) {
  try {
    const project = await projectManager.getProject(projectId);
    if (project) {
      appState.generatedProject = {
        ...project.project_data,
        id: project.id,
        name: project.name,
        location: project.location
      };
      appState.currentProjectId = project.id;
      switchStudio('architecture');
    }
  } catch (error) {
    console.error('Error opening project:', error);
    showToast('Failed to open project', 'error');
  }
}

async function deleteProjectConfirm(projectId) {
  if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
    try {
      await projectManager.deleteProject(projectId);
      showToast('Project deleted successfully');
      renderPortfolio(
        document.getElementById('studio-content'),
        document.getElementById('contextual-content')
      );
    } catch (error) {
      console.error('Error deleting project:', error);
      showToast('Failed to delete project', 'error');
    }
  }
}

async function loadSavedData() {
  if (!appState.generatedProject && appState.currentStudio === 'architecture') {
    try {
      const projects = await projectManager.getUserProjects(authManager.getUser().id, 'in_progress');
      if (projects.length > 0) {
        appState.generatedProject = {
          ...projects[0].project_data,
          id: projects[0].id,
          name: projects[0].name,
          location: projects[0].location
        };
        appState.currentProjectId = projects[0].id;
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  document.body.classList.add('no-scroll');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
  document.body.classList.remove('no-scroll');
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message) return;

  addChatMessage(message, 'user');
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
    simulateTypingResponse(response);
  }, 1000);
}

function addChatMessage(message, sender) {
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

function simulateTypingResponse(response) {
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

function renderArchitectureStudio(content, contextual) {
  content.innerHTML = `
    <div class="studio-header">
      <h1 class="studio-title">Architecture Studio</h1>
      <p class="studio-description">Generate comprehensive architectural projects with our AI team</p>
    </div>
    <div class="card" style="max-width: 800px">
      <div class="card__body">
        <h3>Quick Start</h3>
        <p style="color: var(--color-text-secondary)">The full Architecture Studio features are being migrated to the new system. Use the portfolio to view your existing projects.</p>
        <button class="btn btn--primary" onclick="switchStudio('portfolio')">
          <i class="fas fa-folder-open"></i> View My Projects
        </button>
      </div>
    </div>
  `;

  contextual.innerHTML = `
    <h3>Project Brief</h3>
    <p>Complete the project brief to generate your architectural design with our specialized AI team.</p>
    <div class="contextual-stats">
      <div class="stat-item">
        <strong>8</strong> AI Agents
      </div>
      <div class="stat-item">
        <strong>5-10 min</strong> Generation Time
      </div>
    </div>
  `;
}

function renderInteriorRevampStudio(content, contextual) {
  content.innerHTML = `
    <div class="studio-header">
      <h1 class="studio-title">Interior Revamp Studio</h1>
      <p class="studio-description">Transform your existing spaces with AI-powered redesign</p>
    </div>
    <div class="card" style="max-width: 800px">
      <div class="card__body">
        <h3>Coming Soon</h3>
        <p style="color: var(--color-text-secondary)">Interior revamp features are being enhanced with new capabilities.</p>
      </div>
    </div>
  `;

  contextual.innerHTML = `
    <h3>Interior Revamp</h3>
    <p>Upload a photo and transform it with AI-powered redesign.</p>
  `;
}

function renderInspirationHub(content, contextual) {
  content.innerHTML = `
    <div class="studio-header">
      <h1 class="studio-title">Inspiration Hub</h1>
      <p class="studio-description">Master the art of architectural prompting with expert templates</p>
    </div>
    <div class="card" style="max-width: 800px">
      <div class="card__body">
        <h3>Browse Templates</h3>
        <p style="color: var(--color-text-secondary)">Discover expertly crafted architectural design templates.</p>
      </div>
    </div>
  `;

  contextual.innerHTML = `
    <h3>Prompt Templates</h3>
    <p>Use these expertly crafted templates to get the best results from our AI team.</p>
  `;
}

function renderSuperhumanDesigner(content, contextual) {
  content.innerHTML = `
    <div class="studio-header">
      <h1 class="studio-title">Superhuman Designer</h1>
      <p class="studio-description">Direct access to high-fidelity image generation AI</p>
    </div>
    <div class="card" style="max-width: 800px">
      <div class="card__body">
        <h3>Image Generation</h3>
        <p style="color: var(--color-text-secondary)">Create stunning architectural visualizations with precise prompting.</p>
      </div>
    </div>
  `;

  contextual.innerHTML = `
    <h3>Image Generation</h3>
    <p>Create stunning architectural visualizations with precise prompting.</p>
  `;
}

function renderAgentDesigner(content, contextual) {
  content.innerHTML = `
    <div class="studio-header">
      <h1 class="studio-title">Agent Team Designer</h1>
      <p class="studio-description">Customize your AI team's visual identity</p>
    </div>
    <div class="card" style="max-width: 800px">
      <div class="card__body">
        <h3>Customize AI Team</h3>
        <p style="color: var(--color-text-secondary)">Create unique visual identities for each AI agent in your team.</p>
      </div>
    </div>
  `;

  contextual.innerHTML = `
    <h3>Team Customization</h3>
    <p>Create unique visual identities for each AI agent in your team.</p>
  `;
}

window.switchStudio = switchStudio;
window.openProject = openProject;
window.deleteProjectConfirm = deleteProjectConfirm;
window.openModal = openModal;
window.closeModal = closeModal;
