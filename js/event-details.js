// Event Details Page Functionality

class EventDetailsManager {
  constructor() {
      this.currentEventId = null;
  }

  // Initialize event details page
  init() {
      this.loadEventFromURL();
      this.setupEventListeners();
      ThemeManager.init();
      this.updateThemeToggleIcon();
  }

  // Load event from URL parameter
  loadEventFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      this.currentEventId = parseInt(urlParams.get('id'));
      
      if (this.currentEventId) {
          this.loadEventDetails(this.currentEventId);
      } else {
          this.showError('No event ID specified');
      }
  }

  // Load event details
  loadEventDetails(eventId) {
      const event = postsManager.getAll().find(p => p.id === eventId);
      
      if (!event) {
          this.showError('Event not found');
          return;
      }

      this.renderEventDetails(event);
      this.loadEventAnalytics(event);
      this.loadPollSection(event);
      this.loadVolunteerSection(event);
  }

  // Render event details
  renderEventDetails(event) {
      const container = document.getElementById('eventDetailContainer');
      const rsvpData = eventManager.getEventRSVP(event.id);
      const isInCalendar = calendarManager.getCalendarEvents().some(e => e.id === event.id);

      const categoryClass = `category-${event.category}`;
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

      container.innerHTML = `
          <div class="event-header">
              <div class="event-image">
                  <i class="${icons[event.category]}"></i>
              </div>
              <div class="event-info">
                  <span class="event-category ${categoryClass}">${categoryLabels[event.category]}</span>
                  <h1 class="event-title">${event.title}</h1>
                  <div class="event-meta">
                      <div class="meta-item">
                          <i class="far fa-calendar"></i>
                          <span>${formatDate(event.date)}</span>
                      </div>
                      <div class="meta-item">
                          <i class="far fa-clock"></i>
                          <span>2:00 PM - 5:00 PM</span>
                      </div>
                      <div class="meta-item">
                          <i class="fas fa-map-marker-alt"></i>
                          <span>Student Union Building</span>
                      </div>
                  </div>
                  <p class="event-description">${event.description}</p>
                  <div class="event-actions">
                      <button class="action-btn-large btn-primary" id="rsvpToggle">
                          <i class="far fa-calendar-check"></i>
                          ${isInCalendar ? 'Remove from Calendar' : 'Add to Calendar'}
                      </button>
                      <button class="action-btn-large btn-secondary" onclick="window.print()">
                          <i class="fas fa-print"></i> Print Details
                      </button>
                      <button class="action-btn-large btn-success" onclick="shareEvent(${event.id})">
                          <i class="fas fa-share-alt"></i> Share Event
                      </button>
                  </div>
              </div>
          </div>

          <!-- RSVP Section -->
          <div class="rsvp-section">
              <h3>Are you attending?</h3>
              <div class="rsvp-options">
                  <button class="rsvp-btn ${rsvpData.userResponse === 'going' ? 'active' : ''}" 
                          data-response="going">
                      <i class="fas fa-check-circle"></i> Going (${rsvpData.going})
                  </button>
                  <button class="rsvp-btn ${rsvpData.userResponse === 'interested' ? 'active' : ''}" 
                          data-response="interested">
                      <i class="far fa-thumbs-up"></i> Interested (${rsvpData.interested})
                  </button>
                  <button class="rsvp-btn ${!rsvpData.userResponse ? 'active' : ''}" 
                          data-response="none">
                      <i class="far fa-question-circle"></i> Not Sure
                  </button>
              </div>
              <div class="attendance-stats">
                  <div class="stat-item">
                      <div class="stat-number">${rsvpData.going}</div>
                      <div class="stat-label">Confirmed</div>
                  </div>
                  <div class="stat-item">
                      <div class="stat-number">${rsvpData.interested}</div>
                      <div class="stat-label">Interested</div>
                  </div>
                  <div class="stat-item">
                      <div class="stat-number">${rsvpData.going + rsvpData.interested}</div>
                      <div class="stat-label">Total RSVPs</div>
                  </div>
                  <div class="stat-item">
                      <div class="stat-number">${Math.floor((rsvpData.going / Math.max(rsvpData.going + rsvpData.interested, 1)) * 100)}%</div>
                      <div class="stat-label">Commitment Rate</div>
                  </div>
              </div>
          </div>

          <!-- Additional Event Details -->
          <div class="event-additional-info">
              <h3>Event Details</h3>
              <div class="info-grid">
                  <div class="info-item">
                      <h4><i class="fas fa-users"></i> Expected Attendance</h4>
                      <p>${rsvpData.going + rsvpData.interested} students registered</p>
                  </div>
                  <div class="info-item">
                      <h4><i class="fas fa-tag"></i> Event Type</h4>
                      <p>${categoryLabels[event.category]}</p>
                  </div>
                  <div class="info-item">
                      <h4><i class="fas fa-clock"></i> Duration</h4>
                      <p>3 hours</p>
                  </div>
                  <div class="info-item">
                      <h4><i class="fas fa-phone"></i> Contact</h4>
                      <p>events@campus.edu | (123) 456-7890</p>
                  </div>
              </div>
          </div>
      `;

      this.setupRSVPEventListeners();
      this.setupCalendarToggle(event, isInCalendar);
  }

  // Setup RSVP event listeners
  setupRSVPEventListeners() {
      const rsvpButtons = document.querySelectorAll('.rsvp-btn');
      rsvpButtons.forEach(button => {
          button.addEventListener('click', (e) => {
              const response = e.target.closest('.rsvp-btn').getAttribute('data-response');
              this.handleRSVP(response);
          });
      });
  }

  // Setup calendar toggle
  setupCalendarToggle(event, isInCalendar) {
      const calendarToggle = document.getElementById('rsvpToggle');
      calendarToggle.addEventListener('click', () => {
          this.toggleCalendarEvent(event, isInCalendar);
      });
  }

  // Handle RSVP
  handleRSVP(response) {
      if (response === 'none') {
          eventManager.rsvpToEvent(this.currentEventId, null);
      } else {
          eventManager.rsvpToEvent(this.currentEventId, response);
      }
      this.loadEventDetails(this.currentEventId); // Reload to update counts
  }

  // Toggle calendar event
  toggleCalendarEvent(event, isInCalendar) {
      if (isInCalendar) {
          calendarManager.removeFromCalendar(event.id);
          uiManager.showFeedback('Event removed from calendar', 'success');
      } else {
          calendarManager.addToCalendar(event.id, {
              title: event.title,
              date: event.date,
              category: event.category
          });
          uiManager.showFeedback('Event added to calendar', 'success');
      }
      this.loadEventDetails(this.currentEventId); // Reload to update button
  }

  // Load event analytics
  loadEventAnalytics(event) {
      // Initialize charts after a short delay to ensure DOM is ready
      setTimeout(() => {
          chartManager.initAttendanceChart('attendanceChart', {
              [event.category]: eventManager.getEventRSVP(event.id).going
          });

          // Mock volunteer data for demo
          chartManager.initPollChart('volunteerChart', {
              options: [
                  { text: 'Event Setup', votes: 8 },
                  { text: 'Registration', votes: 12 },
                  { text: 'Photography', votes: 5 },
                  { text: 'Cleanup', votes: 6 }
              ],
              totalVotes: 31
          });
      }, 100);
  }

  // Load poll section
  loadPollSection(event) {
      const poll = pollManager.getPollForEvent(event.id);
      const pollSection = document.getElementById('pollSection');

      if (poll) {
          const userVote = pollManager.getUserVote(poll.id);
          const percentages = pollManager.calculatePollPercentages(poll);

          pollSection.innerHTML = `
              <h3>Event Poll: ${poll.question}</h3>
              <div class="poll-options">
                  ${percentages.map((option, index) => `
                      <div class="poll-option ${userVote === index ? 'selected' : ''}" 
                           data-index="${index}">
                          <div class="poll-option-header">
                              <span class="poll-text">${option.text}</span>
                              <span class="poll-percentage">${option.percentage}%</span>
                          </div>
                          <div class="poll-bar">
                              <div class="poll-fill" style="width: ${option.percentage}%"></div>
                          </div>
                          <div class="poll-votes">${option.votes} votes</div>
                      </div>
                  `).join('')}
              </div>
              <div class="total-votes">Total votes: ${poll.totalVotes}</div>
          `;

          this.setupPollEventListeners(poll.id);
      } else {
          pollSection.innerHTML = `
              <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                  <i class="fas fa-chart-bar" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                  <h3>No Active Poll</h3>
                  <p>Check back later for event polls and surveys</p>
              </div>
          `;
      }
  }

  // Setup poll event listeners
  setupPollEventListeners(pollId) {
      const pollOptions = document.querySelectorAll('.poll-option');
      pollOptions.forEach(option => {
          option.addEventListener('click', (e) => {
              const index = parseInt(e.currentTarget.getAttribute('data-index'));
              pollManager.voteInPoll(pollId, index);
              this.loadPollSection(postsManager.getAll().find(p => p.id === this.currentEventId));
          });
      });
  }

  // Load volunteer section
  loadVolunteerSection(event) {
      const volunteers = volunteerManager.getEventVolunteers(event.id);
      // This would be implemented similarly to the poll section
  }

  // Show error message
  showError(message) {
      const container = document.getElementById('eventDetailContainer');
      container.innerHTML = `
          <div style="text-align: center; padding: 3rem; color: var(--text-light);">
              <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
              <h2>Event Not Found</h2>
              <p>${message}</p>
              <a href="index.html" class="action-btn-large btn-primary" style="margin-top: 1rem;">
                  <i class="fas fa-arrow-left"></i> Back to Dashboard
              </a>
          </div>
      `;
  }

  // Update theme toggle icon
  updateThemeToggleIcon() {
      const currentTheme = ThemeManager.getCurrent();
      const themeToggle = document.getElementById('themeToggle');
      themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }

  // Setup event listeners
  setupEventListeners() {
      // Theme toggle
      document.getElementById('themeToggle').addEventListener('click', () => {
          const isDark = ThemeManager.toggle();
          document.getElementById('themeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
          chartManager.updateChartColors();
      });
  }
}

// Global function to share event
function shareEvent(eventId) {
  const event = postsManager.getAll().find(p => p.id === eventId);
  if (navigator.share) {
      navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
      });
  } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
  }
}

// Initialize event details page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const eventDetailsManager = new EventDetailsManager();
  eventDetailsManager.init();
});