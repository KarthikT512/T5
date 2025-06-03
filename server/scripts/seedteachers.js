require("dotenv").config();
const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");

const teachersData = [
  {
    id: 1,
    name: "Dr. Akash Pandey",
    subject: "Physics",
    image:
      "https://ui-avatars.com/api/?name=Akash+Pandey&background=000000&color=ffffff&size=256&bold=true&format=svg",
    description: "Expert in Quantum Mechanics & Relativity",
    shortBio: "Ph.D from IIT Delhi with research papers in quantum computing",
    expertise: [
      "Quantum Physics",
      "Astrophysics",
      "Particle Physics",
      "Advanced Mechanics",
    ],
    experience: "12+ years",
    education: "Ph.D in Physics, IIT Delhi",
    accolades: [
      "Best Physics Teacher Award 2022",
      "5 Research Papers Published",
    ],
    schedule: "Mon, Wed, Fri: 2:00 PM - 5:00 PM",
    rating: 4.9,
    students: 1250,
    courses: 8,
    completionRate: "94%",
    averageResponseTime: "2 hours",
    level: "Expert",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      website: "#",
    },
    userId: "60b8d295f1d4f1b4e4c5e9b1", // Example userId
  },
  {
    id: 2,
    name: "Prof. Vishal Kumar",
    subject: "Mathematics",
    image:
      "https://ui-avatars.com/api/?name=Vishal+Kumar&background=111111&color=ffffff&size=256&bold=true&format=svg",
    description: "Makes complex calculus intuitive and accessible",
    shortBio:
      "Former Principal Mathematician at National Mathematics Institute",
    expertise: ["Calculus", "Linear Algebra", "Number Theory", "Statistics"],
    experience: "15+ years",
    education: "M.Sc Mathematics, Stanford University",
    accolades: [
      "Author of 'Mathematics Simplified' textbook",
      "National Teaching Excellence Award",
    ],
    schedule: "Tue, Thu: 10:00 AM - 4:00 PM",
    rating: 4.8,
    students: 980,
    courses: 6,
    completionRate: "92%",
    averageResponseTime: "3 hours",
    level: "Expert",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      website: "#",
    },
    userId: "60b8d295f1d4f1b4e4c5e9b2",
  },
  {
    id: 3,
    name: "Dr. Rahul Sharma",
    subject: "Computer Science",
    image:
      "https://ui-avatars.com/api/?name=Rahul+Sharma&background=222222&color=ffffff&size=256&bold=true&format=svg",
    description: "Expert in AI and machine learning technologies",
    shortBio: "Ex-Google engineer with expertise in building AI systems",
    expertise: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Structures",
      "Python & JavaScript",
    ],
    experience: "8+ years",
    education: "Ph.D in Computer Science, MIT",
    accolades: ["Top Contributor on GitHub", "AI Innovation Award 2021"],
    schedule: "Weekdays: 6:00 PM - 9:00 PM",
    rating: 4.7,
    students: 1430,
    courses: 10,
    completionRate: "88%",
    averageResponseTime: "1 hour",
    level: "Advanced",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      github: "#",
    },
    userId: "60b8d295f1d4f1b4e4c5e9b3",
  },
  {
    id: 4,
    name: "Dr. Priya Singh",
    subject: "Chemistry",
    image:
      "https://ui-avatars.com/api/?name=Priya+Singh&background=333333&color=ffffff&size=256&bold=true&format=svg",
    description: "Specialized in Organic Chemistry and Biochemistry",
    shortBio:
      "Research scientist with 5 patents in pharmaceutical applications",
    expertise: [
      "Organic Chemistry",
      "Biochemistry",
      "Medicinal Chemistry",
      "Chemical Analysis",
    ],
    experience: "10+ years",
    education: "Ph.D in Chemistry, Cambridge University",
    accolades: [
      "Young Scientist Award",
      "3 Patents in Pharmaceutical Applications",
    ],
    schedule: "Mon, Wed: 1:00 PM - 5:00 PM, Sat: 10:00 AM - 1:00 PM",
    rating: 4.9,
    students: 1120,
    courses: 7,
    completionRate: "95%",
    averageResponseTime: "4 hours",
    level: "Advanced",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      researchGate: "#",
    },
    userId: "60b8d295f1d4f1b4e4c5e9b4",
  },
  {
    id: 5,
    name: "Prof. Meera Kapoor",
    subject: "Mathematics",
    image:
      "https://ui-avatars.com/api/?name=Meera+Kapoor&background=000000&color=ffffff&size=256&bold=true&format=svg",
    description: "Specializes in algebra and number theory",
    shortBio: "M.Sc from DU, passionate about problem-solving",
    expertise: ["Algebra", "Calculus", "Linear Algebra", "Number Theory"],
    experience: "7 years",
    education: "M.Sc Mathematics, Delhi University",
    accolades: ["Mathematics Olympiad Mentor", "Research in Number Theory"],
    schedule: "Mon, Wed, Fri: 10:00 AM - 2:00 PM",
    rating: 4.7,
    students: 750,
    courses: 5,
    completionRate: "90%",
    averageResponseTime: "5 hours",
    level: "Intermediate",
    social: {
      twitter: "#",
      linkedin: "#",
      website: "#",
    },
    userId: "60b8d295f1d4f1b4e4c5e9b5",
  },
  {
    id: 6,
    name: "Dr. Ravi Singh",
    subject: "Chemistry",
    image:
      "https://ui-avatars.com/api/?name=Ravi+Singh&background=000000&color=ffffff&size=256&bold=true&format=svg",
    description: "Enthusiastic about making chemistry accessible",
    shortBio: "Ph.D from IIT Bombay, expert in organic chemistry",
    expertise: [
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Physical Chemistry",
      "Biochemistry",
    ],
    experience: "5 years",
    education: "Ph.D in Chemistry, IIT Bombay",
    accolades: ["Young Researcher Award", "Published in Chemical Review"],
    schedule: "Tue, Thu, Sat: 9:00 AM - 12:00 PM",
    rating: 4.5,
    students: 620,
    courses: 4,
    completionRate: "87%",
    averageResponseTime: "6 hours",
    level: "Beginner",
    social: {
      linkedin: "#",
      youtube: "#",
      website: "#",
    },
    userId: "60b8d295f1d4f1b4e4c5e9b6",
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
    await Teacher.deleteMany({});
    await Teacher.insertMany(teachersData);
    console.log(`✅ Seeded ${teachersData.length} teachers`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
})();
