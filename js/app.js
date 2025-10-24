// Main application initialization

class CampusConnectApp {
    constructor() {
        this.uiManager = uiManager;
        this.postsManager = postsManager;
        this.calendarManager = simpleCalendarManager; // Add this line
        this.isInitialized = false;
    }
  
    // Initialize the application
    init() {
        if (this.isInitialized) return;
  
        // Initialize theme
        ThemeManager.init();
  
        // Initialize UI
        this.uiManager.init();
  
        // Initialize calendar - ADD THIS
        this.calendarManager.init();
  
        // Setup modal controls
        this.setupModalControls();
  
        // Setup additional modals - ADD THIS
        this.setupAdditionalModals();
  
        // Update theme toggle icon based on current theme
        this.updateThemeToggleIcon();
  
        this.isInitialized = true;
        console.log('Campus Connect app initialized');
    }
  
    // Setup modal controls
    setupModalControls() {
        const addPostBtn = document.getElementById('addPostBtn');
        const addPostModal = document.getElementById('addPostModal');
        const closeModal = document.getElementById('closeModal');
        const cancelPost = document.getElementById('cancelPost');
        const submitPost = document.getElementById('submitPost');
        const postForm = document.getElementById('postForm');
  
        // Open modal
        addPostBtn.addEventListener('click', () => {
            addPostModal.style.display = 'flex';
        });
  
        // Close modal
        const closeModalHandler = () => {
            addPostModal.style.display = 'none';
            postForm.reset();
        };
  
        closeModal.addEventListener('click', closeModalHandler);
        cancelPost.addEventListener('click', closeModalHandler);
  
        // Submit new post
        submitPost.addEventListener('click', (e) => {
            e.preventDefault();
            this.handlePostSubmission();
        });
  
        // Close modal on outside click
        addPostModal.addEventListener('click', (e) => {
            if (e.target === addPostModal) {
                closeModalHandler();
            }
        });
    }
  
    // ADD THIS NEW METHOD for additional modals
    setupAdditionalModals() {
        // Idea Modal
        const addIdeaBtn = document.getElementById('addIdeaBtn');
        const addIdeaModal = document.getElementById('addIdeaModal');
        const closeIdeaModal = document.getElementById('closeIdeaModal');
        const cancelIdea = document.getElementById('cancelIdea');
        const submitIdea = document.getElementById('submitIdea');
        const ideaForm = document.getElementById('ideaForm');
  
        if (addIdeaBtn && addIdeaModal) {
            addIdeaBtn.addEventListener('click', () => {
                addIdeaModal.style.display = 'flex';
            });
  
            const closeIdeaHandler = () => {
                addIdeaModal.style.display = 'none';
                ideaForm.reset();
            };
  
            closeIdeaModal.addEventListener('click', closeIdeaHandler);
            cancelIdea.addEventListener('click', closeIdeaHandler);
  
            submitIdea.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleIdeaSubmission();
            });
  
            addIdeaModal.addEventListener('click', (e) => {
                if (e.target === addIdeaModal) {
                    closeIdeaHandler();
                }
            });
        }
  
        // Resource Modal
        const addResourceBtn = document.getElementById('addResourceBtn');
        const addResourceModal = document.getElementById('addResourceModal');
        const closeResourceModal = document.getElementById('closeResourceModal');
        const cancelResource = document.getElementById('cancelResource');
        const submitResource = document.getElementById('submitResource');
        const resourceForm = document.getElementById('resourceForm');
  
        if (addResourceBtn && addResourceModal) {
            addResourceBtn.addEventListener('click', () => {
                addResourceModal.style.display = 'flex';
            });
  
            const closeResourceHandler = () => {
                addResourceModal.style.display = 'none';
                resourceForm.reset();
            };
  
            closeResourceModal.addEventListener('click', closeResourceHandler);
            cancelResource.addEventListener('click', closeResourceHandler);
  
            submitResource.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleResourceSubmission();
            });
  
            addResourceModal.addEventListener('click', (e) => {
                if (e.target === addResourceModal) {
                    closeResourceHandler();
                }
            });
        }
  
        // Event Details Modal close handler
        const closeEventModal = document.getElementById('closeEventModal');
        const eventDetailsModal = document.getElementById('eventDetailsModal');
  
        if (closeEventModal && eventDetailsModal) {
            closeEventModal.addEventListener('click', () => {
                eventDetailsModal.style.display = 'none';
            });
  
            eventDetailsModal.addEventListener('click', (e) => {
                if (e.target === eventDetailsModal) {
                    eventDetailsModal.style.display = 'none';
                }
            });
        }
    }
  
    // ADD THIS NEW METHOD for idea submission
    handleIdeaSubmission() {
        const title = document.getElementById('ideaTitle').value.trim();
        const category = document.getElementById('ideaCategory').value;
        const description = document.getElementById('ideaDescription').value.trim();
        const author = document.getElementById('ideaAuthor').value.trim() || 'Anonymous';
  
        // Validation
        if (!title || !category || !description) {
            this.uiManager.showFeedback('Please fill in all required fields', 'error');
            return;
        }
  
        if (title.length < 5) {
            this.uiManager.showFeedback('Idea title must be at least 5 characters long', 'error');
            return;
        }
  
        // Add idea
        ideaManager.submitIdea(title, category, description, author);
  
        // Close modal and reset form
        document.getElementById('addIdeaModal').style.display = 'none';
        document.getElementById('ideaForm').reset();
  
        // Update UI
        this.renderIdeas();
        this.uiManager.showFeedback('Idea submitted successfully!', 'success');
    }
  
    // ADD THIS NEW METHOD for resource submission
    handleResourceSubmission() {
        const title = document.getElementById('resourceTitle').value.trim();
        const type = document.getElementById('resourceType').value;
        const description = document.getElementById('resourceDescription').value.trim();
        const contact = document.getElementById('resourceContact').value.trim();
  
        // Validation
        if (!title || !type || !description || !contact) {
            this.uiManager.showFeedback('Please fill in all fields', 'error');
            return;
        }
  
        // Add resource (you'll need to implement this in a ResourceManager)
        this.addResource(title, type, description, contact);
  
        // Close modal and reset form
        document.getElementById('addResourceModal').style.display = 'none';
        document.getElementById('resourceForm').reset();
  
        // Update UI
        this.renderResources();
        this.uiManager.showFeedback('Resource added successfully!', 'success');
    }
  
    // ADD THIS NEW METHOD for resource management (basic implementation)
    addResource(title, type, description, contact) {
        const resources = JSON.parse(localStorage.getItem('campusConnectResources')) || [];
        const newResource = {
            id: Date.now(),
            title,
            type,
            description,
            contact,
            available: true,
            createdAt: new Date().toISOString()
        };
        
        resources.unshift(newResource);
        localStorage.setItem('campusConnectResources', JSON.stringify(resources));
        return newResource;
    }
  
    // ADD THIS NEW METHOD to render ideas
    renderIdeas() {
        const ideasContainer = document.getElementById('ideasContainer');
        if (!ideasContainer) return;
  
        const ideas = ideaManager.getAllIdeas();
        
        if (ideas.length === 0) {
            ideasContainer.innerHTML = `
                <div class="no-content-message">
                    <i class="fas fa-lightbulb"></i>
                    <h3>No Ideas Yet</h3>
                    <p>Be the first to share your campus improvement idea!</p>
                </div>
            `;
            return;
        }
  
        ideasContainer.innerHTML = ideas.map(idea => `
            <div class="idea-card">
                <div class="idea-header">
                    <h3 class="idea-title">${idea.title}</h3>
                    <div class="idea-meta">
                        <span class="idea-category">${idea.category}</span>
                        <span class="idea-author">by ${idea.author}</span>
                        <span class="idea-date">${formatDate(idea.createdAt)}</span>
                    </div>
                </div>
                <div class="idea-description">${idea.description}</div>
                <div class="idea-actions">
                    <button class="upvote-btn" data-id="${idea.id}">
                        <i class="fas fa-arrow-up"></i>
                        <span class="upvote-count">${idea.upvotes}</span>
                    </button>
                    <span class="idea-status ${idea.status}">${idea.status}</span>
                </div>
            </div>
        `).join('');
  
        // Add upvote event listeners
        ideasContainer.querySelectorAll('.upvote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ideaId = parseInt(e.currentTarget.getAttribute('data-id'));
                ideaManager.upvoteIdea(ideaId, 'currentUser'); // You might want to get actual username
                this.renderIdeas();
            });
        });
    }
  
    // ADD THIS NEW METHOD to render resources
    renderResources() {
        const resourcesContainer = document.getElementById('resourcesContainer');
        if (!resourcesContainer) return;
  
        const resources = JSON.parse(localStorage.getItem('campusConnectResources')) || [];
        
        if (resources.length === 0) {
            resourcesContainer.innerHTML = `
                <div class="no-content-message">
                    <i class="fas fa-exchange-alt"></i>
                    <h3>No Resources Available</h3>
                    <p>Be the first to share a resource with the campus community!</p>
                </div>
            `;
            return;
        }
  
        resourcesContainer.innerHTML = resources.map(resource => `
            <div class="resource-card">
                <span class="resource-type">${resource.type}</span>
                <h3 class="resource-title">${resource.title}</h3>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-contact">
                    <span class="contact-info">Contact: ${resource.contact}</span>
                    <button class="contact-btn" onclick="this.handleResourceContact('${resource.contact}')">
                        <i class="fas fa-envelope"></i> Contact
                    </button>
                </div>
            </div>
        `).join('');
    }
  
    // ADD THIS METHOD for resource contact
    handleResourceContact(contact) {
        alert(`Contact information: ${contact}\n\nYou can reach out to coordinate resource sharing.`);
    }
  
    // Handle post submission
    handlePostSubmission() {
        const title = document.getElementById('postTitle').value.trim();
        const category = document.getElementById('postCategory').value;
        const description = document.getElementById('postDescription').value.trim();
  
        // Validation
        if (!title || !category || !description) {
            this.uiManager.showFeedback('Please fill in all fields', 'error');
            return;
        }
  
        if (title.length < 5) {
            this.uiManager.showFeedback('Title must be at least 5 characters long', 'error');
            return;
        }
  
        if (description.length < 10) {
            this.uiManager.showFeedback('Description must be at least 10 characters long', 'error');
            return;
        }
  
        // Add post
        this.postsManager.addPost(title, category, description);
  
        // Close modal and reset form
        document.getElementById('addPostModal').style.display = 'none';
        document.getElementById('postForm').reset();
  
        // Update UI
        this.uiManager.renderPosts();
        this.uiManager.updateStats();
        
        // Reload calendar events since new post might be an event
        this.calendarManager.loadEvents();
        this.calendarManager.renderCalendar();
        
        this.uiManager.showFeedback('Post created successfully!', 'success');
  
        // Reset to all filter to show the new post
        this.postsManager.setFilter('all');
        this.uiManager.setActiveFilter('all');
    }
  
    // Update theme toggle icon
    updateThemeToggleIcon() {
        const currentTheme = ThemeManager.getCurrent();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
  }
  
  // Initialize the application when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const app = new CampusConnectApp();
    app.init();
    
    // Also render ideas and resources on load
    setTimeout(() => {
        app.renderIdeas();
        app.renderResources();
    }, 100);
  });