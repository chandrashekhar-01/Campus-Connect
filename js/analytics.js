// Analytics Page Functionality

class AnalyticsManager {
  constructor() {
      this.chartManager = chartManager;
  }

  // Initialize analytics page
  init() {
      this.renderAnalytics();
      this.setupEventListeners();
      ThemeManager.init();
      this.updateThemeToggleIcon();
  }

  // Render all analytics
  renderAnalytics() {
      const posts = postsManager.getAll();
      
      // Initialize charts after a short delay to ensure DOM is ready
      setTimeout(() => {
          this.chartManager.initCategoryChart('categoryChart', posts);
          
          const rsvpStats = eventManager.getRSVPStatsByCategory(posts);
          this.chartManager.initAttendanceChart('attendanceChart', rsvpStats);
          
          this.chartManager.initEngagementChart('engagementChart');
          this.chartManager.initLostFoundChart('lostFoundChart', posts);
          this.chartManager.initLeaderboardChart('leaderboardChart');

          // Initialize poll chart if there are polls
          const polls = Object.values(pollManager.polls);
          if (polls.length > 0) {
              this.chartManager.initPollChart('pollChart', polls[0]);
          }
      }, 100);
  }

  // Setup event listeners
  setupEventListeners() {
      // Theme toggle
      document.getElementById('themeToggle').addEventListener('click', () => {
          const isDark = ThemeManager.toggle();
          document.getElementById('themeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
          this.chartManager.updateChartColors();
      });

      // Refresh button (mock functionality)
      document.addEventListener('keydown', (e) => {
          if (e.key === 'r' && e.ctrlKey) {
              e.preventDefault();
              this.refreshAnalytics();
          }
      });
  }

  // Refresh analytics (mock functionality)
  refreshAnalytics() {
      this.chartManager.destroyAllCharts();
      this.renderAnalytics();
      
      // Show refresh feedback
      const feedback = document.createElement('div');
      feedback.textContent = 'Analytics updated';
      feedback.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--success);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 5px;
          box-shadow: 0 4px 6px var(--shadow);
          z-index: 1001;
      `;
      document.body.appendChild(feedback);
      
      setTimeout(() => {
          document.body.removeChild(feedback);
      }, 2000);
  }

  // Update theme toggle icon
  updateThemeToggleIcon() {
      const currentTheme = ThemeManager.getCurrent();
      const themeToggle = document.getElementById('themeToggle');
      themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

// Initialize analytics page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const analyticsManager = new AnalyticsManager();
  analyticsManager.init();
});