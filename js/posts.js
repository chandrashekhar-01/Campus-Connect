// Posts management functionality

class PostsManager {
  constructor() {
      this.posts = Storage.get('campusConnectPosts') || samplePosts;
      this.currentFilter = 'all';
      this.currentSearch = '';
  }

  // Get all posts
  getAll() {
      return this.posts;
  }

  // Get filtered posts
  getFiltered() {
      return this.posts.filter(post => {
          const matchesCategory = this.currentFilter === 'all' || post.category === this.currentFilter;
          const matchesSearch = post.title.toLowerCase().includes(this.currentSearch) || 
                               post.description.toLowerCase().includes(this.currentSearch);
          return matchesCategory && matchesSearch;
      });
  }

  // Add new post
  addPost(title, category, description) {
      const newPost = {
          id: generateId(),
          title,
          category,
          description,
          date: new Date().toISOString().split('T')[0],
          interested: 0
      };
      
      this.posts.unshift(newPost);
      Storage.set('campusConnectPosts', this.posts);
      return newPost;
  }

  // Increment interest count
  incrementInterest(postId) {
      const postIndex = this.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
          this.posts[postIndex].interested += 1;
          Storage.set('campusConnectPosts', this.posts);
          return this.posts[postIndex];
      }
      return null;
  }

  // Set current filter
  setFilter(filter) {
      this.currentFilter = filter;
  }

  // Set current search term
  setSearchTerm(term) {
      this.currentSearch = term.toLowerCase();
  }

  // Get posts by category
  getPostsByCategory(category) {
      return this.posts.filter(post => post.category === category);
  }

  // Get statistics
  getStats() {
      const stats = {};
      statsConfig.forEach(stat => {
          stats[stat.id] = this.getPostsByCategory(stat.id).length;
      });
      return stats;
  }
}

// Create global posts manager instance
const postsManager = new PostsManager();