// Utility functions

// Format date for display
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Generate unique ID
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

// LocalStorage helpers
const Storage = {
  get: (key) => {
      try {
          return JSON.parse(localStorage.getItem(key));
      } catch (error) {
          console.error('Error reading from localStorage:', error);
          return null;
      }
  },
  
  set: (key, value) => {
      try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
      } catch (error) {
          console.error('Error writing to localStorage:', error);
          return false;
      }
  },
  
  remove: (key) => {
      try {
          localStorage.removeItem(key);
          return true;
      } catch (error) {
          console.error('Error removing from localStorage:', error);
          return false;
      }
  }
};

// Theme management
const ThemeManager = {
  init: () => {
      const savedTheme = Storage.get('campusConnectTheme');
      if (savedTheme === 'dark') {
          document.body.classList.add('dark-mode');
      }
  },
  
  toggle: () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      Storage.set('campusConnectTheme', isDark ? 'dark' : 'light');
      return isDark;
  },
  
  getCurrent: () => {
      return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  }
};