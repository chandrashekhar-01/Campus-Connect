// Idea Board Management

class IdeaManager {
  constructor() {
      this.ideas = Storage.get('campusConnectIdeas') || [];
      this.upvotes = Storage.get('campusConnectUpvotes') || {};
  }

  // Submit new idea
  submitIdea(title, description, category, author) {
      const idea = {
          id: generateId(),
          title: title,
          description: description,
          category: category,
          author: author,
          upvotes: 0,
          createdAt: new Date().toISOString(),
          status: 'pending' // pending, approved, implemented
      };

      this.ideas.unshift(idea);
      Storage.set('campusConnectIdeas', this.ideas);
      return idea;
  }

  // Upvote idea
  upvoteIdea(ideaId, userName) {
      const idea = this.ideas.find(i => i.id === ideaId);
      if (!idea) return null;

      const upvoteKey = `idea_${ideaId}_${userName}`;
      
      if (this.upvotes[upvoteKey]) {
          // Remove upvote
          idea.upvotes--;
          delete this.upvotes[upvoteKey];
      } else {
          // Add upvote
          idea.upvotes++;
          this.upvotes[upvoteKey] = true;
      }

      Storage.set('campusConnectIdeas', this.ideas);
      Storage.set('campusConnectUpvotes', this.upvotes);
      return idea;
  }

  // Get all ideas
  getAllIdeas() {
      return this.ideas.sort((a, b) => b.upvotes - a.upvotes);
  }

  // Get ideas by category
  getIdeasByCategory(category) {
      return this.ideas.filter(idea => idea.category === category);
  }

  // Get top ideas
  getTopIdeas(limit = 5) {
      return this.ideas
          .sort((a, b) => b.upvotes - a.upvotes)
          .slice(0, limit);
  }

  // Check if user upvoted idea
  hasUserUpvoted(ideaId, userName) {
      return !!this.upvotes[`idea_${ideaId}_${userName}`];
  }
}

// Create global idea manager instance
const ideaManager = new IdeaManager();