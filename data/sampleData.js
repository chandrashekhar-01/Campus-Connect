// Sample data for initial posts
const samplePosts = [
  {
      id: 1,
      title: "Annual Tech Fest 2023",
      category: "tech",
      description: "Join us for the biggest tech event of the year featuring coding competitions, workshops, and tech talks from industry experts.",
      date: "2023-10-15",
      interested: 45
  },
  {
      id: 2,
      title: "Basketball Tournament Finals",
      category: "sports",
      description: "Come support our teams in the championship games. Free entry for all students with valid ID.",
      date: "2023-10-18",
      interested: 32
  },
  {
      id: 3,
      title: "Cultural Night Performances",
      category: "cultural",
      description: "Experience diverse cultural performances from our student community. Food stalls and activities included.",
      date: "2023-10-20",
      interested: 67
  },
  {
      id: 4,
      title: "Library Closing Early",
      category: "announcements",
      description: "The main library will close at 5 PM this Friday for maintenance work. We apologize for any inconvenience.",
      date: "2023-10-12",
      interested: 12
  },
  {
      id: 5,
      title: "Found: Blue Backpack",
      category: "lost",
      description: "Found a blue backpack near the student center. Contains textbooks and a laptop. Contact security to claim.",
      date: "2023-10-11",
      interested: 5
  },
  {
      id: 6,
      title: "Internship Fair Next Week",
      category: "opportunities",
      description: "Top companies will be on campus recruiting for summer internships. Bring your resume and dress professionally.",
      date: "2023-10-25",
      interested: 89
  },
  {
      id: 7,
      title: "Hackathon Registration Open",
      category: "tech",
      description: "24-hour coding competition with exciting prizes. Teams of up to 4 members. Register by October 30.",
      date: "2023-11-05",
      interested: 78
  },
  {
      id: 8,
      title: "Yoga Club Weekly Sessions",
      category: "sports",
      description: "Join our yoga sessions every Tuesday and Thursday at the gym. All skill levels welcome. Mats provided.",
      date: "2023-10-17",
      interested: 23
  }
];

// Filter categories
const categories = [
  { id: 'all', name: 'All', icon: 'fas fa-th-large' },
  { id: 'tech', name: 'Tech Events', icon: 'fas fa-laptop-code' },
  { id: 'sports', name: 'Sports', icon: 'fas fa-running' },
  { id: 'cultural', name: 'Cultural', icon: 'fas fa-music' },
  { id: 'announcements', name: 'Announcements', icon: 'fas fa-bullhorn' },
  { id: 'lost', name: 'Lost & Found', icon: 'fas fa-search' },
  { id: 'opportunities', name: 'Opportunities', icon: 'fas fa-briefcase' }
];

// Stats configuration
const statsConfig = [
  { 
      id: 'tech', 
      label: 'Tech Events', 
      icon: 'fas fa-laptop-code', 
      class: 'tech',
      progress: 65 
  },
  { 
      id: 'sports', 
      label: 'Sports Events', 
      icon: 'fas fa-running', 
      class: 'sports',
      progress: 45 
  },
  { 
      id: 'cultural', 
      label: 'Cultural Activities', 
      icon: 'fas fa-music', 
      class: 'cultural',
      progress: 70 
  },
  { 
      id: 'announcements', 
      label: 'Announcements', 
      icon: 'fas fa-bullhorn', 
      class: 'announcements',
      progress: 85 
  }
];

// Add to existing sampleData.js file

// Sample polls data
const samplePolls = {
    1: {
        id: 1,
        eventId: 1,
        question: "Which workshop would you like to see next?",
        options: [
            { text: "Web Development with React", votes: 15 },
            { text: "Data Science Fundamentals", votes: 8 },
            { text: "Mobile App Development", votes: 12 },
            { text: "UI/UX Design Principles", votes: 7 }
        ],
        totalVotes: 42,
        created: "2023-10-10"
    }
};

// Sample volunteers data
const sampleVolunteers = {
    1: [
        {
            id: 1,
            role: "Event Coordinator",
            description: "Manage event setup and coordination",
            slots: 2,
            volunteers: [
                { name: "Alex Johnson", joined: "2023-10-12" }
            ]
        },
        {
            id: 2,
            role: "Registration Desk",
            description: "Handle participant check-in",
            slots: 4,
            volunteers: [
                { name: "Sarah Chen", joined: "2023-10-11" },
                { name: "Mike Davis", joined: "2023-10-12" }
            ]
        }
    ]
};

// Sample ideas data
const sampleIdeas = [
    {
        id: 1,
        title: "Campus Food Truck Festival",
        description: "Organize a weekly food truck festival featuring local vendors and diverse cuisines.",
        category: "cultural",
        author: "Foodie Club",
        upvotes: 45,
        createdAt: "2023-10-01",
        status: "pending"
    },
    {
        id: 2,
        title: "24-Hr Study Space During Finals",
        description: "Keep the library open 24 hours during finals week with free coffee and snacks.",
        category: "announcements",
        author: "Student Council",
        upvotes: 89,
        createdAt: "2023-10-05",
        status: "approved"
    }
];

// Sample resources data
const sampleResources = [
    {
        id: 1,
        title: "Calculus Textbook - 3rd Edition",
        type: "book",
        description: "Like new condition, used for one semester. Includes all practice problems.",
        owner: "math_whiz",
        contact: "math@campus.edu",
        available: true
    },
    {
        id: 2,
        title: "Python Programming Tutoring",
        type: "tutoring",
        description: "Experienced CS major offering Python tutoring for beginners. Flexible hours.",
        owner: "code_guru",
        contact: "coding@campus.edu",
        available: true
    }
];