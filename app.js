// SuperArchitect AI Application JavaScript

// Application Data
const appData = {
  aiAgents: [
    {
      id: 1,
      name: 'Project Lead',
      role: 'Orchestrates the entire design process',
      status: 'active',
      currentTask: 'Analyzing project requirements...',
      icon: 'fas fa-user-tie',
    },
    {
      id: 2,
      name: 'Concept Architect',
      role: 'Creates architectural concepts and spatial layouts',
      status: 'idle',
      currentTask: 'Waiting for requirements...',
      icon: 'fas fa-drafting-compass',
    },
    {
      id: 3,
      name: 'Visual Synthesis AI',
      role: 'Generates photorealistic 3D renderings',
      status: 'idle',
      currentTask: 'Ready to synthesize...',
      icon: 'fas fa-eye',
    },
    {
      id: 4,
      name: 'Technical Draftsman',
      role: 'Creates precise 2D CAD plans',
      status: 'idle',
      currentTask: 'Standing by...',
      icon: 'fas fa-ruler-combined',
    },
    {
      id: 5,
      name: 'Materials Specialist',
      role: 'Develops detailed material specifications',
      status: 'idle',
      currentTask: 'Material database ready...',
      icon: 'fas fa-hammer',
    },
    {
      id: 6,
      name: 'Cost Analyst',
      role: 'Calculates project costs and quantities',
      status: 'idle',
      currentTask: 'Cost models loaded...',
      icon: 'fas fa-calculator',
    },
    {
      id: 7,
      name: 'Sustainability Expert',
      role: 'Evaluates environmental performance',
      status: 'idle',
      currentTask: 'Eco-metrics initialized...',
      icon: 'fas fa-leaf',
    },
    {
      id: 8,
      name: 'Interior Designer',
      role: 'Designs interior spaces and furnishing',
      status: 'idle',
      currentTask: 'Interior libraries loaded...',
      icon: 'fas fa-couch',
    },
  ],
  architecturalStyles: [
    'Modern Minimalist',
    'Contemporary',
    'Industrial',
    'Scandinavian',
    'Mediterranean',
    'Colonial',
    'Art Deco',
    'Brutalist',
    'Neo-Classical',
    'Sustainable/Green',
  ],
  materials: [
    'Exposed Concrete',
    'Natural Stone',
    'Hardwood',
    'Steel Frame',
    'Glass Curtain Wall',
    'Brick',
    'Bamboo',
    'Rammed Earth',
    'Cor-Ten Steel',
    'Recycled Materials',
  ],
  specialFeatures: [
    'Rooftop Garden',
    'Solar Panels',
    'Swimming Pool',
    'Home Theater',
    'Wine Cellar',
    'Smart Home Integration',
    'Elevator',
    'Fireplace',
    'Skylight',
    'Balcony/Terrace',
  ],
  spaceTypes: {
    Residential: ['Flat', 'Bungalow', 'Villa', 'Townhouse', 'Studio'],
    Commercial: ['Office', 'Retail Store', 'Restaurant', 'Warehouse', 'Hotel'],
  },
  promptTemplates: [
    {
      id: 1,
      title: 'Luxury 3BHK Apartment Interior',
      category: 'Residential',
      description: 'High-end apartment design with premium finishes',
      template:
        'Design a luxury 3-bedroom apartment with contemporary styling. Include premium materials like marble countertops, hardwood flooring, and smart home integration. Focus on open-plan living with floor-to-ceiling windows and modern lighting throughout.',
    },
    {
      id: 2,
      title: 'Modern Office Headquarters',
      category: 'Commercial',
      description: 'Corporate office space with collaborative areas',
      template:
        'Create a modern corporate headquarters featuring open workspaces, private offices, conference rooms, and collaborative areas. Include sustainable materials, natural lighting, and technology integration throughout the space.',
    },
    {
      id: 3,
      title: 'Sustainable Family Home',
      category: 'Residential',
      description: 'Eco-friendly family residence with green features',
      template:
        'Design a sustainable 4-bedroom family home incorporating solar panels, rainwater harvesting, natural ventilation, and locally sourced materials. Include outdoor spaces and gardens integrated with the living areas.',
    },
    {
      id: 4,
      title: 'Boutique Hotel Design',
      category: 'Commercial',
      description: 'Intimate luxury hospitality space',
      template:
        'Create a boutique hotel with 20 rooms featuring unique design elements, local cultural influences, and premium amenities. Include a restaurant, lobby lounge, and spa facilities with sustainable design principles.',
    },
    {
      id: 5,
      title: 'Industrial Loft Conversion',
      category: 'Residential',
      description: 'Converting industrial space to modern living',
      template:
        'Transform an industrial warehouse into a modern loft apartment. Preserve original features like exposed brick and steel beams while adding contemporary elements like mezzanine levels and large windows.',
    },
  ],
  sampleProject: {
    name: 'Modern Lakeside Villa',
    location: 'Goa, India',
    style: 'Contemporary Tropical',
    description:
      'A stunning contemporary villa featuring clean lines, natural materials, and panoramic lake views. The design emphasizes indoor-outdoor living with expansive glass walls and tropical landscaping.',
    images: {
      exterior: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
      interior: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    },
    floorPlan: '/api/placeholder/1200/800',
    finishes: [
      {
        room: 'Living Room',
        floor: 'Polished Concrete with Radiant Heating',
        walls: 'Exposed Concrete with Wood Accents',
        ceiling: 'Suspended Drywall with Integrated LED',
      },
      {
        room: 'Master Bedroom',
        floor: 'European Oak Hardwood',
        walls: 'Textured Plaster with Accent Wall',
        ceiling: 'Coffered Wood Ceiling',
      },
      {
        room: 'Kitchen',
        floor: 'Natural Stone Tiles',
        walls: 'Glass Backsplash with Steel Accents',
        ceiling: 'Exposed Concrete with Track Lighting',
      },
      {
        room: 'Bathroom',
        floor: 'Marble Tiles with Underfloor Heating',
        walls: 'Natural Stone with Glass Shower',
        ceiling: 'Moisture-Resistant Drywall',
      },
    ],
    costAnalysis: {
      total: 12500000,
      breakdown: {
        Structure: 4500000,
        Finishes: 3200000,
        MEP: 2100000,
        Landscaping: 1400000,
        Contingency: 1300000,
      },
    },
    sustainability: {
      ecoScore: 78,
      positives: [
        'Solar panel integration reduces energy costs by 60%',
        'Rainwater harvesting system',
        'Natural ventilation reduces AC dependency',
        'Locally sourced materials',
      ],
      improvements: [
        'Consider green roof implementation',
        'Add greywater recycling system',
        'Install energy-efficient appliances',
      ],
    },
  },
  furnitureItems: [
    {
      id: 1,
      name: 'Modern Sectional Sofa',
      description: 'L-shaped grey fabric sectional with clean lines',
      price: 85000,
      category: 'Seating',
    },
    {
      id: 2,
      name: 'Glass Coffee Table',
      description: 'Rectangular tempered glass with steel legs',
      price: 25000,
      category: 'Tables',
    },
    {
      id: 3,
      name: 'Pendant Light Fixture',
      description: 'Modern brass and glass pendant lighting',
      price: 15000,
      category: 'Lighting',
    },
    {
      id: 4,
      name: 'Area Rug',
      description: 'Geometric pattern wool rug in neutral tones',
      price: 12000,
      category: 'Decor',
    },
  ],
};

// Application State
let appState = {
  currentStudio: 'architecture',
  projectForm: {},
  generatedProject: null,
  chatHistory: [],
  isGenerating: false,
  uploadedImage: null,
  revampedImage: null,
  virtualItems: [],
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  renderCurrentStudio();
  loadSavedData();
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      const studio = e.currentTarget.dataset.studio;
      switchStudio(studio);
    });
  });

  // Modal controls
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modalId = e.currentTarget.dataset.modal;
      closeModal(modalId);
    });
  });

  // Modal backdrops
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      const modal = e.currentTarget.closest('.modal');
      if (modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // AI Assistant
  document.getElementById('ai-assistant-btn').addEventListener('click', () => {
    openModal('ai-assistant-modal');
  });

  document
    .getElementById('send-message')
    .addEventListener('click', sendChatMessage);
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });
}

function switchStudio(studioName) {
  // Update navigation
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.remove('active');
  });
  document
    .querySelector(`[data-studio="${studioName}"]`)
    .classList.add('active');

  appState.currentStudio = studioName;
  renderCurrentStudio();
}

function renderCurrentStudio() {
  const studioContent = document.getElementById('studio-content');
  const contextualContent = document.getElementById('contextual-content');

  switch (appState.currentStudio) {
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

// Architecture Studio
function renderArchitectureStudio(content, contextual) {
  content.innerHTML = `
        <div class="studio-header">
            <h1 class="studio-title">Architecture Studio</h1>
            <p class="studio-description">Generate comprehensive architectural projects with our AI team</p>
        </div>
        <div id="architecture-content">
            ${appState.generatedProject ? renderDesignCard() : renderProjectForm()}
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
            <div class="stat-item">
                <strong>Full Package</strong> Deliverables
            </div>
        </div>
    `;

  if (!appState.generatedProject) {
    setupProjectForm();
  }
}

function renderProjectForm() {
  return `
        <form id="project-form" class="project-form">
            <div class="form-section expanded">
                <div class="section-header">
                    <h3>Project Details</h3>
                    <i class="fas fa-chevron-down section-toggle"></i>
                </div>
                <div class="section-content active">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Project Name</label>
                            <input type="text" id="project-name" class="form-control" placeholder="Enter project name">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Location</label>
                            <input type="text" id="project-location" class="form-control" placeholder="City, Country">
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="section-header">
                    <h3>Space Definition</h3>
                    <i class="fas fa-chevron-down section-toggle"></i>
                </div>
                <div class="section-content">
                    <div class="form-group">
                        <label class="form-label">Project Type</label>
                        <div class="space-selection">
                            <div class="radio-option" data-type="Residential">
                                <input type="radio" name="project-type" value="Residential" id="residential">
                                <label for="residential">Residential</label>
                            </div>
                            <div class="radio-option" data-type="Commercial">
                                <input type="radio" name="project-type" value="Commercial" id="commercial">
                                <label for="commercial">Commercial</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" id="subtype-selection" style="display: none;">
                        <label class="form-label">Space Type</label>
                        <div id="subtype-options" class="space-selection">
                            <!-- Dynamic content -->
                        </div>
                    </div>
                    <div id="bhk-configuration" class="bhk-config">
                        <div class="form-group">
                            <label class="form-label">Bedrooms</label>
                            <select id="bedrooms" class="form-control">
                                <option value="1">1 BHK</option>
                                <option value="2">2 BHK</option>
                                <option value="3">3 BHK</option>
                                <option value="4">4 BHK</option>
                                <option value="5">5+ BHK</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Bathrooms</label>
                            <select id="bathrooms" class="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Balconies</label>
                            <select id="balconies" class="form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3+</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="section-header">
                    <h3>Style & Elements</h3>
                    <i class="fas fa-chevron-down section-toggle"></i>
                </div>
                <div class="section-content">
                    <div class="form-group">
                        <label class="form-label">Architectural Style</label>
                        <div id="styles-selection" class="selection-grid">
                            ${appData.architecturalStyles
                              .map(
                                (style) => `
                                <div class="checkbox-option" data-value="${style}">
                                    <input type="checkbox" id="style-${style.replace(/\s+/g, '-').toLowerCase()}" value="${style}">
                                    <label for="style-${style.replace(/\s+/g, '-').toLowerCase()}">${style}</label>
                                </div>
                            `
                              )
                              .join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Key Materials</label>
                        <div id="materials-selection" class="selection-grid">
                            ${appData.materials
                              .map(
                                (material) => `
                                <div class="checkbox-option" data-value="${material}">
                                    <input type="checkbox" id="material-${material.replace(/\s+/g, '-').toLowerCase()}" value="${material}">
                                    <label for="material-${material.replace(/\s+/g, '-').toLowerCase()}">${material}</label>
                                </div>
                            `
                              )
                              .join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Special Features</label>
                        <div id="features-selection" class="selection-grid">
                            ${appData.specialFeatures
                              .map(
                                (feature) => `
                                <div class="checkbox-option" data-value="${feature}">
                                    <input type="checkbox" id="feature-${feature.replace(/\s+/g, '-').toLowerCase()}" value="${feature}">
                                    <label for="feature-${feature.replace(/\s+/g, '-').toLowerCase()}">${feature}</label>
                                </div>
                            `
                              )
                              .join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="section-header">
                    <h3>Dimensions & Constraints</h3>
                    <i class="fas fa-chevron-down section-toggle"></i>
                </div>
                <div class="section-content">
                    <div class="form-group">
                        <label class="form-label">Site Dimensions</label>
                        <div class="dimension-inputs">
                            <input type="number" id="length" class="form-control" placeholder="Length">
                            <input type="number" id="width" class="form-control" placeholder="Width">
                            <input type="number" id="height" class="form-control" placeholder="Height">
                            <select id="dimension-unit" class="form-control">
                                <option value="meters">Meters</option>
                                <option value="feet">Feet</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Constraints & Requirements</label>
                        <textarea id="constraints" class="form-control" rows="4" placeholder="Describe any structural constraints, zoning requirements, or specific needs..."></textarea>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn--primary btn--lg btn--full-width">
                <i class="fas fa-rocket"></i>
                Generate Design with AI Team
            </button>
        </form>
    `;
}

function setupProjectForm() {
  // Form submission
  document.getElementById('project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    collectFormData();
    startGeneration();
  });

  // Section toggles
  document.querySelectorAll('.section-header').forEach((header) => {
    header.addEventListener('click', () => {
      const section = header.closest('.form-section');
      const content = section.querySelector('.section-content');
      const toggle = section.querySelector('.section-toggle');

      if (section.classList.contains('expanded')) {
        section.classList.remove('expanded');
        content.classList.remove('active');
        content.style.display = 'none';
      } else {
        section.classList.add('expanded');
        content.classList.add('active');
        content.style.display = 'block';
      }
    });
  });

  // Project type selection
  document.querySelectorAll('[name="project-type"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      const selectedType = e.target.value;
      const subtypeSelection = document.getElementById('subtype-selection');
      const subtypeOptions = document.getElementById('subtype-options');
      const bhkConfig = document.getElementById('bhk-configuration');

      // Update radio option styling
      document.querySelectorAll('.radio-option').forEach((option) => {
        option.classList.remove('selected');
      });
      e.target.closest('.radio-option').classList.add('selected');

      // Show subtype options
      subtypeSelection.style.display = 'block';
      subtypeOptions.innerHTML = appData.spaceTypes[selectedType]
        .map(
          (subtype) => `
                <div class="radio-option" data-subtype="${subtype}">
                    <input type="radio" name="space-subtype" value="${subtype}" id="subtype-${subtype.replace(/\s+/g, '-').toLowerCase()}">
                    <label for="subtype-${subtype.replace(/\s+/g, '-').toLowerCase()}">${subtype}</label>
                </div>
            `
        )
        .join('');

      // Setup subtype listeners
      document
        .querySelectorAll('[name="space-subtype"]')
        .forEach((subtypeRadio) => {
          subtypeRadio.addEventListener('change', (e) => {
            document.querySelectorAll('[data-subtype]').forEach((option) => {
              option.classList.remove('selected');
            });
            e.target.closest('.radio-option').classList.add('selected');

            // Show BHK config for residential flats
            if (selectedType === 'Residential' && e.target.value === 'Flat') {
              bhkConfig.classList.add('active');
            } else {
              bhkConfig.classList.remove('active');
            }
          });
        });
    });
  });

  // Checkbox options
  document.querySelectorAll('.checkbox-option').forEach((option) => {
    option.addEventListener('click', (e) => {
      if (e.target.type !== 'checkbox') {
        const checkbox = option.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
      }

      if (option.querySelector('input[type="checkbox"]').checked) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  });
}

function collectFormData() {
  const formData = {
    name: document.getElementById('project-name').value,
    location: document.getElementById('project-location').value,
    type: document.querySelector('[name="project-type"]:checked')?.value,
    subtype: document.querySelector('[name="space-subtype"]:checked')?.value,
    bedrooms: document.getElementById('bedrooms')?.value,
    bathrooms: document.getElementById('bathrooms')?.value,
    balconies: document.getElementById('balconies')?.value,
    styles: Array.from(
      document.querySelectorAll('#styles-selection input:checked')
    ).map((cb) => cb.value),
    materials: Array.from(
      document.querySelectorAll('#materials-selection input:checked')
    ).map((cb) => cb.value),
    features: Array.from(
      document.querySelectorAll('#features-selection input:checked')
    ).map((cb) => cb.value),
    dimensions: {
      length: document.getElementById('length').value,
      width: document.getElementById('width').value,
      height: document.getElementById('height').value,
      unit: document.getElementById('dimension-unit').value,
    },
    constraints: document.getElementById('constraints').value,
  };

  appState.projectForm = formData;
}

async function startGeneration() {
  appState.isGenerating = true;
  openModal('agent-huddle-modal');

  const apiKey = window.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    showToast('API key not configured. Please set it in env.js', 'error');
    closeModal('agent-huddle-modal');
    appState.isGenerating = false;
    return;
  }

  const agents = [...appData.aiAgents];
  const projectBrief = JSON.stringify(appState.projectForm, null, 2);
  let conversationHistory = [
    {
      role: 'user',
      parts: [{ text: `Here is the project brief:\n${projectBrief}` }],
    },
  ];

  const tasks = [
    {
      agentIndex: 0,
      task: 'Analyze the project requirements and create a project plan.',
    },
    {
      agentIndex: 1,
      task: 'Develop a high-level architectural concept based on the plan.',
    },
    {
      agentIndex: 2,
      task: 'Generate a descriptive prompt for a photorealistic exterior rendering.',
    },
    { agentIndex: 3, task: 'Outline the key 2D CAD plans required.' },
    { agentIndex: 4, task: 'Suggest a palette of 5 key materials.' },
    {
      agentIndex: 5,
      task: 'Provide a high-level cost estimation breakdown (3-4 items).',
    },
    {
      agentIndex: 6,
      task: 'Identify 3 key sustainability features to integrate.',
    },
    { agentIndex: 7, task: 'Suggest an interior design direction.' },
    { agentIndex: 0, task: 'Review all outputs and provide a final summary.' },
  ];

  try {
    for (let i = 0; i < tasks.length; i++) {
      const { agentIndex, task } = tasks[i];
      const currentAgent = agents[agentIndex];

      // Update agent status in the UI
      agents.forEach((a) => (a.status = 'idle'));
      currentAgent.status = 'active';
      currentAgent.currentTask = `Working on: ${task}`;
      const progress = Math.round(((i + 1) / tasks.length) * 100);
      renderAgentHuddle(
        agents,
        agentIndex,
        progress,
        `${currentAgent.name}: ${task}`
      );

      // Construct the prompt for the current task
      const prompt = `
                You are the ${currentAgent.name}, whose role is: "${currentAgent.role}".
                The overall project brief is:
                ${projectBrief}

                Your current task is: "${task}".

                Based on the conversation history so far, provide a concise, one-sentence summary of your output for this task.
                Do not repeat the prompt. Just provide your output.
            `;
      conversationHistory.push({ role: 'user', parts: [{ text: prompt }] });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: conversationHistory }),
        }
      );

      if (!response.ok)
        throw new Error(
          `API Error: ${response.status} ${await response.text()}`
        );

      const data = await response.json();
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text)
        throw new Error('Invalid API response structure');

      const taskResult = data.candidates[0].content.parts[0].text;

      // Add AI response to conversation history
      conversationHistory.push({
        role: 'model',
        parts: [{ text: taskResult }],
      });

      // Update agent's completed task in the main data structure
      currentAgent.currentTask = taskResult;
      renderAgentHuddle(
        agents,
        agentIndex,
        progress,
        `${currentAgent.name}: ${taskResult.substring(0, 80)}...`
      );

      // Give a small delay for visual effect
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    completeGeneration();
  } catch (error) {
    console.error('Error during AI generation:', error);
    showToast(
      'An error occurred during AI generation. Check console.',
      'error'
    );
    closeModal('agent-huddle-modal');
    appState.isGenerating = false;
  }
}

function renderAgentHuddle(
  agents,
  activeIndex,
  progress,
  currentTask = 'Initializing...'
) {
  const agentsContainer = document.getElementById('agents-visualization');
  const statusText = document.getElementById('status-text');
  const progressText = document.getElementById('progress-percentage');
  const taskText = document.getElementById('current-task-text');

  // Position agents in a circle
  const centerX = 250;
  const centerY = 250;
  const radius = 180;

  agentsContainer.innerHTML = agents
    .map((agent, index) => {
      const angle = (index / agents.length) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle) - 40;
      const y = centerY + radius * Math.sin(angle) - 40;

      return `
            <div class="agent-pod ${agent.status}" style="left: ${x}px; top: ${y}px;">
                <i class="${agent.icon}"></i>
                <div class="agent-name">${agent.name}</div>
            </div>
        `;
    })
    .join('');

  // Update progress
  const circle = document.querySelector('.progress-ring-circle');
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (progress / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  progressText.textContent = `${progress}%`;
  statusText.textContent = `AI Team Processing - ${progress}% Complete`;
  taskText.textContent = currentTask;
}

function completeGeneration() {
  appState.isGenerating = false;
  appState.generatedProject = {
    ...appState.projectForm,
    ...appData.sampleProject,
    name: appState.projectForm.name || appData.sampleProject.name,
    location: appState.projectForm.location || appData.sampleProject.location,
  };

  closeModal('agent-huddle-modal');
  renderCurrentStudio();
}

function renderDesignCard() {
  const project = appState.generatedProject;
  return `
        <div class="design-card" onclick="openDesignViewer()">
            <img src="${project.images.exterior[0]}" alt="${project.name}" class="design-card-image">
            <div class="design-card-content">
                <h3 class="design-card-title">${project.name}</h3>
                <p class="design-card-description">${project.description}</p>
                <div class="design-card-materials">
                    ${
                      project.materials
                        ?.slice(0, 3)
                        .map(
                          (material) => `
                        <span class="material-tag">${material}</span>
                    `
                        )
                        .join('') || ''
                    }
                </div>
                <div style="margin-top: 16px;">
                    <small style="color: var(--color-text-secondary);">Click to view full project package</small>
                </div>
            </div>
        </div>
        <div style="margin-top: 24px;">
            <button class="btn btn--secondary" onclick="resetProject()">
                <i class="fas fa-plus"></i>
                Create New Project
            </button>
        </div>
    `;
}

function openDesignViewer() {
  openModal('design-viewer-modal');
  renderDesignViewer();

  // Setup viewer navigation
  document.querySelectorAll('.viewer-nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab;

      document.querySelectorAll('.viewer-nav-item').forEach((navItem) => {
        navItem.classList.remove('active');
      });
      e.currentTarget.classList.add('active');

      renderViewerContent(tab);
    });
  });
}

function renderDesignViewer() {
  const project = appState.generatedProject;
  document.getElementById('design-title').textContent = project.name;
  renderViewerContent('images');
}

function renderViewerContent(tab) {
  const content = document.getElementById('viewer-content');
  const project = appState.generatedProject;

  switch (tab) {
    case 'images':
      content.innerHTML = `
                <div class="image-gallery">
                    <h4>Exterior Renderings</h4>
                    ${project.images.exterior
                      .map(
                        (img, index) => `
                        <div class="image-item">
                            <img src="${img}" alt="Exterior View ${index + 1}" class="gallery-image">
                            <div class="image-overlay">
                                <button class="edit-image-btn" onclick="editImage('${img}', 'exterior', ${index})">
                                    <i class="fas fa-edit"></i>
                                    Edit this View
                                </button>
                            </div>
                        </div>
                    `
                      )
                      .join('')}
                    
                    <h4 style="margin-top: 32px;">Interior Renderings</h4>
                    ${project.images.interior
                      .map(
                        (img, index) => `
                        <div class="image-item">
                            <img src="${img}" alt="Interior View ${index + 1}" class="gallery-image">
                            <div class="image-overlay">
                                <button class="edit-image-btn" onclick="editImage('${img}', 'interior', ${index})">
                                    <i class="fas fa-edit"></i>
                                    Edit this View
                                </button>
                            </div>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            `;
      break;

    case 'plans':
      content.innerHTML = `
                <h4>2D Floor Plans</h4>
                <div class="plan-viewer">
                    <img src="${project.floorPlan}" alt="Floor Plan" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 8px;">
                </div>
                <div style="margin-top: 16px;">
                    <button class="btn btn--primary">
                        <i class="fas fa-download"></i>
                        Download CAD Files
                    </button>
                </div>
            `;
      break;

    case 'finishes':
      content.innerHTML = `
                <h4>Material & Finish Schedule</h4>
                <table class="finishes-table">
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>Floor</th>
                            <th>Walls</th>
                            <th>Ceiling</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${project.finishes
                          .map(
                            (finish) => `
                            <tr>
                                <td><strong>${finish.room}</strong></td>
                                <td>${finish.floor}</td>
                                <td>${finish.walls}</td>
                                <td>${finish.ceiling}</td>
                            </tr>
                        `
                          )
                          .join('')}
                    </tbody>
                </table>
            `;
      break;

    case 'costs':
      content.innerHTML = `
                <div class="cost-summary">
                    <h4>Total Project Cost</h4>
                    <div class="total-cost">₹${project.costAnalysis.total.toLocaleString('en-IN')}</div>
                    <p style="color: var(--color-text-secondary);">Estimated construction cost including materials and labor</p>
                </div>
                
                <div class="cost-breakdown-chart" style="position: relative; height: 400px;">
                    <canvas id="cost-chart"></canvas>
                </div>
                
                <div style="margin-top: 24px;">
                    <button class="btn btn--primary">
                        <i class="fas fa-file-pdf"></i>
                        Download Detailed BOQ
                    </button>
                </div>
            `;

      // Render cost chart
      setTimeout(() => {
        renderCostChart(project.costAnalysis.breakdown);
      }, 100);
      break;

    case 'sustainability':
      content.innerHTML = `
                <div class="eco-score-container">
                    <div class="eco-score-circle">
                        <svg class="eco-score-svg" width="150" height="150">
                            <circle class="eco-score-bg" cx="75" cy="75" r="70"></circle>
                            <circle class="eco-score-progress" cx="75" cy="75" r="70" style="stroke-dashoffset: ${440 - (project.sustainability.ecoScore / 100) * 440}"></circle>
                        </svg>
                        <div class="eco-score-text">
                            <div class="eco-score-number">${project.sustainability.ecoScore}</div>
                            <div class="eco-score-label">Eco Score</div>
                        </div>
                    </div>
                    <div class="eco-details">
                        <h4>Environmental Performance</h4>
                        <p>This design demonstrates strong sustainability credentials with renewable energy integration and efficient resource usage.</p>
                    </div>
                </div>
                
                <div class="eco-section">
                    <h4><i class="fas fa-check-circle" style="color: var(--color-success);"></i> Positive Aspects</h4>
                    <ul class="eco-list">
                        ${project.sustainability.positives
                          .map(
                            (positive) => `
                            <li><i class="fas fa-leaf"></i> ${positive}</li>
                        `
                          )
                          .join('')}
                    </ul>
                </div>
                
                <div class="eco-section">
                    <h4><i class="fas fa-lightbulb" style="color: var(--color-warning);"></i> Improvement Suggestions</h4>
                    <ul class="eco-list">
                        ${project.sustainability.improvements
                          .map(
                            (improvement) => `
                            <li><i class="fas fa-arrow-up"></i> ${improvement}</li>
                        `
                          )
                          .join('')}
                    </ul>
                </div>
            `;
      break;
  }
}

function renderCostChart(breakdown) {
  const ctx = document.getElementById('cost-chart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(breakdown),
      datasets: [
        {
          label: 'Cost (₹)',
          data: Object.values(breakdown),
          backgroundColor: [
            '#1FB8CD',
            '#FFC185',
            '#B4413C',
            '#ECEBD5',
            '#5D878F',
          ],
          borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f5f5f5',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#f5f5f5',
            callback: function (value) {
              return '₹' + value.toLocaleString('en-IN');
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        x: {
          ticks: {
            color: '#f5f5f5',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  });
}

function editImage(imageSrc, type, index) {
  document.getElementById('edit-original-image').src = imageSrc;
  openModal('image-edit-modal');

  document.getElementById('apply-edit').onclick = () => {
    const prompt = document.getElementById('edit-prompt').value;
    if (prompt.trim()) {
      applyImageEdit(imageSrc, prompt, type, index);
    }
  };
}

function applyImageEdit(originalSrc, prompt, type, index) {
  // Simulate image editing
  document.getElementById('apply-edit').innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Processing...';
  document.getElementById('apply-edit').disabled = true;

  setTimeout(() => {
    // Show edited result (using placeholder for demo)
    const editedResult = document.getElementById('edited-result');
    document.getElementById('edited-image').src = '/api/placeholder/800/600';
    editedResult.classList.remove('hidden');

    document.getElementById('apply-edit').innerHTML =
      '<i class="fas fa-magic"></i> Apply Changes';
    document.getElementById('apply-edit').disabled = false;

    document.getElementById('accept-edit').onclick = () => {
      // Update the project image
      if (type === 'exterior') {
        appState.generatedProject.images.exterior[index] =
          '/api/placeholder/800/600';
      } else {
        appState.generatedProject.images.interior[index] =
          '/api/placeholder/800/600';
      }

      closeModal('image-edit-modal');
      renderViewerContent('images');
      showToast('Image updated successfully!');
    };

    document.getElementById('try-again').onclick = () => {
      editedResult.classList.add('hidden');
      document.getElementById('edit-prompt').value = '';
    };
  }, 2000);
}

function resetProject() {
  appState.generatedProject = null;
  appState.projectForm = {};
  renderCurrentStudio();
}

// Interior Revamp Studio
function renderInteriorRevampStudio(content, contextual) {
  content.innerHTML = `
        <div class="studio-header">
            <h1 class="studio-title">Interior Revamp Studio</h1>
            <p class="studio-description">Transform your existing spaces with AI-powered redesign</p>
        </div>
        
        <div class="upload-area" id="image-upload-area">
            <div class="upload-icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <h3>Upload Your Room Photo</h3>
            <p>Drag and drop an image or click to browse</p>
            <input type="file" id="room-image-input" accept="image/*" style="display: none;">
        </div>
        
        <div id="revamp-interface" style="display: none;">
            <div class="form-group">
                <label class="form-label">Describe your new style:</label>
                <textarea id="style-prompt" class="form-control" rows="3" placeholder="e.g., Cozy Scandinavian with light oak wood, minimalist furniture, warm lighting..."></textarea>
            </div>
            <button id="generate-revamp" class="btn btn--primary btn--full-width">
                <i class="fas fa-magic"></i>
                Generate New Design
            </button>
            
            <div id="comparison-container" style="display: none;">
                <div class="comparison-slider">
                    <div class="comparison-images">
                        <img id="original-image" class="comparison-image before" src="">
                        <img id="revamped-image" class="comparison-image after" src="">
                    </div>
                    <div class="slider-handle">
                        <i class="fas fa-arrows-alt-h"></i>
                    </div>
                </div>
                
                <div class="shopping-list">
                    <h4><i class="fas fa-shopping-cart"></i> AI-Generated Shopping List</h4>
                    <div id="furniture-list">
                        ${appData.furnitureItems
                          .map(
                            (item) => `
                            <div class="furniture-item">
                                <div class="item-info">
                                    <h4>${item.name}</h4>
                                    <p style="color: var(--color-text-secondary); margin: 0;">${item.description}</p>
                                    <div class="item-price">₹${item.price.toLocaleString('en-IN')}</div>
                                </div>
                                <button class="try-on-btn" onclick="tryOnItem(${item.id})">
                                    <i class="fas fa-eye"></i>
                                    Try-On
                                </button>
                            </div>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="session-controls" style="margin-top: 24px; display: none;" id="session-controls">
            <button class="btn btn--secondary" onclick="saveSession()">
                <i class="fas fa-save"></i>
                Save Session
            </button>
            <button class="btn btn--secondary" onclick="loadSession()">
                <i class="fas fa-folder-open"></i>
                Load Session
            </button>
        </div>
    `;

  contextual.innerHTML = `
        <h3>Interior Revamp</h3>
        <p>Upload a photo of your room and transform it with AI-powered redesign.</p>
        <div class="contextual-features">
            <div class="feature-item">
                <i class="fas fa-camera"></i>
                <span>Photo Upload</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-magic"></i>
                <span>AI Transformation</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-shopping-bag"></i>
                <span>Shopping List</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-cube"></i>
                <span>Virtual Try-On</span>
            </div>
        </div>
    `;

  setupInteriorRevamp();
}

function setupInteriorRevamp() {
  const uploadArea = document.getElementById('image-upload-area');
  const fileInput = document.getElementById('room-image-input');

  uploadArea.addEventListener('click', () => fileInput.click());

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  });

  document
    .getElementById('generate-revamp')
    .addEventListener('click', generateRevamp);

  setupComparisonSlider();
}

function handleImageUpload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    appState.uploadedImage = e.target.result;
    document.getElementById('image-upload-area').style.display = 'none';
    document.getElementById('revamp-interface').style.display = 'block';
    document.getElementById('original-image').src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function generateRevamp() {
  const stylePrompt = document.getElementById('style-prompt').value;
  if (!stylePrompt.trim()) {
    showToast('Please describe your desired style first!', 'error');
    return;
  }

  const generateBtn = document.getElementById('generate-revamp');
  generateBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Generating...';
  generateBtn.disabled = true;

  setTimeout(() => {
    // Simulate revamp generation
    appState.revampedImage = '/api/placeholder/800/600';
    document.getElementById('revamped-image').src = appState.revampedImage;
    document.getElementById('comparison-container').style.display = 'block';
    document.getElementById('session-controls').style.display = 'block';

    generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate New Design';
    generateBtn.disabled = false;

    showToast('Room transformation complete!');
  }, 3000);
}

function setupComparisonSlider() {
  const slider = document.querySelector('.slider-handle');
  const afterImage = document.querySelector('.comparison-image.after');
  let isDragging = false;

  slider.addEventListener('mousedown', () => {
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const container = document.querySelector('.comparison-slider');
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    if (percentage >= 0 && percentage <= 100) {
      afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      slider.style.left = `${percentage}%`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

function tryOnItem(itemId) {
  const item = appData.furnitureItems.find((f) => f.id === itemId);
  showToast(
    `Virtual try-on for "${item.name}" activated! Drag to place in your room.`
  );
  // In a real implementation, this would add a draggable item overlay
}

// Inspiration Hub
function renderInspirationHub(content, contextual) {
  content.innerHTML = `
        <div class="studio-header">
            <h1 class="studio-title">Inspiration Hub</h1>
            <p class="studio-description">Master the art of architectural prompting with expert templates</p>
        </div>
        
        <div class="anatomy-guide" style="margin-bottom: 32px;">
            <div class="card">
                <div class="card__body">
                    <h3><i class="fas fa-lightbulb"></i> Anatomy of a Perfect Brief</h3>
                    <p>A well-crafted architectural brief should include:</p>
                    <ul style="padding-left: 20px; color: var(--color-text-secondary);">
                        <li><strong>Context:</strong> Location, climate, and cultural considerations</li>
                        <li><strong>Function:</strong> Primary use, capacity, and workflow requirements</li>
                        <li><strong>Aesthetics:</strong> Style preferences, materials, and visual character</li>
                        <li><strong>Constraints:</strong> Budget, timeline, zoning, and structural limitations</li>
                        <li><strong>Sustainability:</strong> Environmental goals and performance targets</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="template-categories">
            <div class="form-group">
                <label class="form-label">Filter by Category:</label>
                <select id="category-filter" class="form-control" style="max-width: 300px;">
                    <option value="all">All Categories</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                </select>
            </div>
        </div>
        
        <div class="template-grid" id="templates-grid">
            ${renderTemplateCards()}
        </div>
    `;

  contextual.innerHTML = `
        <h3>Prompt Templates</h3>
        <p>Use these expertly crafted templates to get the best results from our AI team.</p>
        <div class="template-stats">
            <div class="stat-item">
                <strong>${appData.promptTemplates.length}</strong> Templates
            </div>
            <div class="stat-item">
                <strong>Expert</strong> Crafted
            </div>
            <div class="stat-item">
                <strong>One-Click</strong> Copy
            </div>
        </div>
    `;

  setupInspirationHub();
}

function renderTemplateCards() {
  return appData.promptTemplates
    .map(
      (template) => `
        <div class="template-card" data-category="${template.category}">
            <div class="template-category">${template.category}</div>
            <h4 class="template-title">${template.title}</h4>
            <p class="template-description">${template.description}</p>
            <button class="copy-template-btn" onclick="copyTemplate('${template.template}')">
                <i class="fas fa-copy"></i>
                Copy Template
            </button>
        </div>
    `
    )
    .join('');
}

function setupInspirationHub() {
  document.getElementById('category-filter').addEventListener('change', (e) => {
    const category = e.target.value;
    const cards = document.querySelectorAll('.template-card');

    cards.forEach((card) => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function copyTemplate(template) {
  navigator.clipboard
    .writeText(template)
    .then(() => {
      showToast('Template copied to clipboard!');
    })
    .catch(() => {
      showToast('Copy failed. Please try again.', 'error');
    });
}

// Superhuman Designer
function renderSuperhumanDesigner(content, contextual) {
  content.innerHTML = `
        <div class="studio-header">
            <h1 class="studio-title">Superhuman Designer</h1>
            <p class="studio-description">Direct access to high-fidelity image generation AI</p>
        </div>
        
        <div class="image-generation-form">
            <div class="form-group">
                <label class="form-label">Detailed Prompt</label>
                <textarea id="generation-prompt" class="form-control" rows="4" placeholder="Describe your architectural vision in detail..."></textarea>
            </div>
            
            <div class="generation-options">
                <div class="form-group">
                    <label class="form-label">Number of Images</label>
                    <select id="image-count" class="form-control">
                        <option value="1">1 Image</option>
                        <option value="2">2 Images</option>
                        <option value="3">3 Images</option>
                        <option value="4">4 Images</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Aspect Ratio</label>
                    <select id="aspect-ratio" class="form-control">
                        <option value="1:1">Square (1:1)</option>
                        <option value="16:9">Landscape (16:9)</option>
                        <option value="9:16">Portrait (9:16)</option>
                        <option value="4:3">Traditional (4:3)</option>
                    </select>
                </div>
            </div>
            
            <button id="generate-images" class="btn btn--primary btn--full-width">
                <i class="fas fa-magic"></i>
                Generate Images
            </button>
        </div>
        
        <div id="generated-gallery" class="generated-gallery">
            <!-- Generated images will appear here -->
        </div>
    `;

  contextual.innerHTML = `
        <h3>Image Generation</h3>
        <p>Create stunning architectural visualizations with precise prompting.</p>
        <div class="generation-tips">
            <h4>Pro Tips:</h4>
            <ul style="padding-left: 16px; color: var(--color-text-secondary); font-size: 14px;">
                <li>Be specific about materials and lighting</li>
                <li>Include architectural style and period</li>
                <li>Mention camera angle and composition</li>
                <li>Add environmental context</li>
            </ul>
        </div>
    `;

  setupSuperhumanDesigner();
}

function setupSuperhumanDesigner() {
  document
    .getElementById('generate-images')
    .addEventListener('click', generateImages);
}

function generateImages() {
  const prompt = document.getElementById('generation-prompt').value;
  const count = parseInt(document.getElementById('image-count').value);

  if (!prompt.trim()) {
    showToast('Please enter a detailed prompt!', 'error');
    return;
  }

  const generateBtn = document.getElementById('generate-images');
  generateBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Generating...';
  generateBtn.disabled = true;

  setTimeout(() => {
    const gallery = document.getElementById('generated-gallery');
    gallery.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const imageItem = document.createElement('div');
      imageItem.className = 'generated-image-item';
      imageItem.innerHTML = `
                <img src="/api/placeholder/400/300" alt="Generated Image ${i + 1}" class="generated-image">
                <div class="image-actions">
                    <span style="font-size: 14px; color: var(--color-text-secondary);">Image ${i + 1}</span>
                    <button class="btn btn--sm btn--secondary" onclick="downloadImage(${i})">
                        <i class="fas fa-download"></i>
                        Download
                    </button>
                </div>
            `;
      gallery.appendChild(imageItem);
    }

    generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Images';
    generateBtn.disabled = false;

    showToast(`Generated ${count} image${count > 1 ? 's' : ''} successfully!`);
  }, 3000);
}

function downloadImage(index) {
  showToast(`Downloading image ${index + 1}...`);
}

// Agent Designer
function renderAgentDesigner(content, contextual) {
  content.innerHTML = `
        <div class="studio-header">
            <h1 class="studio-title">Agent Team Designer</h1>
            <p class="studio-description">Customize your AI team's visual identity</p>
        </div>
        
        <div class="agent-customization">
            <div class="form-group">
                <label class="form-label">Select Agent to Customize</label>
                <select id="agent-selector" class="form-control">
                    ${appData.aiAgents
                      .map(
                        (agent) => `
                        <option value="${agent.id}">${agent.name}</option>
                    `
                      )
                      .join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Avatar Style Prompt</label>
                <textarea id="avatar-prompt" class="form-control" rows="3" placeholder="Describe the visual style for this agent's avatar..."></textarea>
            </div>
            
            <button id="generate-avatar" class="btn btn--primary btn--full-width">
                <i class="fas fa-user-cog"></i>
                Generate Avatar
            </button>
        </div>
        
        <div id="avatar-preview" class="avatar-preview" style="display: none;">
            <h4>Avatar Preview</h4>
            <div class="avatar-display">
                <img id="generated-avatar" src="" alt="Generated Avatar">
                <div class="avatar-actions">
                    <button id="save-avatar" class="btn btn--primary">Save Avatar</button>
                    <button id="regenerate-avatar" class="btn btn--secondary">Try Again</button>
                </div>
            </div>
        </div>
        
        <div class="current-avatars">
            <h4>Current Team</h4>
            <div class="team-grid">
                ${appData.aiAgents
                  .map(
                    (agent) => `
                    <div class="team-member">
                        <div class="member-avatar">
                            <i class="${agent.icon}"></i>
                        </div>
                        <div class="member-name">${agent.name}</div>
                    </div>
                `
                  )
                  .join('')}
            </div>
        </div>
    `;

  contextual.innerHTML = `
        <h3>Team Customization</h3>
        <p>Create unique visual identities for each AI agent in your team.</p>
        <div class="customization-features">
            <div class="feature-item">
                <i class="fas fa-palette"></i>
                <span>Custom Avatars</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-save"></i>
                <span>Persistent Storage</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-users"></i>
                <span>Team Identity</span>
            </div>
        </div>
    `;

  setupAgentDesigner();
}

function setupAgentDesigner() {
  document
    .getElementById('generate-avatar')
    .addEventListener('click', generateAvatar);
}

function generateAvatar() {
  const agentId = document.getElementById('agent-selector').value;
  const prompt = document.getElementById('avatar-prompt').value;

  if (!prompt.trim()) {
    showToast('Please describe the avatar style!', 'error');
    return;
  }

  const generateBtn = document.getElementById('generate-avatar');
  generateBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Generating...';
  generateBtn.disabled = true;

  setTimeout(() => {
    document.getElementById('generated-avatar').src =
      '/api/placeholder/150/150';
    document.getElementById('avatar-preview').style.display = 'block';

    generateBtn.innerHTML = '<i class="fas fa-user-cog"></i> Generate Avatar';
    generateBtn.disabled = false;

    document.getElementById('save-avatar').onclick = () => {
      // Save to localStorage
      const savedAvatars = JSON.parse(
        localStorage.getItem('customAvatars') || '{}'
      );
      savedAvatars[agentId] = '/api/placeholder/150/150';
      localStorage.setItem('customAvatars', JSON.stringify(savedAvatars));

      showToast('Avatar saved successfully!');
      document.getElementById('avatar-preview').style.display = 'none';
    };

    document.getElementById('regenerate-avatar').onclick = () => {
      generateAvatar();
    };
  }, 2000);
}

// AI Assistant
function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message) return;

  // Add user message
  addChatMessage(message, 'user');
  input.value = '';

  // Simulate AI response
  setTimeout(() => {
    const responses = [
      "Great question! In architectural design, it's important to consider both form and function. What specific aspect would you like me to elaborate on?",
      "I can help you with that! For material selection, consider factors like durability, sustainability, cost, and aesthetic appeal. What's your project context?",
      "That's an excellent design principle! Modern architecture often emphasizes clean lines, open spaces, and natural light integration. Would you like some specific examples?",
      "For sustainability in architecture, key considerations include energy efficiency, renewable materials, and passive design strategies. What's your sustainability goal?",
      'Interior design and architecture work hand in hand. The spatial flow, lighting, and material choices all contribute to the overall experience. What space are you working on?',
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

// Utility Functions
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

function showToast(message, type = 'success') {
  // Simple toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'var(--color-error)' : 'var(--color-success)'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
    `;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function saveSession() {
  const sessionData = {
    uploadedImage: appState.uploadedImage,
    revampedImage: appState.revampedImage,
    virtualItems: appState.virtualItems,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem('revampSession', JSON.stringify(sessionData));
  showToast('Session saved successfully!');
}

function loadSession() {
  const savedSession = localStorage.getItem('revampSession');
  if (savedSession) {
    const sessionData = JSON.parse(savedSession);
    appState.uploadedImage = sessionData.uploadedImage;
    appState.revampedImage = sessionData.revampedImage;
    appState.virtualItems = sessionData.virtualItems || [];

    if (appState.uploadedImage) {
      document.getElementById('image-upload-area').style.display = 'none';
      document.getElementById('revamp-interface').style.display = 'block';
      document.getElementById('original-image').src = appState.uploadedImage;

      if (appState.revampedImage) {
        document.getElementById('revamped-image').src = appState.revampedImage;
        document.getElementById('comparison-container').style.display = 'block';
      }
    }

    showToast('Session loaded successfully!');
  } else {
    showToast('No saved session found!', 'error');
  }
}

function loadSavedData() {
  // Load any saved project data
  const savedProject = localStorage.getItem('currentProject');
  if (savedProject) {
    appState.generatedProject = JSON.parse(savedProject);
    if (appState.currentStudio === 'architecture') {
      renderCurrentStudio();
    }
  }
}

// Save project data periodically
setInterval(() => {
  if (appState.generatedProject) {
    localStorage.setItem(
      'currentProject',
      JSON.stringify(appState.generatedProject)
    );
  }
}, 30000); // Save every 30 seconds
