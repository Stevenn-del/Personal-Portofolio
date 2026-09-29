// Portfolio Data for Steven Wang - Student & Aspiring UI/UX Designer
// Follows Master Content & Editorial Structure for Steven Wang Portfolio

export const personalInfo = {
  name: "Steven Wang",
  firstName: "STEVEN",
  lastName: "WANG",
  roleTitle: "STUDENT · ASPIRING UI/UX DESIGNER",
  shortIdentity: "student /\naspiring UI/UX designer.",
  portfolioLabel: "PORTFOLIO",
  heroLead: "PORTFOLIO\nstudent /\naspiring UI/UX designer.",
  aboutLead: "I am a student and aspiring UI/UX designer interested in design, technology, and digital experiences.",
  bioParagraphs: [
    "I am a student and aspiring UI/UX designer who is interested in creating digital experiences through design and technology.",
    "I enjoy exploring UI/UX design, web development, visual design, and digital products. I am currently developing my skills through school projects, personal projects, competitions, and continuous experimentation.",
    "I enjoy turning ideas into interfaces that are simple, useful, and visually engaging."
  ],
  location: "Indonesia",
  contact: {
    email: "stevennwang08@gmail.com",
    instagram: "https://instagram.com/stevnn_wang",
    github: "https://github.com/Stevenn-del"
  }
};

// 02 PASSION - Three open editorial columns
export const personalityInterests = [
  {
    number: "01",
    category: "DESIGN",
    description: "I enjoy creating interfaces that are simple, clear, and visually engaging. I am interested in how design can make digital products easier and more enjoyable to use."
  },
  {
    number: "02",
    category: "TECHNOLOGY",
    description: "I enjoy learning how technology works behind digital products and exploring web technologies to turn interface ideas into functional experiences."
  },
  {
    number: "03",
    category: "STORY",
    description: "I enjoy visual storytelling and believe that good digital experiences should communicate ideas clearly and create meaningful experiences for users."
  }
];

// 03 SKILL SET - Exact percentages specified by user
// HTML 85%, CSS 70%, JavaScript 50% | React 30%, MySQL 50%, Figma 80%
export const skillSetColumns = {
  column1: [
    { name: "HTML", level: "Currently Learning", percentage: 85, icon: "html" },
    { name: "CSS", level: "Currently Learning", percentage: 70, icon: "css" },
    { name: "JavaScript", level: "Currently Learning", percentage: 50, icon: "js" },
  ],
  column2: [
    { name: "React", level: "Currently Learning", percentage: 30, icon: "react" },
    { name: "MySQL", level: "Currently Learning", percentage: 50, icon: "mysql" },
    { name: "Figma", level: "Currently Learning", percentage: 80, icon: "figma" },
  ]
};

// MULTIPLE PROJECTS Collection
export const projects = [
  {
    id: "nusa-bot",
    slug: "nusa-bot",
    number: "01",
    featured: true,
    name: "NUSA BOT",
    subtitle: "Regional Language Learning Platform",
    category: "UI/UX DESIGN",
    year: "2026",
    role: "UI/UX DESIGNER",
    shortDescription: "A regional-language learning interface designed to help young users learn Indonesian local languages through a simple, interactive, and enjoyable digital experience.",
    image: "/images/project-nusa-bot.jpg",
    overview: "Nusa Bot is a regional-language learning interface designed to help young users learn Indonesian local languages through a simple, interactive, and enjoyable digital experience.",
    conceptTitle: "CONCEPT",
    conceptText: "The concept focuses on making regional language learning easier and more enjoyable through interactive learning content, conversation practice, quizzes, and cultural exploration.",
    devTitle: "DESIGN PROCESS",
    devProcessSteps: [
      { phase: "Research", detail: "Exploring regional language preservation and interactive learning patterns for younger audiences." },
      { phase: "User Flow", detail: "Structuring intuitive paths for language discovery, phrase practice, and quiz interaction." },
      { phase: "Wireframing", detail: "Creating low-fidelity screen layouts prioritizing clarity, readability, and accessible navigation." },
      { phase: "Interface Design", detail: "Crafting clean visual components, friendly illustrations, and distinct typography." },
      { phase: "Interactive Prototype", detail: "Testing interactive learning flows, progress tracking, and conversational exercises." }
    ],
    keyFeaturesTitle: "KEY FEATURES",
    keyFeatures: [
      "Regional language selection",
      "Phrase learning",
      "Conversation practice",
      "Translation",
      "Learning activities",
      "Quiz",
      "Progress tracking"
    ],
    resultTitle: "FINAL RESULT",
    resultText: "A digital learning concept that introduces regional languages through a simple and interactive user experience.",
    reflectionTitle: "REFLECTION",
    reflectionText: "This project helped me explore how interface design can make cultural and educational material more approachable and interactive for young learners."
  },
  {
    id: "project-02",
    slug: "project-02",
    number: "02",
    featured: false,
    name: "[PROJECT NAME]",
    subtitle: "[PROJECT CATEGORY]",
    category: "[PROJECT CATEGORY]",
    year: "2026",
    role: "UI/UX DESIGNER",
    shortDescription: "Created as part of a design exploration and interface development project.",
    image: "/images/project-arvion.jpg",
    overview: "Created as part of a design exploration and interface development project, focusing on turning user requirements into clean, structured digital layouts.",
    conceptTitle: "CONCEPT",
    conceptText: "Focused on turning user requirements into clean, structured digital layouts that prioritize clarity, ease of navigation, and usability.",
    devTitle: "DESIGN PROCESS",
    devProcessSteps: [
      { phase: "Research", detail: "Gathered project goals and user requirements." },
      { phase: "Information Structure", detail: "Structured core sections and content hierarchy." },
      { phase: "Wireframing", detail: "Outlined essential layout blocks and user flows." },
      { phase: "UI Design", detail: "Crafted clean visual design and responsive components." },
      { phase: "Prototype", detail: "Validated navigation flows through interactive prototyping." }
    ],
    keyFeaturesTitle: "KEY FEATURES",
    keyFeatures: [
      "Information architecture",
      "Component design",
      "Responsive layout",
      "Interactive prototype"
    ],
    resultTitle: "FINAL RESULT",
    resultText: "A functional interface prototype demonstrating structured user flows and consistent visual components.",
    reflectionTitle: "REFLECTION",
    reflectionText: "Allowed me to practice creating a digital product from an initial idea into a structured interface."
  },
  {
    id: "project-03",
    slug: "project-03",
    number: "03",
    featured: false,
    name: "[PROJECT NAME]",
    subtitle: "[PROJECT CATEGORY]",
    category: "[PROJECT CATEGORY]",
    year: "2026",
    role: "UI/UX DESIGNER",
    shortDescription: "Participated in a UI/UX design competition and developed a digital product concept.",
    image: "/images/project-portfolio.jpg",
    overview: "Participated in a UI/UX design competition and developed a digital product concept addressing specific user needs.",
    conceptTitle: "CONCEPT",
    conceptText: "Addressing specific user challenges through human-centered design principles and interactive prototypes.",
    devTitle: "DESIGN PROCESS",
    devProcessSteps: [
      { phase: "Brief Analysis", detail: "Explored competition problem space and target user needs." },
      { phase: "Information Structure", detail: "Defined core features and logical navigation." },
      { phase: "Wireframing", detail: "Rapidly sketched and iterated screen alternatives." },
      { phase: "UI Design", detail: "Applied design system tokens, typography, and contrast." },
      { phase: "Final Deliverables", detail: "Produced polished showcase deliverables." }
    ],
    keyFeaturesTitle: "KEY FEATURES",
    keyFeatures: [
      "User research",
      "Rapid wireframing",
      "Design system",
      "Interactive screens"
    ],
    resultTitle: "FINAL RESULT",
    resultText: "An interactive prototype and presentation deck demonstrating the digital solution concept.",
    reflectionTitle: "REFLECTION",
    reflectionText: "Strengthened my ability to solve problems under competition guidelines and refine UI solutions iteratively."
  },
  {
    id: "project-04",
    slug: "project-04",
    number: "04",
    featured: false,
    name: "[PROJECT NAME]",
    subtitle: "[PROJECT CATEGORY]",
    category: "[PROJECT CATEGORY]",
    year: "2026",
    role: "STUDENT DESIGNER",
    shortDescription: "Developed as part of my learning exploration in front-end and interface design.",
    image: "/images/project-heritage.jpg",
    overview: "Developed as part of my learning exploration in front-end development and interactive interface design.",
    conceptTitle: "CONCEPT",
    conceptText: "Exploring the fundamentals of front-end development and building interfaces that adapt across device viewports.",
    devTitle: "DESIGN PROCESS",
    devProcessSteps: [
      { phase: "Concept", detail: "Defined project requirements and learning goals." },
      { phase: "Structure", detail: "Built semantic HTML architecture." },
      { phase: "UI Design", detail: "Styled with clean CSS layout rules." },
      { phase: "Implementation", detail: "Added interactive logic and verified responsiveness." },
      { phase: "Testing", detail: "Audited across desktop and mobile screens." }
    ],
    keyFeaturesTitle: "KEY FEATURES",
    keyFeatures: [
      "Semantic HTML",
      "CSS Grid & Flexbox",
      "Responsive scaling",
      "Interactive UI"
    ],
    resultTitle: "FINAL RESULT",
    resultText: "A fully responsive web interface validating front-end principles and accessible structure.",
    reflectionTitle: "REFLECTION",
    reflectionText: "Deepened my understanding of the relationship between visual interface design and clean front-end code."
  }
];

// CERTIFICATES & LEARNING Data
export const certificates = [
  {
    id: "cert-01",
    number: "01",
    title: "[CERTIFICATE TITLE]",
    issuer: "[ISSUER / ORGANIZATION]",
    year: "2026",
    category: "UI/UX DESIGN",
    description: "Completed coursework covering user interface design principles, user journey mapping, low-fidelity wireframing, and interactive prototyping in Figma.",
    image: "/images/project-portfolio.jpg"
  },
  {
    id: "cert-02",
    number: "02",
    title: "[CERTIFICATE TITLE]",
    issuer: "[ISSUER / ORGANIZATION]",
    year: "2026",
    category: "WEB DEVELOPMENT",
    description: "Coursework and hands-on exercises in responsive web design, semantic HTML structure, CSS layout architectures, and interactive DOM scripting.",
    image: "/images/project-heritage.jpg"
  },
  {
    id: "cert-03",
    number: "03",
    title: "[CERTIFICATE TITLE]",
    issuer: "[ISSUER / ORGANIZATION]",
    year: "2026",
    category: "FRONT-END DEVELOPMENT",
    description: "Practical training exploring modern JavaScript ES6+, component lifecycle fundamentals, and building responsive client-side web experiences.",
    image: "/images/project-arvion.jpg"
  }
];

// CURRENTLY LEARNING
export const currentlyLearning = [
  "UI/UX DESIGN",
  "FRONT-END DEVELOPMENT",
  "WEB DEVELOPMENT",
  "REACT",
  "JAVASCRIPT",
  "FIGMA"
];

// Backwards-compatibility mappings
export const experienceData = {
  homepageSummary: "CERTIFICATES & LEARNING",
  certificates: certificates,
  currentlyLearning: currentlyLearning
};

export const skillsData = {
  column1: skillSetColumns.column1,
  column2: skillSetColumns.column2
};

export const aboutMeData = {
  values: personalityInterests.map((p) => ({
    number: p.number,
    title: p.category,
    description: p.description
  }))
};
