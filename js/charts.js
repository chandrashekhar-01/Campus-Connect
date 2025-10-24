// Charts and Visualization Management

class ChartManager {
  constructor() {
      this.charts = {};
  }

  // Initialize category distribution chart
  initCategoryChart(canvasId, posts) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      
      const categoryCounts = {
          tech: posts.filter(p => p.category === 'tech').length,
          sports: posts.filter(p => p.category === 'sports').length,
          cultural: posts.filter(p => p.category === 'cultural').length,
          announcements: posts.filter(p => p.category === 'announcements').length,
          lost: posts.filter(p => p.category === 'lost').length,
          opportunities: posts.filter(p => p.category === 'opportunities').length
      };

      this.charts.categoryChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ['Tech Events', 'Sports', 'Cultural', 'Announcements', 'Lost & Found', 'Opportunities'],
              datasets: [{
                  data: Object.values(categoryCounts),
                  backgroundColor: [
                      '#4361ee', '#f8961e', '#f72585', '#4cc9f0', '#3f37c9', '#4895ef'
                  ],
                  borderWidth: 2,
                  borderColor: getComputedStyle(document.body).getPropertyValue('--bg') || '#ffffff'
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'bottom',
                      labels: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333',
                          font: {
                              family: "'Poppins', sans-serif"
                          }
                      }
                  },
                  title: {
                      display: false
                  }
              }
          }
      });
  }

  // Initialize engagement trend chart
  initEngagementChart(canvasId) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      
      // Mock engagement data for demonstration
      const engagementData = {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
              label: 'Posts',
              data: [12, 19, 8, 15, 22, 10, 7],
              borderColor: '#4361ee',
              backgroundColor: 'rgba(67, 97, 238, 0.1)',
              tension: 0.4,
              fill: true
          }, {
              label: 'RSVPs',
              data: [8, 12, 6, 10, 18, 5, 3],
              borderColor: '#f8961e',
              backgroundColor: 'rgba(248, 150, 30, 0.1)',
              tension: 0.4,
              fill: true
          }]
      };

      this.charts.engagementChart = new Chart(ctx, {
          type: 'line',
          data: engagementData,
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      labels: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true,
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  },
                  x: {
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  }
              }
          }
      });
  }

  // Initialize attendance chart
  initAttendanceChart(canvasId, rsvpStats) {
      const ctx = document.getElementById(canvasId).getContext('2d');

      this.charts.attendanceChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['Tech', 'Sports', 'Cultural', 'Announcements'],
              datasets: [{
                  label: 'Total RSVPs',
                  data: [
                      rsvpStats.tech || 0,
                      rsvpStats.sports || 0,
                      rsvpStats.cultural || 0,
                      rsvpStats.announcements || 0
                  ],
                  backgroundColor: [
                      'rgba(67, 97, 238, 0.8)',
                      'rgba(248, 150, 30, 0.8)',
                      'rgba(247, 37, 133, 0.8)',
                      'rgba(76, 201, 240, 0.8)'
                  ],
                  borderColor: [
                      '#4361ee',
                      '#f8961e',
                      '#f72585',
                      '#4cc9f0'
                  ],
                  borderWidth: 2
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      display: false
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true,
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  },
                  x: {
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  }
              }
          }
      });
  }

  // Initialize lost & found chart
  initLostFoundChart(canvasId, posts) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      
      const lostPosts = posts.filter(p => p.category === 'lost');
      const resolvedCount = Math.floor(lostPosts.length * 0.7); // Mock resolved count
      const pendingCount = lostPosts.length - resolvedCount;

      this.charts.lostFoundChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['Resolved', 'Pending'],
              datasets: [{
                  data: [resolvedCount, pendingCount],
                  backgroundColor: [
                      'rgba(76, 201, 240, 0.8)',
                      'rgba(248, 150, 30, 0.8)'
                  ],
                  borderColor: [
                      '#4cc9f0',
                      '#f8961e'
                  ],
                  borderWidth: 2
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'bottom',
                      labels: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  }
              }
          }
      });
  }

  // Initialize leaderboard chart
  initLeaderboardChart(canvasId) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      
      // Mock leaderboard data
      const leaderboardData = {
          labels: ['Alex Johnson', 'Sarah Chen', 'Mike Davis', 'Emily Wilson', 'David Brown'],
          datasets: [{
              label: 'Contributions',
              data: [45, 38, 32, 28, 25],
              backgroundColor: 'rgba(67, 97, 238, 0.8)',
              borderColor: '#4361ee',
              borderWidth: 2
          }]
      };

      this.charts.leaderboardChart = new Chart(ctx, {
          type: 'bar',
          data: leaderboardData,
          options: {
              indexAxis: 'y',
              responsive: true,
              plugins: {
                  legend: {
                      display: false
                  }
              },
              scales: {
                  x: {
                      beginAtZero: true,
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  },
                  y: {
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  }
              }
          }
      });
  }

  // Initialize poll results chart
  initPollChart(canvasId, poll) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      
      const percentages = pollManager.calculatePollPercentages(poll);

      this.charts.pollChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: percentages.map(opt => opt.text),
              datasets: [{
                  label: 'Votes (%)',
                  data: percentages.map(opt => opt.percentage),
                  backgroundColor: 'rgba(67, 97, 238, 0.8)',
                  borderColor: '#4361ee',
                  borderWidth: 2
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      display: false
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  },
                  x: {
                      grid: {
                          color: getComputedStyle(document.body).getPropertyValue('--border') || '#e9ecef'
                      },
                      ticks: {
                          color: getComputedStyle(document.body).getPropertyValue('--text') || '#333333'
                      }
                  }
              }
          }
      });
  }

  // Update chart colors based on theme
  updateChartColors() {
      Object.values(this.charts).forEach(chart => {
          chart.update();
      });
  }

  // Destroy all charts
  destroyAllCharts() {
      Object.values(this.charts).forEach(chart => {
          chart.destroy();
      });
      this.charts = {};
  }
}

// Create global chart manager instance
const chartManager = new ChartManager();