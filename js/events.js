// Event RSVP and Attendance Management

class EventManager {
  constructor() {
      this.rsvpData = Storage.get('campusConnectRSVP') || {};
      this.attendanceData = Storage.get('campusConnectAttendance') || {};
  }

  // RSVP for an event
  rsvpToEvent(eventId, response) {
      if (!this.rsvpData[eventId]) {
          this.rsvpData[eventId] = {
              going: 0,
              interested: 0,
              userResponse: null
          };
      }

      // Update user's response
      const previousResponse = this.rsvpData[eventId].userResponse;
      if (previousResponse === response) {
          // Toggle off if clicking same button
          this.rsvpData[eventId].userResponse = null;
          if (response === 'going') {
              this.rsvpData[eventId].going = Math.max(0, this.rsvpData[eventId].going - 1);
          } else {
              this.rsvpData[eventId].interested = Math.max(0, this.rsvpData[eventId].interested - 1);
          }
      } else {
          // Remove previous response if any
          if (previousResponse === 'going') {
              this.rsvpData[eventId].going = Math.max(0, this.rsvpData[eventId].going - 1);
          } else if (previousResponse === 'interested') {
              this.rsvpData[eventId].interested = Math.max(0, this.rsvpData[eventId].interested - 1);
          }

          // Add new response
          this.rsvpData[eventId].userResponse = response;
          if (response === 'going') {
              this.rsvpData[eventId].going += 1;
          } else {
              this.rsvpData[eventId].interested += 1;
          }
      }

      Storage.set('campusConnectRSVP', this.rsvpData);
      return this.rsvpData[eventId];
  }

  // Get RSVP data for event
  getEventRSVP(eventId) {
      return this.rsvpData[eventId] || { going: 0, interested: 0, userResponse: null };
  }

  // Record attendance
  recordAttendance(eventId) {
      if (!this.attendanceData[eventId]) {
          this.attendanceData[eventId] = 0;
      }
      this.attendanceData[eventId] += 1;
      Storage.set('campusConnectAttendance', this.attendanceData);
      return this.attendanceData[eventId];
  }

  // Get attendance data
  getAttendanceData() {
      return this.attendanceData;
  }

  // Get RSVP statistics by category
  getRSVPStatsByCategory(posts) {
      const stats = {
          tech: 0,
          sports: 0,
          cultural: 0,
          announcements: 0,
          lost: 0,
          opportunities: 0
      };

      posts.forEach(post => {
          const rsvp = this.getEventRSVP(post.id);
          stats[post.category] += rsvp.going + rsvp.interested;
      });

      return stats;
  }
}

// Create global event manager instance
const eventManager = new EventManager();