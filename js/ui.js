// UI rendering and interaction management

class UIManager {
  constructor() {
      this.postsContainer = document.getElementById('postsContainer');
      this.statsSection = document.getElementById('statsSection');
      this.filtersContainer = document.getElementById('filtersContainer');
      this.searchInput = document.getElementById('searchInput');
      this.themeToggle = document.getElementById('themeToggle');
  }

  // Initialize UI
  init() {
      this.renderFilters();
      this.renderStats();
      this.renderPosts();
      this.setupEventListeners();
  }

  // Render category filters
  renderFilters() {
      this.filtersContainer.innerHTML = categories.map(category => `
          <button class="filter-btn ${category.id === 'all' ? 'active' : ''}" 
                  data-category="${category.id}">
              <i class="${category.icon}"></i> ${category.name}
          </button>
      `).join('');
  }

  // Render statistics
  renderStats() {
      const stats = postsManager.getStats();
      this.statsSection.innerHTML = statsConfig.map(stat => `
          <div class="stat-card">
              <div class="stat-header">
                  <div>
                      <div class="stat-value" id="${stat.id}Count">${stats[stat.id]}</div>
                      <div class="stat-label">${stat.label}</div>
                  </div>
                  <div class="stat-icon ${stat.class}">
                      <i class="${stat.icon}"></i>
                  </div>
              </div>
              <div class="progress-container">
                  <div class="progress-bar">
                      <div class="progress-fill" style="width: ${stat.progress}%;"></div>
                  </div>
                  <div class="progress-text">
                      <span>Engagement</span>
                      <span>${stat.progress}%</span>
                  </div>
              </div>
          </div>
      `).join('');
  }

  // Render posts
  renderPosts() {
      const filteredPosts = postsManager.getFiltered();
      
      if (filteredPosts.length === 0) {
          this.postsContainer.innerHTML = `
              <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-light);">
                  <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                  <h3>No posts found</h3>
                  <p>Try changing your filters or search terms</p>
              </div>
          `;
          return;
      }

      this.postsContainer.innerHTML = filteredPosts.map(post => this.createPostHTML(post)).join('');
  }

  // Create post HTML
  createPostHTML(post) {
      const categoryClass = `category-${post.category}`;
      const categoryLabels = {
          tech: 'Tech Events',
          sports: 'Sports',
          cultural: 'Cultural',
          announcements: 'Announcements',
          lost: 'Lost & Found',
          opportunities: 'Opportunities'
      };
      
      const icons = {
          tech: 'fas fa-laptop-code',
          sports: 'fas fa-running',
          cultural: 'fas fa-music',
          announcements: 'fas fa-bullhorn',
          lost: 'fas fa-search',
          opportunities: 'fas fa-briefcase'
      };

      return `
          <div class="post-card">
              <div class="post-image">
                  <i class="${icons[post.category]}"></i>
              </div>
              <div class="post-content">
                  <span class="post-category ${categoryClass}">${categoryLabels[post.category]}</span>
                  <h3 class="post-title">${post.title}</h3>
                  <p class="post-description">${post.description}</p>
                  <div class="post-meta">
                      <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                      <span><i class="far fa-user"></i> ${post.interested} interested</span>
                  </div>
                  <div class="post-actions">
                      <button class="action-btn interested" data-id="${post.id}">
                          <i class="far fa-thumbs-up"></i> I'm Interested
                      </button>
                      <button class="action-btn">
                          <i class="far fa-share-square"></i> Share
                      </button>
                  </div>
              </div>
          </div>
      `;
  }

  // Set active filter
  setActiveFilter(category) {
      const buttons = this.filtersContainer.querySelectorAll('.filter-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      
      const activeButton = this.filtersContainer.querySelector(`[data-category="${category}"]`);
      if (activeButton) {
          activeButton.classList.add('active');
      }
  }

  // Update statistics display
  updateStats() {
      const stats = postsManager.getStats();
      statsConfig.forEach(stat => {
          const countElement = document.getElementById(`${stat.id}Count`);
          if (countElement) {
              countElement.textContent = stats[stat.id];
          }
      });
  }

  // Setup event listeners
  setupEventListeners() {
      // Filter buttons
      this.filtersContainer.addEventListener('click', (e) => {
          if (e.target.closest('.filter-btn')) {
              const button = e.target.closest('.filter-btn');
              const category = button.getAttribute('data-category');
              this.handleFilterChange(category, button);
          }
      });

      // Search input with debounce
      this.searchInput.addEventListener('input', debounce((e) => {
          this.handleSearchChange(e.target.value);
      }, 300));

      // Posts container events (delegation)
      this.postsContainer.addEventListener('click', (e) => {
          if (e.target.closest('.action-btn.interested')) {
              const button = e.target.closest('.action-btn.interested');
              const postId = parseInt(button.getAttribute('data-id'));
              this.handleInterestClick(postId);
          }
      });

      // Theme toggle
      this.themeToggle.addEventListener('click', () => {
          this.handleThemeToggle();
      });
  }

  // Handle filter change
  handleFilterChange(category, button) {
      postsManager.setFilter(category);
      this.setActiveFilter(category);
      this.renderPosts();
  }

  // Handle search change
  handleSearchChange(searchTerm) {
      postsManager.setSearchTerm(searchTerm);
      this.renderPosts();
  }

  // Handle interest click
  handleInterestClick(postId) {
      const updatedPost = postsManager.incrementInterest(postId);
      if (updatedPost) {
          this.renderPosts();
          this.updateStats();
          
          // Show feedback
          this.showFeedback('Thanks for showing interest!', 'success');
      }
  }

  // Handle theme toggle
  handleThemeToggle() {
      const isDark = ThemeManager.toggle();
      this.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }

  // Show feedback message
  showFeedback(message, type) {
      // Create feedback element
      const feedback = document.createElement('div');
      feedback.className = `feedback feedback-${type}`;
      feedback.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 5px;
          box-shadow: 0 4px 6px var(--shadow);
          z-index: 1001;
          transform: translateX(100%);
          transition: transform 0.3s ease;
      `;
      feedback.textContent = message;
      
      document.body.appendChild(feedback);
      
      // Animate in
      setTimeout(() => {
          feedback.style.transform = 'translateX(0)';
      }, 100);
      
      // Remove after delay
      setTimeout(() => {
          feedback.style.transform = 'translateX(100%)';
          setTimeout(() => {
              document.body.removeChild(feedback);
          }, 300);
      }, 3000);
  }
}

// Create global UI manager instance
const uiManager = new UIManager();