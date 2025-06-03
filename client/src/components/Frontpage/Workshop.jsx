import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import Header from "./Header"; // Adjust path based on your project structure
import Footer from "./Footer"; // Adjust path based on your project structure

const Workshop = ({ setCursorVariant }) => {
  // ====== WORKSHOP DATA ======
  const workshops = [
    {
      id: 1,
      title: "Advanced React Patterns Workshop",
      description:
        "Dive deep into advanced React patterns including hooks, context, and state management techniques for scalable applications.",
      date: "April 11, 2025",
      time: "10:00 AM - 4:00 PM EST",
      location: "Virtual",
      capacity: 25,
      image:
        "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
    },
    {
      id: 2,
      title: "Full-Stack JavaScript Bootcamp",
      description:
        "Build complete web applications from frontend to backend using modern JavaScript frameworks and tools.",
      date: "April 12, 2025",
      time: "9:00 AM - 5:00 PM EST",
      location: "Virtual",
      capacity: 20,
      image:
        "https://cdn.pixabay.com/photo/2016/11/19/22/52/coding-1841550_1280.jpg",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description:
        "Learn essential design principles, user research methods, and prototyping techniques to create intuitive interfaces.",
      date: "April 13, 2025",
      time: "11:00 AM - 3:00 PM EST",
      location: "Virtual",
      capacity: 30,
      image:
        "https://cdn.pixabay.com/photo/2017/01/29/13/21/mobile-devices-2017980_1280.png",
    },
  ];

  // ====== MAIN CONTAINER ANIMATIONS ======
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // ====== TESTIMONIALS DATA ======
  const testimonials = [
    {
      quote:
        "The hands-on approach in the workshop allowed me to immediately apply what I learned to my current projects.",
      author: "Emily Johnson",
      role: "Frontend Developer",
    },
    {
      quote:
        "I've taken many online courses, but this workshop's interactive format and real-time feedback were incredibly valuable.",
      author: "David Chen",
      role: "Product Designer",
    },
    {
      quote:
        "The small group setting created a collaborative environment where I felt comfortable asking questions and learning from peers.",
      author: "Michael Rodriguez",
      role: "Full-Stack Developer",
    },
  ];

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* HEADER SECTION */}
          <HeaderSection />

          {/* MAIN WORKSHOP CARDS */}
          <WorkshopCards workshops={workshops} />

          {/* FEATURES SECTION */}
          <FeaturesSection />

          {/* TESTIMONIALS SECTION */}
          <TestimonialsSection testimonials={testimonials} />

          {/* HOST A WORKSHOP SECTION */}
          <HostSection />
        </div>

        {/* Animated background elements */}
        <motion.div
          className="fixed top-1/3 right-0 w-72 h-72 bg-gray-900 rounded-full opacity-5 -z-10"
          animate={{
            scale: [1, 1.2, 1.1, 1],
            x: [0, 20, -10, 0],
            y: [0, -30, 15, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="fixed bottom-1/2 left-10 w-48 h-48 bg-black rounded-full opacity-5 -z-10"
          animate={{
            scale: [1, 1.3, 1.1, 1],
            x: [0, -30, 15, 0],
            y: [0, 30, -15, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1.5,
          }}
        />
      </motion.div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

// ====== HEADER SECTION COMPONENT ======
const HeaderSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Header text animation variants
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Title animation with letter staggering
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const titleText = "Upcoming Workshops";

  // Subtitle animation
  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Line animation
  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "5rem",
      transition: {
        delay: 0.9,
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={headerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-center mb-20 py-8"
    >
      <motion.h1
        variants={titleVariants}
        className="text-6xl font-bold text-black mb-6 inline-block"
      >
        {titleText.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{
              marginRight: letter === " " ? "0.5rem" : "0",
              marginLeft: letter === " " ? "0.5rem" : "0",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        variants={lineVariants}
        className="h-1 bg-black mx-auto mb-6"
      />

      <motion.p
        variants={subtitleVariants}
        className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed"
      >
        Join interactive workshops led by industry professionals to boost your
        skills with hands-on learning and real-time feedback.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center mt-8 space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#111" }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-6 py-3 rounded-lg font-medium"
        >
          Browse All Workshops
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-lg font-medium border border-black"
        >
          View Calendar
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

// ====== WORKSHOP CARDS COMPONENT ======
const WorkshopCards = ({ workshops }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
    >
      {workshops.map((workshop, index) => (
        <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
      ))}
    </motion.section>
  );
};

// ====== INDIVIDUAL WORKSHOP CARD COMPONENT ======
const WorkshopCard = ({ workshop, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  // Card animation variants
  const cardAnimations = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateY: 5,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.25, 0.1, 1],
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.12)",
      borderColor: "rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(249, 250, 251, 1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    rest: {
      scale: 1,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      borderColor: "rgba(229, 231, 235, 1)",
      backgroundColor: "white",
    },
  };

  // Text variants
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2 + index * 0.15 + custom * 0.1,
        ease: "easeOut",
      },
    }),
  };

  // Image variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.1 + index * 0.2,
        ease: "easeOut",
      },
    },
  };

  // Button variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4 + index * 0.2,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#000",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      variants={cardAnimations}
      className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full"
    >
      <motion.div
        className="relative h-48 mb-4 rounded-lg overflow-hidden"
        variants={imageVariants}
      >
        <motion.img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
        >
          <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
            Details
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center mb-3 text-gray-500 text-sm space-x-3"
        custom={0}
        variants={textVariants}
      >
        <span className="flex items-center">
          <FaCalendarAlt className="mr-1" /> {workshop.date}
        </span>
        <span className="flex items-center">
          <FaClock className="mr-1" /> {workshop.time.split(" - ")[0]}
        </span>
      </motion.div>

      <motion.h2
        className="text-xl font-bold text-black mb-2"
        custom={1}
        variants={textVariants}
      >
        {workshop.title}
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-4 text-sm flex-grow"
        custom={2}
        variants={textVariants}
      >
        {workshop.description}
      </motion.p>

      <motion.div
        className="flex items-center mb-4 pt-2 border-t border-gray-100 justify-between"
        custom={3}
        variants={textVariants}
      >
        <span className="flex items-center text-gray-500 text-sm">
          <FaMapMarkerAlt className="mr-1" /> {workshop.location}
        </span>
        <span className="flex items-center text-gray-500 text-sm">
          <FaUsers className="mr-1" /> {workshop.capacity} spots
        </span>
      </motion.div>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="bg-black text-white px-4 py-3 rounded-lg font-bold w-full transition-colors"
      >
        Register Now
      </motion.button>
    </motion.div>
  );
};

// ====== FEATURES SECTION COMPONENT ======
const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const features = [
    {
      title: "Hands-on Learning",
      description:
        "Practical exercises and real-world projects that reinforce concepts and build portfolio-ready work.",
      icon: "🛠️",
    },
    {
      title: "Small Group Setting",
      description:
        "Limited capacity ensures personalized attention and opportunities to ask questions and get feedback.",
      icon: "👥",
    },
    {
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of experience and proven expertise in their fields.",
      icon: "👨‍🏫",
    },
    {
      title: "Interactive Sessions",
      description:
        "Engaging activities, discussions, and collaborative exercises to enhance the learning experience.",
      icon: "💬",
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="mb-20 bg-black text-white p-10 rounded-2xl"
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Why Our Workshops?</h2>
        <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-300">
          Experience a different kind of learning that prioritizespractical
          skills and real-world application.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex space-x-4"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-8 py-3 rounded-lg font-medium"
        >
          View All Features
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

// ====== TESTIMONIALS SECTION COMPONENT ======
const TestimonialsSection = ({ testimonials }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.1, 1],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="mb-20"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">
          What Participants Say
        </h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from past workshop attendees who have transformed their skills
          and accelerated their careers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="mb-6">
              <svg
                className="w-10 h-10 text-gray-300 mx-auto"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10,8 L22,8 L22,14 L16,14 L16,16 C16,16.5522847 16.4477153,17 17,17 L22,17 L22,23 L17,23 C13.6862915,23 11,20.3137085 11,17 L11,13 L10,13 C9.44771525,13 9,12.5522847 9,12 L9,9 C9,8.44771525 9.44771525,8 10,8 Z M20,10 L12,10 L12,11 L13,11 L13,17 C13,19.209139 14.790861,21 17,21 L20,21 L20,19 L17,19 C15.8954305,19 15,18.1045695 15,17 L15,14 L15,11 L20,11 L20,10 Z" />
              </svg>
            </div>
            <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
            <div>
              <h4 className="font-bold text-black">{testimonial.author}</h4>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ====== HOST A WORKSHOP SECTION COMPONENT ======
const HostSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-gray-100 p-10 rounded-2xl text-center mb-10"
    >
      <h2 className="text-3xl font-bold text-black mb-4">Host a Workshop</h2>
      <div className="w-16 h-1 bg-black mx-auto mb-6"></div>

      <div className="max-w-3xl mx-auto">
        <p className="text-gray-600 mb-6">
          Have knowledge to share? Partner with us to host a workshop and reach
          our community of eager learners. We provide the platform, tools, and
          audience—you bring your expertise.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-md max-w-xs">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-bold text-lg mb-2">Showcase Expertise</h3>
            <p className="text-gray-600 text-sm">
              Establish yourself as a thought leader in your field and build
              your professional reputation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md max-w-xs">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="font-bold text-lg mb-2">Expand Network</h3>
            <p className="text-gray-600 text-sm">
              Connect with professionals who share your interests and
              potentially find collaborators.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md max-w-xs">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-lg mb-2">Earn Income</h3>
            <p className="text-gray-600 text-sm">
              Receive compensation for your time and expertise with our
              revenue-sharing model.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-8 py-3 rounded-lg font-medium"
        >
          Apply to Host
        </motion.button>

        <p className="text-gray-500 text-sm mt-4">
          Applications are reviewed within 7 business days. We'll reach out to
          discuss details if there's a good fit.
        </p>
      </div>
    </motion.section>
  );
};

export default Workshop;
