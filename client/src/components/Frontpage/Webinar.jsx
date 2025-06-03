import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt, FaClock, FaUser, FaGlobe } from "react-icons/fa";
import Header from "./Header"; // Adjust path as needed
import Footer from "./Footer"; // Adjust path as needed

const Webinar = ({ setCursorVariant }) => {
  // ====== WEBINAR DATA ======
  const webinars = [
    {
      id: 1,
      title: "Advanced React Patterns for Developers",
      description:
        "Learn cutting-edge React techniques, performance optimizations, and component architecture from industry experts.",
      date: "April 16, 2025",
      time: "2:00 PM EST",
      speaker: "Alex Rodriguez",
      specialization: "Senior Frontend Engineer",
      attendees: 1240,
    },
    {
      id: 2,
      title: "Building Scalable Backend Systems",
      description:
        "Discover best practices for creating resilient, high-performance backend systems that can handle millions of users.",
      date: "April 20, 2025",
      time: "1:00 PM EST",
      speaker: "Sarah Chen",
      specialization: "System Architect",
      attendees: 980,
    },
    {
      id: 3,
      title: "The Future of AI in Web Development",
      description:
        "Explore practical applications of AI and machine learning that are transforming how we build and interact with web applications.",
      date: "April 25, 2025",
      time: "3:30 PM EST",
      speaker: "Michael Johnson",
      specialization: "AI Researcher",
      attendees: 1650,
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

  // ====== RECENT WEBINARS DATA ======
  const pastWebinars = [
    {
      title: "Mastering CSS Grid and Flexbox",
      attendees: 2100,
      thumbnail:
        "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
    },
    {
      title: "Introduction to WebAssembly",
      attendees: 1850,
      thumbnail:
        "https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png",
    },
    {
      title: "Progressive Web Apps in 2025",
      attendees: 2350,
      thumbnail:
        "https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_1280.png",
    },
    {
      title: "Modern Authentication Strategies",
      attendees: 1700,
      thumbnail:
        "https://cdn.pixabay.com/photo/2020/04/08/08/08/cyber-security-5016989_1280.jpg",
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

          {/* MAIN WEBINAR CARDS */}
          <WebinarCards webinars={webinars} />

          {/* FEATURED WEBINAR */}
          <FeaturedWebinar />

          {/* RECENT WEBINARS */}
          <RecentWebinars webinars={pastWebinars} />

          {/* SUBMIT PROPOSAL SECTION */}
          <ProposalSection />

          {/* NEWSLETTER SECTION */}
          <NewsletterSection />
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

  const titleText = "Upcoming Webinars";

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
        Learn directly from industry experts through our live and on-demand
        webinar sessions, featuring interactive Q&A and hands-on demonstrations.
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
          Browse All Webinars
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

// ====== WEBINAR CARDS COMPONENT ======
const WebinarCards = ({ webinars }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
    >
      {webinars.map((webinar, index) => (
        <WebinarCard key={webinar.id} webinar={webinar} index={index} />
      ))}
    </motion.section>
  );
};

// ====== INDIVIDUAL WEBINAR CARD COMPONENT ======
const WebinarCard = ({ webinar, index }) => {
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
          src={
            webinar.id === 1
              ? "https://cdn.pixabay.com/photo/2017/03/30/17/41/javascript-2189147_1280.png"
              : webinar.id === 2
              ? "https://cdn.pixabay.com/photo/2018/05/04/20/01/website-3374825_1280.jpg"
              : "https://cdn.pixabay.com/photo/2021/11/03/12/28/artificial-intelligence-6765433_1280.jpg"
          }
          alt={webinar.title}
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
            Preview
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center mb-3 text-gray-500 text-sm space-x-3"
        custom={0}
        variants={textVariants}
      >
        <span className="flex items-center">
          <FaCalendarAlt className="mr-1" /> {webinar.date}
        </span>
        <span className="flex items-center">
          <FaClock className="mr-1" /> {webinar.time}
        </span>
      </motion.div>

      <motion.h2
        className="text-xl font-bold text-black mb-2"
        custom={1}
        variants={textVariants}
      >
        {webinar.title}
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-4 text-sm flex-grow"
        custom={2}
        variants={textVariants}
      >
        {webinar.description}
      </motion.p>

      <motion.div
        className="flex items-center mb-4 pt-2 border-t border-gray-100"
        custom={3}
        variants={textVariants}
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-600">
          <FaUser />
        </div>
        <div>
          <p className="font-bold text-black text-sm">{webinar.speaker}</p>
          <p className="text-gray-500 text-xs">{webinar.specialization}</p>
        </div>
        <div className="ml-auto flex items-center text-gray-500 text-sm">
          <FaGlobe className="mr-1" /> {webinar.attendees.toLocaleString()}+
          attendees
        </div>
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

// ====== FEATURED WEBINAR COMPONENT ======
const FeaturedWebinar = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-black rounded-2xl overflow-hidden mb-20 relative"
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 800 800"
        >
          <motion.circle
            cx="400"
            cy="400"
            r="200"
            stroke="white"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 0.5 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M100,100 L700,700"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 0.5 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
        <div className="p-10 text-white flex flex-col justify-center">
          <motion.div
            variants={childVariants}
            className="mb-2 inline-block bg-white text-black px-3 py-1 rounded-full text-xs font-bold"
          >
            FEATURED WEBINAR
          </motion.div>

          <motion.h2
            variants={childVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            The Evolution of Web Development in 2025
          </motion.h2>

          <motion.p variants={childVariants} className="mb-6 text-gray-300">
            Join our panel of expert developers as they discuss emerging
            technologies, trends, and best practices shaping the future of web
            development.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="flex flex-wrap gap-4 mb-6"
          >
            <div className="bg-gray-800 rounded-full px-3 py-1 text-sm">
              May 10, 2025
            </div>
            <div className="bg-gray-800 rounded-full px-3 py-1 text-sm">
              1:00 PM EST
            </div>
            <div className="bg-gray-800 rounded-full px-3 py-1 text-sm">
              Interactive Q&A
            </div>
          </motion.div>

          <motion.div variants={childVariants} className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium"
            >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-500 text-white px-6 py-3 rounded-lg font-medium"
            >
              Add to Calendar
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          variants={childVariants}
          className="relative h-72 md:h-auto"
        >
          <motion.img
            src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg"
            alt="Featured Webinar"
            className="absolute w-full h-full object-cover"
            initial={{ scale: 1.1, filter: "brightness(0.7)" }}
            animate={
              inView
                ? { scale: 1, filter: "brightness(0.8)" }
                : { scale: 1.1, filter: "brightness(0.7)" }
            }
            transition={{ duration: 1 }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center text-black"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ====== RECENT WEBINARS COMPONENT ======
const RecentWebinars = ({ webinars }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-2xl font-bold text-black">Recent Webinars</h2>
        <motion.button
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          className="text-black font-medium flex items-center"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {webinars.map((webinar, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="h-32 relative">
              <img
                src={webinar.thumbnail}
                alt={webinar.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1">
                On Demand
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-black text-sm mb-1">
                {webinar.title}
              </h3>
              <p className="text-gray-500 text-xs mb-2">
                {webinar.attendees.toLocaleString()} attendees
              </p>
              <button className="text-black text-sm font-medium hover:underline">
                Watch Recording
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ====== PROPOSAL SECTION COMPONENT ======
const ProposalSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
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
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-gray-100 p-10 rounded-2xl mb-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-black mb-4"
          >
            Want to Host a Webinar?
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-black mb-6"
          />
          <motion.p variants={itemVariants} className="text-gray-600 mb-8">
            Share your expertise with a global audience. We're looking for
            speakers who can provide valuable insights and actionable takeaways
            for our community of developers, designers, and tech professionals.
          </motion.p>

          <motion.div variants={itemVariants} className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-black rounded-full p-1 text-white mr-3 mt-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-black">Reach a Large Audience</h3>
                <p className="text-gray-600 text-sm">
                  Our webinars attract thousands of attendees from around the
                  world
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-black rounded-full p-1 text-white mr-3 mt-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-black">Grow Your Network</h3>
                <p className="text-gray-600 text-sm">
                  Connect with industry professionals and expand your
                  professional network
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-black rounded-full p-1 text-white mr-3 mt-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-black">Establish Authority</h3>
                <p className="text-gray-600 text-sm">
                  Position yourself as a thought leader in your area of
                  expertise
                </p>
              </div>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
          >
            Submit Your Proposal
          </motion.button>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          <div className="relative w-full h-full max-h-80">
            <motion.img
              src="https://cdn.pixabay.com/photo/2019/11/07/20/24/cinema-4609877_1280.jpg"
              alt="Host a Webinar"
              className="rounded-xl object-cover w-full h-full shadow-lg"
              initial={{ filter: "grayscale(100%)" }}
              animate={
                inView
                  ? { filter: "grayscale(0%)" }
                  : { filter: "grayscale(100%)" }
              }
              transition={{ duration: 1.2 }}
            />
            <motion.div
              className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg"
              initial={{ scale: 0, rotate: -10 }}
              animate={
                inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }
              }
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
            >
              <div className="text-sm font-bold text-black">
                Proposals Review Time
              </div>
              <div className="text-3xl font-bold text-black">2-3 Days</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ====== NEWSLETTER SECTION COMPONENT ======
const NewsletterSection = () => {
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
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-black text-white rounded-xl p-10 text-center overflow-hidden relative"
    >
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full opacity-20 -mr-20 -mt-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold mb-4"
        >
          Stay Updated on Upcoming Webinars
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-lg mx-auto mb-6 text-gray-300"
        >
          Subscribe to our newsletter and never miss an opportunity to learn
          from the best in the industry. We'll send you updates on new webinars,
          exclusive content, and special offers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-4 py-3 rounded-lg text-black"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-3 rounded-lg font-bold"
          >
            Subscribe
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 text-sm text-gray-400"
        >
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates from our company.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Webinar;
