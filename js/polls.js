// Polls and Voting Management

class PollManager {
  constructor() {
      this.polls = Storage.get('campusConnectPolls') || {};
      this.votes = Storage.get('campusConnectVotes') || {};
  }

  // Create a new poll
  createPoll(eventId, question, options) {
      const pollId = generateId();
      this.polls[pollId] = {
          id: pollId,
          eventId: eventId,
          question: question,
          options: options.map(option => ({
              text: option,
              votes: 0
          })),
          totalVotes: 0,
          created: new Date().toISOString()
      };

      Storage.set('campusConnectPolls', this.polls);
      return this.polls[pollId];
  }

  // Vote in a poll
  voteInPoll(pollId, optionIndex) {
      if (!this.polls[pollId]) return null;

      const userVoteKey = `poll_${pollId}`;
      const previousVote = this.votes[userVoteKey];

      // Remove previous vote if exists
      if (previousVote !== undefined) {
          this.polls[pollId].options[previousVote].votes--;
          this.polls[pollId].totalVotes--;
      }

      // Add new vote
      this.polls[pollId].options[optionIndex].votes++;
      this.polls[pollId].totalVotes++;
      this.votes[userVoteKey] = optionIndex;

      Storage.set('campusConnectPolls', this.polls);
      Storage.set('campusConnectVotes', this.votes);
      return this.polls[pollId];
  }

  // Get poll for event
  getPollForEvent(eventId) {
      return Object.values(this.polls).find(poll => poll.eventId === eventId);
  }

  // Get user's vote for poll
  getUserVote(pollId) {
      return this.votes[`poll_${pollId}`];
  }

  // Calculate poll percentages
  calculatePollPercentages(poll) {
      return poll.options.map(option => ({
          ...option,
          percentage: poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0
      }));
  }
}

// Create global poll manager instance
const pollManager = new PollManager();