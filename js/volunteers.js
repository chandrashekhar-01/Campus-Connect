// Volunteer Management

class VolunteerManager {
  constructor() {
      this.volunteers = Storage.get('campusConnectVolunteers') || {};
  }

  // Add volunteer role to event
  addVolunteerRole(eventId, role, description, slots) {
      if (!this.volunteers[eventId]) {
          this.volunteers[eventId] = [];
      }

      const roleId = generateId();
      const volunteerRole = {
          id: roleId,
          role: role,
          description: description,
          slots: slots,
          volunteers: []
      };

      this.volunteers[eventId].push(volunteerRole);
      Storage.set('campusConnectVolunteers', this.volunteers);
      return volunteerRole;
  }

  // Join as volunteer
  joinAsVolunteer(eventId, roleId, userName) {
      if (!this.volunteers[eventId]) return null;

      const role = this.volunteers[eventId].find(r => r.id === roleId);
      if (!role) return null;

      // Check if user already volunteered
      const existingIndex = role.volunteers.findIndex(v => v.name === userName);
      if (existingIndex !== -1) {
          // Remove if already volunteered
          role.volunteers.splice(existingIndex, 1);
      } else {
          // Add if slots available
          if (role.volunteers.length < role.slots) {
              role.volunteers.push({
                  name: userName,
                  joined: new Date().toISOString()
              });
          }
      }

      Storage.set('campusConnectVolunteers', this.volunteers);
      return role;
  }

  // Get volunteers for event
  getEventVolunteers(eventId) {
      return this.volunteers[eventId] || [];
  }

  // Check if user is volunteering
  isUserVolunteering(eventId, roleId, userName) {
      const role = this.volunteers[eventId]?.find(r => r.id === roleId);
      return role ? role.volunteers.some(v => v.name === userName) : false;
  }
}

// Create global volunteer manager instance
const volunteerManager = new VolunteerManager();