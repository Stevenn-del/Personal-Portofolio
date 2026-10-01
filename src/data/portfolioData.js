// Data Portofolio Steven Wang - Student & Aspiring UI/UX Designer
// File ini memisahkan seluruh data konten dari komponen presentasi dan layout.
// Hal ini memudahkan penambahan project, sertifikat, atau informasi baru di masa mendatang.

// Informasi profil pribadi Steven Wang
export const personalInfo = {
  name: "Steven Wang",
  firstName: "STEVEN",
  lastName: "WANG",
  roleTitle: "STUDENT · ASPIRING UI/UX DESIGNER",
  shortIdentity: "student /\naspiring UI/UX designer.",
  portfolioLabel: "PORTFOLIO",
  heroLead: "PORTFOLIO\nstudent /\naspiring UI/UX designer.",
  aboutLead: "I love Design, Technology,\nand Story.",
  // Tiga paragraf ringkas biografi About Me sesuai instruksi master rehaul
  bioParagraphs: [
    "I am a student and aspiring UI/UX designer interested in creating digital experiences through design and technology.",
    "I am exploring UI/UX design, web development, visual design, and digital products through school projects, personal projects, competitions, and experimentation.",
    "I enjoy turning ideas into interfaces that are simple, useful, and engaging."
  ],
  location: "Indonesia",
  // Akun sosial resmi Steven Wang (hanya akun asli, tanpa akun palsu)
  contact: {
    email: "stevennwang08@gmail.com",
    instagram: "https://instagram.com/stevnn_wang",
    instagramHandle: "@stevnn_wang",
    github: "https://github.com/Stevenn-del",
    githubHandle: "Stevenn-del"
  }
};

// Bagian 02 PASSION - Tiga pilar ketertarikan editorial (Design, Technology, Story)
export const personalityInterests = [
  {
    number: "01",
    category: "DESIGN",
    description: "Creating clear, intuitive, and visually engaging interfaces."
  },
  {
    number: "02",
    category: "TECHNOLOGY",
    description: "Exploring front-end development and digital technologies."
  },
  {
    number: "03",
    category: "STORY",
    description: "Turning ideas and concepts into meaningful digital experiences."
  }
];

// Bagian 03 SKILL SET - Daftar kemampuan teknis dengan persentase terukur
// Ditampilkan dalam tata letak 2 kolom di desktop dengan animasi penghitung angka
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

// Daftar Project / Karya Terpilih
// Setiap project memiliki informasi lengkap untuk kartu daftar dan halaman studi kasus detail
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
    // Deskripsi singkat project sesuai panduan master
    shortDescription: "A regional-language learning interface designed to make learning local Indonesian languages more interactive, simple, and engaging for young users.",
    image: "/images/project-nusa-bot.jpg",
    overview: "A regional-language learning interface designed to help young users explore Indonesian regional languages through a simple, interactive, and enjoyable experience.",
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
      "Quizzes",
      "Progress tracking"
    ],
    resultTitle: "FINAL RESULT",
    resultText: "A digital learning concept that introduces regional languages through a simple and interactive user experience.",
    reflectionTitle: "REFLECTION",
    reflectionText: "This project helped me explore how interface design can make cultural and educational material more approachable and interactive for young learners."
  },
  {
    id: "arvion",
    slug: "arvion",
    number: "02",
    featured: false,
    name: "ARVION",
    subtitle: "Interface Exploration & Layout Architecture",
    category: "UI/UX DESIGN",
    year: "2026",
    role: "UI/UX DESIGNER",
    shortDescription: "An interface exploration focusing on clean layout architecture, accessibility, and intuitive digital workflows.",
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
    id: "iitc-competition",
    slug: "iitc-competition",
    number: "03",
    featured: false,
    name: "IITC UI/UX COMPETITION",
    subtitle: "Digital Solution Concept & Rapid Prototyping",
    category: "UI/UX DESIGN",
    year: "2026",
    role: "UI/UX DESIGNER",
    shortDescription: "A competition-focused digital product concept designed to address specific user needs through rapid prototyping and user research.",
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
    id: "web-exploration",
    slug: "web-exploration",
    number: "04",
    featured: false,
    name: "HERITAGE EXPLORATION",
    subtitle: "Responsive Web Development & Semantic Structure",
    category: "WEB DEVELOPMENT",
    year: "2026",
    role: "STUDENT DESIGNER",
    shortDescription: "A learning exploration in front-end development focusing on responsive layout scaling, semantic HTML, and clean styling.",
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

// Data Sertifikat & Pembelajaran
// Mendokumentasikan sertifikat kursus dan validasi kemampuan nyata
export const certificates = [
  {
    id: "cert-01",
    number: "01",
    title: "UI/UX DESIGN FUNDAMENTALS",
    issuer: "ONLINE COURSEWORK",
    year: "2026",
    category: "UI/UX DESIGN",
    description: "Completed coursework covering user interface design principles, user journey mapping, low-fidelity wireframing, and interactive prototyping in Figma.",
    image: "/images/project-portfolio.jpg"
  },
  {
    id: "cert-02",
    number: "02",
    title: "RESPONSIVE WEB DESIGN",
    issuer: "COURSEWORK & VALIDATION",
    year: "2026",
    category: "WEB DEVELOPMENT",
    description: "Coursework and hands-on exercises in responsive web design, semantic HTML structure, CSS layout architectures, and interactive DOM scripting.",
    image: "/images/project-heritage.jpg"
  },
  {
    id: "cert-03",
    number: "03",
    title: "FRONT-END DEVELOPMENT",
    issuer: "PRACTICAL TRAINING",
    year: "2026",
    category: "FRONT-END DEVELOPMENT",
    description: "Practical training exploring modern JavaScript ES6+, component lifecycle fundamentals, and building responsive client-side web experiences.",
    image: "/images/project-arvion.jpg"
  }
];

// Data Kompetisi & Aktivitas Nyata
export const activities = [
  {
    id: "act-01",
    number: "01",
    title: "IITC UI/UX COMPETITION",
    role: "PARTICIPANT",
    category: "UI/UX DESIGN",
    year: "2026",
    description: "Participated in the IITC UI/UX Competition, exploring user problems, wireframing interfaces, and designing interactive digital product prototypes under competition guidelines."
  }
];

// Bidang Pembelajaran Aktif (Currently Learning)
export const currentlyLearning = [
  "UI/UX DESIGN",
  "FRONT-END DEVELOPMENT",
  "WEB DEVELOPMENT",
  "REACT",
  "JAVASCRIPT",
  "FIGMA"
];
