// Simple Calendar Manager
class SimpleCalendarManager {
    constructor() {
        this.currentDate = new Date();
        this.events = [];
    }

    // Initialize calendar
    init() {
        this.renderCalendar();
        this.setupEventListeners();
        this.loadEvents();
    }

    // Render calendar
    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthElement = document.getElementById('currentMonth');
        
        if (!calendarGrid || !currentMonthElement) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month display
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const today = new Date();
        
        // Clear calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day header';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Add empty cells for days before the first day
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = today.toDateString() === new Date(year, month, day).toDateString();
            
            dayElement.className = `calendar-day ${isToday ? 'today' : ''}`;
            dayElement.innerHTML = `
                <div class="calendar-date">${day}</div>
                <div class="calendar-events" id="events-${dateString}">
                    <!-- Events will be added here -->
                </div>
            `;
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Add events to calendar
        this.renderEvents();
    }

    // Load events from posts
    loadEvents() {
        const posts = postsManager.getAll();
        this.events = posts
            .filter(post => post.date)
            .map(post => ({
                id: post.id,
                title: post.title,
                date: post.date,
                category: post.category,
                description: post.description
            }));
    }

    // Render events on calendar
    renderEvents() {
        this.events.forEach(event => {
            const eventElement = document.getElementById(`events-${event.date}`);
            if (eventElement) {
                const eventDiv = document.createElement('div');
                eventDiv.className = `calendar-event ${event.category}`;
                eventDiv.textContent = event.title.length > 12 ? event.title.substring(0, 12) + '...' : event.title;
                eventDiv.title = event.title;
                eventDiv.onclick = () => this.showEventDetails(event);
                eventElement.appendChild(eventDiv);
            }
        });
    }

    // Show event details
    showEventDetails(event) {
        const modal = document.getElementById('eventDetailsModal');
        const modalTitle = document.getElementById('eventModalTitle');
        const modalBody = document.getElementById('eventModalBody');
        
        if (!modal || !modalTitle || !modalBody) return;

        modalTitle.textContent = event.title;
        
        const rsvpData = eventManager.getEventRSVP(event.id);
        const poll = pollManager.getPollForEvent(event.id);
        
        modalBody.innerHTML = `
            <div class="event-detail-header">
                <span class="event-category category-${event.category}">${this.getCategoryLabel(event.category)}</span>
                <div class="event-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(event.date)}</span>
                    <span><i class="far fa-clock"></i> 2:00 PM - 5:00 PM</span>
                    <span><i class="fas fa-map-marker-alt"></i> Student Union Building</span>
                </div>
            </div>
            
            <div class="event-description">
                <p>${event.description}</p>
            </div>
            
            <div class="rsvp-section">
                <h4>Are you attending?</h4>
                <div class="rsvp-options">
                    <button class="rsvp-btn ${rsvpData.userResponse === 'going' ? 'active' : ''}" data-response="going">
                        <i class="fas fa-check-circle"></i> Going (${rsvpData.going})
                    </button>
                    <button class="rsvp-btn ${rsvpData.userResponse === 'interested' ? 'active' : ''}" data-response="interested">
                        <i class="far fa-thumbs-up"></i> Interested (${rsvpData.interested})
                    </button>
                </div>
            </div>
            
            ${poll ? this.renderPollSection(poll) : ''}
            
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="calendarManager.addToCalendar(${event.id})">
                    <i class="far fa-calendar-plus"></i> Add to My Calendar
                </button>
                <button class="btn btn-secondary" onclick="document.getElementById('eventDetailsModal').style.display='none'">
                    Close
                </button>
            </div>
        `;
        
        // Add RSVP event listeners
        this.setupRSVPEventListeners(event.id);
        
        modal.style.display = 'flex';
    }

    // Setup RSVP event listeners
    setupRSVPEventListeners(eventId) {
        const rsvpButtons = document.querySelectorAll('.rsvp-btn');
        rsvpButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const response = e.target.closest('.rsvp-btn').getAttribute('data-response');
                eventManager.rsvpToEvent(eventId, response);
                this.showEventDetails(postsManager.getAll().find(p => p.id === eventId));
            });
        });
    }

    // Render poll section
    renderPollSection(poll) {
        const userVote = pollManager.getUserVote(poll.id);
        const percentages = pollManager.calculatePollPercentages(poll);
        
        return `
            <div class="poll-section">
                <h4>Event Poll: ${poll.question}</h4>
                <div class="poll-options">
                    ${percentages.map((option, index) => `
                        <div class="poll-option ${userVote === index ? 'selected' : ''}" data-index="${index}">
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
            </div>
        `;
    }

    // Get category label
    getCategoryLabel(category) {
        const labels = {
            tech: 'Tech Events',
            sports: 'Sports',
            cultural: 'Cultural',
            announcements: 'Announcements',
            lost: 'Lost & Found',
            opportunities: 'Opportunities'
        };
        return labels[category] || category;
    }

    // Setup event listeners
    setupEventListeners() {
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const closeEventModal = document.getElementById('closeEventModal');

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }

        if (closeEventModal) {
            closeEventModal.addEventListener('click', () => {
                document.getElementById('eventDetailsModal').style.display = 'none';
            });
        }
    }

    // Add event to calendar
    addToCalendar(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            calendarManager.addToCalendar(eventId, event);
            uiManager.showFeedback('Event added to calendar!', 'success');
        }
    }
}

// Create global calendar manager instance
const simpleCalendarManager = new SimpleCalendarManager();