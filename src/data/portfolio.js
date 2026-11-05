// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site. No component code needs to change.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Tripti Mittal',
  firstName: 'Tripti',
  roles: ['Full Stack Developer', 'MERN Stack Developer', 'Problem Solver', 'CSE Undergraduate'],
  tagline:
    'B.Tech CSE student at Geeta University building full-stack web apps with the MERN stack, and a problem solver with 600+ DSA problems solved on LeetCode.',
  about: [
    "I'm a Computer Science undergraduate at Geeta University (CGPA 8.93) who enjoys turning ideas into working, well-structured web applications.",
    'Most of my work is in the MERN stack: React on the front end, Node.js and Express on the back end, and MongoDB for data. I like building features end to end, from REST APIs and JWT authentication to real-time updates with Socket.IO.',
    'Outside of projects I practise Data Structures and Algorithms regularly and have solved 600+ problems on LeetCode. I’m currently looking for software engineering internship opportunities.',
  ],
  location: 'Panipat, India',
  email: 'triptimittal996@gmail.com',
  phone: '+91 7056935169',
  photo: '/profile.png',
  resume: '/Tripti_Mittal_Resume.pdf',
  socials: {
    github: 'https://github.com/Tripti129',
    linkedin: 'https://www.linkedin.com/in/-tripti-mittal',
    leetcode: 'https://leetcode.com/u/Tripti_2006Mittal/',
  },
  leetcodeUsername: 'Tripti_2006Mittal',
}

export const stats = [
  { value: '600+', label: 'LeetCode problems' },
  { value: '8.93', label: 'CGPA' },
  { value: '3', label: 'Internships' },
  { value: '1st', label: 'Rank in Semester 1' },
]

export const skills = [
  { title: 'Languages', items: ['C', 'C++', 'Java', 'Python', 'JavaScript'] },
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'React.js', 'Redux', 'Tailwind CSS', 'Bootstrap', 'jQuery'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Socket.IO'] },
  { title: 'Databases', items: ['MongoDB', 'MySQL'] },
  { title: 'Data Analysis', items: ['NumPy', 'Pandas'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VS Code'] },
  { title: 'Core CS', items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'] },
]

export const experience = [
  {
    role: 'Advanced Full Stack Development Intern',
    company: 'Geeta Technical Hub',
    period: 'Jun 2026 – Jul 2026',
    certificate: 'https://drive.google.com/drive/u/0/folders/1Ei55vRMs1XzdiJPSStq7EDSy2GNIgBgA',
    points: [
      'Worked on full-stack web development using JavaScript, React.js, Node.js, Express.js and MongoDB.',
      'Developed and integrated frontend and backend components using the MERN stack.',
      'Gained hands-on experience with RESTful APIs, database integration and modern development workflows.',
      'Learned and applied deployment concepts for full-stack applications.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    role: 'Advanced DSA Summer Intern',
    company: 'Geeta University × Coding Blocks',
    period: 'Summer 2025',
    certificate: 'https://drive.google.com/file/d/1hY2yXmmZbHJMpv-GJVUBWb9AGEktNd8v/view',
    points: [
      'Completed the Advanced Data Structures & Algorithms summer training run by Geeta University in collaboration with Coding Blocks.',
      'Worked through advanced DSA topics with structured, hands-on problem solving in C++.',
      'Strengthened the problem-solving foundation behind 600+ problems solved on LeetCode.',
    ],
    tags: ['C++', 'Advanced DSA', 'Problem Solving'],
  },
  {
    role: 'Programming Intern',
    company: 'Coding Blocks',
    period: 'Feb 2025 – Mar 2025',
    certificate: 'https://drive.google.com/file/d/1fTjmrKoiMrD2wmnO7vcbd_FQ4hUTWdi4/view?usp=sharing',
    points: [
      'Strengthened programming fundamentals and problem-solving with a focus on Data Structures and Algorithms.',
      'Solved 500+ coding problems covering arrays, strings, recursion and core DSA concepts.',
    ],
    tags: ['C++', 'DSA', 'Problem Solving'],
  },
]

export const projects = [
  {
    title: 'PlacementConnect',
    subtitle: 'College placement management platform',
    description:
      'A team-built platform connecting students and recruiters for campus recruitment. I developed the Admin Dashboard for centralised monitoring and analysis of placement data, and integrated ATS features for candidate management and recruitment workflows.',
    highlights: ['Admin Dashboard & analytics', 'Real-time updates with Socket.IO', 'ATS-based candidate management'],
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'Socket.IO'],
    github: 'https://github.com/VivekCoderz/Placement-Connectt',
    live: '',
    image: '',
    team: true,
  },
  {
    title: 'Mini Jira',
    subtitle: 'Task & project management app',
    description:
      'A full-stack task and project management application inspired by Jira. Users can create, update, delete and track tasks, with secure JWT-based authentication and authorization and a RESTful API backend.',
    highlights: ['Full CRUD for tasks & projects', 'JWT authentication & authorization', 'RESTful API design'],
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT'],
    github: 'https://github.com/Tripti129/Mini-Jira',
    live: 'https://mini-jira-xi.vercel.app',
    image: '',
    team: false,
  },
  {
    title: 'EduNerve AI',
    subtitle: 'Placement preparation website · Hackathon project',
    description:
      'A browser-based placement prep website built for a hackathon. It has a Gemini-powered DSA tutor chatbot, topic quizzes with Chart.js performance reports, timed MCQ practice, a webcam mock interview with face detection and voice answers, and a resume analyzer.',
    highlights: ['Gemini-powered DSA chatbot (AlgoBot)', 'Quizzes with Chart.js performance reports', 'Webcam mock interview with face-api.js & speech'],
    tech: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'face-api.js', 'Gemini API'],
    github: 'https://github.com/Tripti129/Website-for-preparation-of-placement',
    live: '',
    image: '',
    team: false,
  },
]

// Smaller projects shown as compact cards under "More projects"
export const otherProjects = [
  {
    title: 'Movie Watchlist Manager',
    description: 'Add, search, delete and filter movies by watched / unwatched, with data persisted in LocalStorage.',
    tech: ['HTML', 'jQuery', 'LocalStorage'],
    github: 'https://github.com/Tripti129/movie_watchlist_manager',
    live: 'https://movie-watchlist-manager-five.vercel.app',
  },
  {
    title: 'Weather App',
    description: 'Search for a city and check its current weather conditions.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Tripti129/Whether-Application-',
    live: '',
  },
  {
    title: 'Landing Page',
    description: 'A responsive marketing landing page built with semantic HTML and modern CSS.',
    tech: ['HTML', 'CSS'],
    github: 'https://github.com/Tripti129/landing_page',
    live: 'https://landing-page-rho-pearl-95.vercel.app',
  },
  {
    title: 'Todo List',
    description: 'A task manager to add, complete and delete daily to-dos.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Tripti129/Todo-List',
    live: '',
  },
]

export const education = [
  {
    school: 'Geeta University',
    degree: 'B.Tech in Computer Science & Engineering',
    period: '2024 – 2028',
    score: 'CGPA: 8.93 / 10',
    place: 'Panipat',
  },
  { school: 'SGMS', degree: 'Class XII', period: '2023 – 2024', score: '81.2%', place: 'New Delhi' },
  { school: 'GGS Public School', degree: 'Class X', period: '2021 – 2022', score: '96.8%', place: 'Panipat' },
]

// Hackathon journey, shown as a timeline track (oldest first).
// type:   'Internal' | 'National' | 'Organizer'
// result: short badge text; podium: true highlights a win
export const hackathons = [
  {
    name: 'HackForge 1.0',
    edition: "HackForge'25",
    date: 'May 2025',
    type: 'Internal',
    result: 'Participant',
    organizer: 'Geeta Technical Hub & Dept. of CSE, Geeta University',
    description:
      'My first hackathon: a two-day build sprint (1–2 May 2025) where I learned to scope an idea, split work across a team and ship a working demo under time pressure.',
    image: '/certificates/hackforge-1.jpg',
    link: 'https://drive.google.com/file/d/13stm_dcpFGwxkfutjdDX7LgjUpS1v3ld/view',
  },
  {
    name: 'Internal Smart India Hackathon',
    edition: 'SIH 2025 · Internal round',
    date: 'Sep 2025',
    type: 'Internal',
    result: '2nd Position',
    podium: true,
    team: 'Team Visioneers',
    organizer: 'Geeta University · IIC & MoE Innovation Cell',
    description:
      'Secured 2nd position with Team Visioneers in the university-level round of Smart India Hackathon 2025, held on 24 September 2025.',
    image: '/certificates/sih-2nd-position.jpeg',
    link: 'https://drive.google.com/file/d/1JzBudQBT58V3h8axAh5gfey2BZPdxVAM/view',
  },
  {
    name: 'NexHack',
    edition: 'National Level Hackathon',
    date: 'Nov 2025',
    type: 'National',
    result: 'Participant',
    organizer: 'Geeta Technical Hub & School of CSE',
    description:
      'Competed in "Hack the Next Dimension", a national-level hackathon (3–4 November 2025), building alongside teams from outside the university.',
    image: '/certificates/nexhack.jpg',
    link: '/certificates/nexhack.jpg',
  },
  {
    name: 'HackForge 2.0',
    edition: 'Internal Hackathon',
    date: 'Apr 2026',
    type: 'Internal',
    result: 'Participant',
    organizer: 'Geeta Technical Hub, Geeta University',
    description:
      'Came back for the second edition of HackForge (14–15 April 2026), bringing a year of hackathon experience into a faster, more polished build.',
    image: '',
    link: '',
  },
  {
    name: 'NexHack 2.0',
    edition: 'National Level Hackathon',
    date: '',
    type: 'Organizer',
    result: 'Core Committee Member',
    organizer: 'Geeta Technical Hub',
    description:
      'Moved from participant to organizer: part of the core committee that planned and ran the second edition of NexHack.',
    image: '',
    link: '',
  },
]

// image: local thumbnail in /public/certificates (optional)
// link:  where "View certificate" opens
export const achievements = [
  {
    title: 'First Position: B.Tech Semester 1',
    issuer: 'Geeta University · Certificate of Merit',
    date: 'Dec 2024 – Jan 2025',
    image: '/certificates/first-position.jpeg',
    link: 'https://drive.google.com/file/d/1P6U8YZGfnyiK95awydgj1sxJ8JCL9KXT/view',
    featured: true,
  },
  {
    title: 'AWS Solutions Architecture Job Simulation',
    issuer: 'Amazon Web Services × Forage',
    date: 'Jan 2026',
    image: '/certificates/aws-solutions-architecture.jpeg',
    link: 'https://drive.google.com/file/d/1Mrd8K8kh-WYgzcRMdbeZxSbs115g8GTg/view?usp=drive_link',
  },
  {
    title: 'Certificate of Excellence: DSA using C++',
    issuer: 'Geeta University × Coding Blocks',
    date: '',
    image: '/certificates/dsa-cpp-excellence.png',
    link: '/certificates/dsa-cpp-excellence.pdf',
  },
  {
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Mar 2026',
    image: '/certificates/cisco-networking-basics.png',
    link: '/certificates/cisco-networking-basics.pdf',
  },
  {
    title: 'NPTEL Elite: Philosophy & Critical Thinking (82%)',
    issuer: 'NPTEL · IIT (ISM) Dhanbad · 12-week course',
    date: 'Jan – Apr 2026',
    image: '/certificates/nptel.png',
    link: '/certificates/nptel.pdf',
  },
  {
    title: 'SQL (Basic) Skill Certification',
    issuer: 'HackerRank',
    date: 'Mar 2026',
    image: '/certificates/hackerrank-sql.png',
    link: '/certificates/hackerrank-sql.pdf',
  },
]
