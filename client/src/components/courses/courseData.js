export const courseCategories = [
  "All Categories",
  "Engineering",
  "Medical Sciences",
  "School Education",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Language Arts",
];

export const courseLevels = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

// Gradient styles for course cards
export const gradientStyles = [
  "from-black to-gray-800",
  "from-gray-900 to-black",
  "from-black to-gray-700",
  "from-gray-800 to-black",
  "from-black to-gray-900",
  "from-gray-700 to-black",
  "from-black to-gray-800",
  "from-gray-900 to-black",
  "from-black to-gray-700",
  "from-gray-800 to-black",
];

export const courses = [
  {
    id: "engineering-mathematics",
    title: "Engineering Mathematics",
    description:
      "Master the mathematical concepts essential for engineering applications.",
    longDescription:
      "Build a strong foundation in mathematics for engineering applications with this comprehensive course. You'll learn calculus, linear algebra, differential equations, statistics, and numerical methods, with a focus on practical applications in engineering fields. Through problem-solving exercises and computational tools, you'll develop the mathematical skills needed to tackle complex engineering challenges.",
    category: "Engineering",
    level: "Intermediate",
    price: "₹25,999",
    discountedPrice: "₹19,999",
    duration: "16 weeks",
    batchSize: "35 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.6,
    studentsEnrolled: 8300,
    image: "/coursebannerlogo.png",
    gradient: "from-black to-gray-800",
    featured: true,
    instructor: {
      name: "Dr. Rahul Sharma",
      image: "/instructor.png",
      bio: "Mathematics professor with 15+ years of experience teaching engineering students",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Calculus for Engineers",
        lessons: [
          "Limits and Continuity",
          "Differentiation and Applications",
          "Integration Techniques",
          "Multivariable Calculus",
        ],
      },
      {
        title: "Module 2: Linear Algebra",
        lessons: [
          "Matrices and Determinants",
          "Vector Spaces and Subspaces",
          "Eigenvalues and Eigenvectors",
          "Linear Transformations",
        ],
      },
      {
        title: "Module 3: Differential Equations",
        lessons: [
          "First-Order Differential Equations",
          "Second-Order Differential Equations",
          "Systems of Differential Equations",
          "Laplace Transforms",
        ],
      },
      {
        title: "Module 4: Probability and Statistics",
        lessons: [
          "Probability Distributions",
          "Statistical Inference",
          "Hypothesis Testing",
          "Regression Analysis",
        ],
      },
      {
        title: "Module 5: Numerical Methods",
        lessons: [
          "Numerical Integration",
          "Root-Finding Algorithms",
          "Numerical Solutions to ODEs",
          "Finite Difference Methods",
        ],
      },
    ],
    features: [
      "Interactive Math Visualizations",
      "MATLAB/Python Integration",
      "Engineering Application Examples",
      "Problem-Solving Workshops",
      "Formula Sheet Reference",
    ],
  },
  {
    id: "medical-anatomy",
    title: "Human Anatomy for Medical Students",
    description:
      "Comprehensive study of human anatomy with 3D visualizations and clinical correlations.",
    longDescription:
      "This detailed course covers the complete human anatomy with a focus on clinical applications. Using advanced 3D models, cadaveric images, and clinical case studies, you'll develop a thorough understanding of anatomical structures and their relationships. Perfect for medical students, the course emphasizes clinical correlations to help you apply anatomical knowledge to patient care scenarios.",
    category: "Medical Sciences",
    level: "Advanced",
    price: "₹44,999",
    discountedPrice: "₹34,999",
    duration: "24 weeks",
    batchSize: "30 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.9,
    studentsEnrolled: 6200,
    image: "/coursebannerlogo.png",
    gradient: "from-gray-900 to-black",
    featured: true,
    instructor: {
      name: "Dr. Priya Singh",
      image: "/instructor.png",
      bio: "Board-certified physician with 10+ years of clinical and teaching experience",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Introduction to Human Anatomy",
        lessons: [
          "Anatomical Terminology",
          "Body Organization",
          "Cells and Tissues",
          "Organ Systems Overview",
        ],
      },
      {
        title: "Module 2: Musculoskeletal System",
        lessons: [
          "Skeletal System",
          "Joints and Articulations",
          "Muscular System",
          "Clinical Applications",
        ],
      },
      {
        title: "Module 3: Cardiovascular and Respiratory Systems",
        lessons: [
          "Heart Anatomy",
          "Blood Vessels",
          "Respiratory Tract",
          "Clinical Correlations",
        ],
      },
      {
        title: "Module 4: Neuroanatomy",
        lessons: [
          "Central Nervous System",
          "Peripheral Nervous System",
          "Special Senses",
          "Clinical Neuroanatomy",
        ],
      },
      {
        title: "Module 5: Abdominal and Pelvic Anatomy",
        lessons: [
          "Digestive System",
          "Urinary System",
          "Reproductive System",
          "Clinical Case Studies",
        ],
      },
    ],
    features: [
      "3D Anatomical Models",
      "Virtual Dissection Lab",
      "Clinical Case Studies",
      "Medical Imaging Integration",
      "USMLE/NEET Question Bank",
    ],
  },
  {
    id: "physics-high-school",
    title: "High School Physics Mastery",
    description:
      "Build a strong foundation in physics concepts for high school students.",
    longDescription:
      "This course is designed to help high school students excel in physics. From mechanics to electricity and magnetism, you'll learn fundamental physics concepts through interactive simulations, problem-solving exercises, and real-world applications. The course aligns with AP Physics and IB Physics curricula, making it perfect for exam preparation while building a solid foundation for college-level physics.",
    category: "School Education",
    level: "Beginner",
    price: "₹18,999",
    discountedPrice: "₹12,999",
    duration: "12 weeks",
    batchSize: "40 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.7,
    studentsEnrolled: 9500,
    image: "/coursebannerlogo.png",
    gradient: "from-black to-gray-700",
    featured: false,
    instructor: {
      name: "Prof. Michael Chen",
      image: "/instructor.png",
      bio: "Physics educator with 12+ years of experience teaching high school and AP Physics",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Mechanics",
        lessons: [
          "Kinematics",
          "Newton's Laws of Motion",
          "Work, Energy, and Power",
          "Momentum and Collisions",
        ],
      },
      {
        title: "Module 2: Waves and Optics",
        lessons: [
          "Wave Properties",
          "Sound Waves",
          "Reflection and Refraction",
          "Lenses and Mirrors",
        ],
      },
      {
        title: "Module 3: Electricity and Magnetism",
        lessons: [
          "Electric Charges and Fields",
          "Electric Circuits",
          "Magnetic Fields",
          "Electromagnetic Induction",
        ],
      },
      {
        title: "Module 4: Thermodynamics",
        lessons: [
          "Temperature and Heat",
          "Laws of Thermodynamics",
          "Heat Transfer",
          "Thermal Properties of Matter",
        ],
      },
      {
        title: "Module 5: Modern Physics",
        lessons: [
          "Special Relativity",
          "Quantum Physics",
          "Atomic Structure",
          "Nuclear Physics",
        ],
      },
    ],
    features: [
      "Interactive Physics Simulations",
      "Problem-Solving Workshops",
      "AP/IB Exam Preparation",
      "Virtual Lab Experiments",
      "Weekly Live Q&A Sessions",
    ],
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry Fundamentals",
    description:
      "Master the principles of organic chemistry with practical applications.",
    longDescription:
      "This comprehensive organic chemistry course covers everything from basic concepts to advanced reaction mechanisms. Through interactive molecular modeling, virtual lab experiments, and problem-solving exercises, you'll develop a deep understanding of organic chemistry principles and their applications in medicine, materials science, and industry. The course is designed for college students and pre-med students preparing for MCAT.",
    category: "Chemistry",
    level: "Intermediate",
    price: "₹29,999",
    discountedPrice: "₹22,999",
    duration: "20 weeks",
    batchSize: "35 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 7200,
    image: "/coursebannerlogo.png",
    gradient: "from-gray-800 to-black",
    featured: false,
    instructor: {
      name: "Dr. Sarah Johnson",
      image: "/instructor.png",
      bio: "Organic chemistry professor with research experience in medicinal chemistry and drug design",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Structure and Bonding",
        lessons: [
          "Atomic Structure and Bonding",
          "Molecular Orbital Theory",
          "Hybridization",
          "Resonance Structures",
        ],
      },
      {
        title: "Module 2: Functional Groups",
        lessons: [
          "Alkanes and Cycloalkanes",
          "Alcohols and Ethers",
          "Aldehydes and Ketones",
          "Carboxylic Acids and Derivatives",
        ],
      },
      {
        title: "Module 3: Reaction Mechanisms",
        lessons: [
          "Nucleophilic Substitution",
          "Elimination Reactions",
          "Addition Reactions",
          "Radical Reactions",
        ],
      },
      {
        title: "Module 4: Spectroscopy",
        lessons: [
          "IR Spectroscopy",
          "NMR Spectroscopy",
          "Mass Spectrometry",
          "Structure Determination",
        ],
      },
      {
        title: "Module 5: Biomolecules",
        lessons: [
          "Carbohydrates",
          "Amino Acids and Proteins",
          "Lipids",
          "Nucleic Acids",
        ],
      },
    ],
    features: [
      "3D Molecular Modeling",
      "Virtual Organic Chemistry Lab",
      "MCAT Preparation Materials",
      "Reaction Mechanism Animations",
      "Problem-Solving Workshops",
    ],
  },
  {
    id: "computer-science-fundamentals",
    title: "Computer Science Fundamentals",
    description:
      "Build a strong foundation in computer science principles and programming.",
    longDescription:
      "This course provides a comprehensive introduction to computer science fundamentals, covering algorithms, data structures, programming concepts, and computational thinking. Through hands-on coding exercises in Python and Java, you'll develop problem-solving skills and learn how to design efficient solutions to computational problems. Perfect for high school students, college freshmen, or anyone looking to enter the field of computer science.",
    category: "Computer Science",
    level: "Beginner",
    price: "₹25,999",
    discountedPrice: "₹19,999",
    duration: "16 weeks",
    batchSize: "40 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.7,
    studentsEnrolled: 11200,
    image: "/coursebannerlogo.png",
    gradient: "from-black to-gray-900",
    featured: true,
    instructor: {
      name: "Prof. James Wilson",
      image: "/instructor.png",
      bio: "Computer Science professor with experience at leading tech companies and a passion for teaching",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Introduction to Programming",
        lessons: [
          "Programming Fundamentals",
          "Variables and Data Types",
          "Control Structures",
          "Functions and Methods",
        ],
      },
      {
        title: "Module 2: Data Structures",
        lessons: [
          "Arrays and Lists",
          "Stacks and Queues",
          "Trees and Graphs",
          "Hash Tables",
        ],
      },
      {
        title: "Module 3: Algorithms",
        lessons: [
          "Algorithm Analysis",
          "Searching Algorithms",
          "Sorting Algorithms",
          "Graph Algorithms",
        ],
      },
      {
        title: "Module 4: Object-Oriented Programming",
        lessons: [
          "Classes and Objects",
          "Inheritance and Polymorphism",
          "Encapsulation and Abstraction",
          "Design Patterns",
        ],
      },
      {
        title: "Module 5: Software Development",
        lessons: [
          "Version Control with Git",
          "Testing and Debugging",
          "Project Management",
          "Software Engineering Principles",
        ],
      },
    ],
    features: [
      "Hands-on Coding Exercises",
      "Interactive Programming Environment",
      "Real-world Project Portfolio",
      "Code Reviews and Feedback",
      "Industry-relevant Tools and Technologies",
    ],
  },
  {
    id: "advanced-calculus",
    title: "Advanced Calculus and Analysis",
    description:
      "Deepen your understanding of calculus with rigorous mathematical analysis.",
    longDescription:
      "This advanced course explores calculus from a theoretical perspective, focusing on mathematical rigor and proof techniques. You'll study limits, continuity, differentiation, integration, sequences, series, and multivariable calculus with a focus on developing mathematical maturity and problem-solving abilities. Perfect for mathematics majors and students preparing for graduate studies in mathematics, physics, or engineering.",
    category: "Mathematics",
    level: "Advanced",
    price: "₹32,999",
    discountedPrice: "₹24,999",
    duration: "15 weeks",
    batchSize: "30 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 4200,
    image: "/coursebannerlogo.png",
    gradient: "from-gray-700 to-black",
    featured: false,
    instructor: {
      name: "Dr. Elena Martinez",
      image: "/instructor.png",
      bio: "Mathematics professor specializing in analysis and differential equations",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Foundations of Analysis",
        lessons: [
          "Logic and Proof Techniques",
          "Set Theory",
          "The Real Number System",
          "Topology of the Real Line",
        ],
      },
      {
        title: "Module 2: Limits and Continuity",
        lessons: [
          "Epsilon-Delta Definitions",
          "Properties of Continuous Functions",
          "Uniform Continuity",
          "Intermediate Value Theorem",
        ],
      },
      {
        title: "Module 3: Differentiation",
        lessons: [
          "Formal Definition of the Derivative",
          "Mean Value Theorem",
          "Taylor's Theorem",
          "Applications in Optimization",
        ],
      },
      {
        title: "Module 4: Integration",
        lessons: [
          "Riemann Integral",
          "Fundamental Theorem of Calculus",
          "Improper Integrals",
          "Applications in Physics",
        ],
      },
      {
        title: "Module 5: Series and Multivariable Calculus",
        lessons: [
          "Sequences and Series",
          "Power Series",
          "Partial Derivatives",
          "Multiple Integrals",
        ],
      },
    ],
    features: [
      "Rigorous Proof Exercises",
      "Abstract Problem Solving",
      "Graduate School Preparation",
      "Mathematical Writing Workshop",
      "Advanced Mathematical Software",
    ],
  },
  {
    id: "molecular-biology",
    title: "Molecular Biology Techniques",
    description: "Master essential laboratory techniques in molecular biology.",
    longDescription:
      "This hands-on course focuses on practical laboratory techniques in molecular biology. From DNA extraction and PCR to gene cloning and CRISPR gene editing, you'll learn the fundamental methods used in modern molecular biology research. Through virtual lab simulations and detailed protocols, you'll develop the technical skills needed for research in genetics, biotechnology, and biomedical sciences.",
    category: "Biology",
    level: "Intermediate",
    price: "₹36,999",
    discountedPrice: "₹29,999",
    duration: "18 weeks",
    batchSize: "25 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.7,
    studentsEnrolled: 5800,
    image: "/coursebannerlogo.png",
    gradient: "from-black to-gray-800",
    featured: false,
    instructor: {
      name: "Dr. Robert Kim",
      image: "/instructor.png",
      bio: "Molecular biologist with research experience in genomics and biotechnology",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Nucleic Acid Techniques",
        lessons: [
          "DNA Extraction and Purification",
          "PCR and qPCR",
          "Gel Electrophoresis",
          "DNA Sequencing Methods",
        ],
      },
      {
        title: "Module 2: Genetic Engineering",
        lessons: [
          "Restriction Enzymes",
          "Cloning Vectors",
          "Transformation and Transfection",
          "CRISPR-Cas9 Gene Editing",
        ],
      },
      {
        title: "Module 3: Protein Techniques",
        lessons: [
          "Protein Extraction and Purification",
          "SDS-PAGE",
          "Western Blotting",
          "ELISA and Immunoassays",
        ],
      },
      {
        title: "Module 4: Cell Culture Techniques",
        lessons: [
          "Aseptic Technique",
          "Cell Line Maintenance",
          "Transfection Methods",
          "Cell-Based Assays",
        ],
      },
      {
        title: "Module 5: Genomics and Bioinformatics",
        lessons: [
          "Next-Generation Sequencing",
          "RNA-Seq Analysis",
          "Sequence Alignment",
          "Bioinformatics Tools",
        ],
      },
    ],
    features: [
      "Virtual Lab Simulations",
      "Protocol Development",
      "Troubleshooting Guides",
      "Research Paper Analysis",
      "Lab Notebook Workshop",
    ],
  },
  {
    id: "language-arts-mastery",
    title: "Language Arts Mastery",
    description:
      "Develop essential language skills in reading, writing, and critical analysis.",
    longDescription:
      "This comprehensive language arts course develops critical skills in reading comprehension, writing, grammar, and literary analysis. Through engaging with diverse texts, practicing various writing styles, and honing analytical skills, students will build a strong foundation in language arts. Perfect for middle and high school students seeking to excel in English language arts courses or preparing for standardized tests.",
    category: "Language Arts",
    level: "Intermediate",
    price: "₹22,999",
    discountedPrice: "₹17,999",
    duration: "14 weeks",
    batchSize: "35 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.6,
    studentsEnrolled: 8900,
    image: "/coursebannerlogo.png",
    gradient: "from-gray-900 to-black",
    featured: false,
    instructor: {
      name: "Prof. Emma Thompson",
      image: "/instructor.png",
      bio: "English literature professor with expertise in writing instruction and curriculum development",
      rating: 4.7,
    },
    curriculum: [
      {
        title: "Module 1: Reading Comprehension",
        lessons: [
          "Active Reading Strategies",
          "Identifying Main Ideas and Details",
          "Making Inferences",
          "Critical Reading of Diverse Texts",
        ],
      },
      {
        title: "Module 2: Writing Fundamentals",
        lessons: [
          "The Writing Process",
          "Essay Structure and Organization",
          "Grammar and Mechanics",
          "Revision and Editing",
        ],
      },
      {
        title: "Module 3: Literary Analysis",
        lessons: [
          "Elements of Literature",
          "Analyzing Fiction and Poetry",
          "Theme and Symbolism",
          "Critical Perspectives",
        ],
      },
      {
        title: "Module 4: Research and Argumentation",
        lessons: [
          "Research Methods",
          "Source Evaluation",
          "Argumentative Writing",
          "Citation and Documentation",
        ],
      },
      {
        title: "Module 5: Communication Skills",
        lessons: [
          "Effective Speaking",
          "Multimedia Presentations",
          "Digital Communication",
          "Collaborative Discussion",
        ],
      },
    ],
    features: [
      "Interactive Reading Activities",
      "Writing Workshops",
      "Personalized Feedback",
      "Grammar Diagnostics",
      "Test Preparation Materials",
    ],
  },
];
