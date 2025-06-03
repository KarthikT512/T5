import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaVideo, FaBriefcase } from "react-icons/fa";
import Header from "./Header"; // Adjust path if necessary (e.g., '../Header' or './components/Frontpage/Header')
import Footer from "./Footer"; // Adjust path if necessary (e.g., '../Footer' or './components/Frontpage/Footer')

const Mentorship = ({ setCursorVariant }) => {
  // ====== MAIN CONTAINER ANIMATIONS ======
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // ====== FEATURE SECTION DATA ======
  const features = [
    {
      title: "1-on-1 Mentoring",
      description:
        "Personalized sessions with mentors to address your unique goals and challenges.",
      icon: "users",
    },
    {
      title: "Live Group Sessions",
      description:
        "Join live discussions, Q&A, and workshops on trending tech topics and industry insights.",
      icon: "video",
    },
    {
      title: "Career Guidance",
      description:
        "Get help with resumes, portfolios, job interviews, career roadmaps, and networking opportunities.",
      icon: "briefcase",
    },
  ];

  // ====== MENTORSHIP PROCESS DATA ======
  const steps = [
    {
      number: 1,
      title: "Apply & Match",
      description:
        "Fill out an application detailing your goals and background. We'll match you with the perfect mentor.",
    },
    {
      number: 2,
      title: "Initial Meeting",
      description:
        "Connect with your mentor for a comprehensive discussion about your goals, challenges, and aspirations.",
    },
    {
      number: 3,
      title: "Create Roadmap",
      description:
        "Collaborate with your mentor to develop a personalized roadmap for your growth and development.",
    },
    {
      number: 4,
      title: "Regular Sessions",
      description:
        "Engage in scheduled one-on-one sessions with your mentor to track progress and address challenges.",
    },
  ];

  // ====== STATISTICS DATA ======
  const stats = [
    { value: "500+", label: "Active Mentees" },
    { value: "50+", label: "Expert Mentors" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "Support Access" },
  ];

  // ====== TESTIMONIALS DATA ======
  const testimonials = [
    {
      quote:
        "The mentorship program completely transformed my career path. I learned skills that I couldn't find in any tutorial.",
      author: "Alex Johnson",
      position: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "My mentor helped me navigate complex technical challenges and gave me confidence to pursue senior roles.",
      author: "Sarah Chen",
      position: "Software Engineer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "The personal guidance and industry insights were invaluable. I landed my dream job within 3 months.",
      author: "Michael Patel",
      position: "Data Scientist",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
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

          {/* FEATURE CARDS SECTION */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </motion.section>

          {/* MENTORSHIP PROCESS SECTION */}
          <ProcessSection steps={steps} />

          {/* STATISTICS SECTION */}
          <StatsSection stats={stats} />

          {/* TESTIMONIALS SECTION */}
          <TestimonialsSection testimonials={testimonials} />

          {/* CTA SECTION */}
          <CTASection />
        </div>

        {/* Animated background elements */}
        <motion.div
          className="fixed top-1/4 right-0 w-64 h-64 bg-gray-900 rounded-full opacity-5 -z-10"
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
          className="fixed bottom-1/3 left-10 w-40 h-40 bg-black rounded-full opacity-5 -z-10"
          animate={{
            scale: [1, 1.3, 1.1, 1],
            x: [0, -30, 15, 0],
            y: [0, 30, -15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
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
        staggerChildren: 0.04,
        delayChildren: 0.2,
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

  const titleText = "Mentorship Program";

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
      width: "4rem",
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
      className="text-center mb-24 py-8"
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
        Unlock your full potential with personalized guidance from industry
        experts who have walked the path you aspire to travel.
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
          Get Started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-lg font-medium border border-black"
        >
          Learn More
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

// ====== FEATURE CARD COMPONENT ======
const FeatureCard = ({ title, description, icon, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  // Card animation combined variants
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

  // Line variants
  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "3rem",
      transition: {
        duration: 0.6,
        delay: 0.3 + index * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Icon variants
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + index * 0.2,
        ease: "backOut",
      },
    },
  };

  // Get the appropriate icon based on the icon prop
  const getIcon = (iconName) => {
    switch (iconName) {
      case "users":
        return <FaUsers size={28} />;
      case "video":
        return <FaVideo size={28} />;
      case "briefcase":
        return <FaBriefcase size={28} />;
      default:
        return <FaUsers size={28} />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={cardAnimations}
      className="bg-white p-8 shadow-lg rounded-xl border border-gray-200 cursor-pointer transition-all duration-300 h-full flex flex-col"
    >
      <motion.div
        className="mb-6 text-black p-3 rounded-full bg-gray-50 inline-block"
        variants={iconVariants}
      >
        {getIcon(icon)}
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-black mb-3"
        custom={0}
        variants={textVariants}
      >
        {title}
      </motion.h2>

      <motion.div className="w-12 h-1 bg-black mb-4" variants={lineVariants} />

      <motion.p
        className="text-gray-600 leading-relaxed"
        custom={1}
        variants={textVariants}
      >
        {description}
      </motion.p>

      <motion.div className="mt-auto pt-4" custom={2} variants={textVariants}>
        <motion.button
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          className="text-black font-medium flex items-center mt-2"
        >
          Learn more
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
    </motion.div>
  );
};

// ====== PROCESS SECTION COMPONENT ======
const ProcessSection = ({ steps }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const numberVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-20 mb-24"
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-3xl font-bold text-black mb-4">How It Works</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our structured mentorship process is designed to ensure meaningful
          growth and measurable progress.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connecting line running through the steps */}
        <motion.div
          variants={lineVariants}
          className="absolute top-14 left-0 h-1 bg-gray-200 w-full transform origin-left hidden md:block"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                variants={numberVariants}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "black",
                  color: "white",
                  transition: { duration: 0.2 },
                }}
                className="w-16 h-16 rounded-full bg-white border-2 border-black flex items-center justify-center text-xl font-bold mb-6 z-10"
              >
                {step.number}
              </motion.div>
              <h3 className="text-xl font-bold text-black mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={itemVariants} className="text-center mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-8 py-3 rounded-lg font-medium inline-flex items-center"
        >
          <span>Learn about our process</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
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
    </motion.section>
  );
};

// ====== STATISTICS SECTION COMPONENT ======
const StatsSection = ({ stats }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? " classification" : "hidden"}
      variants={containerVariants}
      className="py-16 mb-20 bg-black text-white rounded-2xl overflow-hidden relative"
    >
      {/* Background animated elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full opacity-20 -mr-20 -mt-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-40 h-40 bg-gray-700 rounded-full opacity-20 -ml-10 -mb-10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="relative z-10 px-10">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4">Program Statistics</h2>
          <div className="w-16 h-1 bg-white mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="p-6"
            >
              <motion.h3
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                {stat.value}
              </motion.h3>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.5,
                }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
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
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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
      className="py-20 mb-20"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Success Stories</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from our mentees who have transformed their careers through
          dedicated mentorship.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.5,
                type: "spring",
              }}
              className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-2 border-black"
            >
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <svg
              className="w-10 h-10 mx-auto mb-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              <h4 className="font-bold text-black">{testimonial.author}</h4>
              <p className="text-gray-500 text-sm">{testimonial.position}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ====== CTA SECTION COMPONENT ======
const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Section variants
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  // Content variants
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Button variants
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#f0f0f0",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      backgroundColor: "#e5e5e5",
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  };

  // Background shape variants
  const shapeVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 0.07,
      pathLength: 1,
      transition: {
        duration: 2.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-black p-12 rounded-2xl text-center text-white relative overflow-hidden"
    >
      {/* Animated background shapes */}
      <motion.svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 400 400"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ position: "absolute", zIndex: 0 }}
      >
        <motion.circle
          cx="80"
          cy="80"
          r="50"
          stroke="white"
          strokeWidth="1"
          fill="none"
          variants={shapeVariants}
        />
        <motion.circle
          cx="320"
          cy="300"
          r="70"
          stroke="white"
          strokeWidth="1"
          fill="none"
          variants={shapeVariants}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.path
          d="M20,20 L380,380"
          stroke="white"
          strokeWidth="1"
          fill="none"
          variants={shapeVariants}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.svg>

      <div className="relative z-10">
        <motion.h2
          variants={contentVariants}
          className="text-4xl font-bold mb-6"
        >
          Become a Mentee
        </motion.h2>

        <motion.div
          className="w-20 h-1 bg-white mx-auto mb-8"
          initial={{ width: 0 }}
          animate={inView ? { width: "5rem" } : { width: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />

        <motion.p
          variants={contentVariants}
          className="mb-10 max-w-2xl mx-auto text-lg"
        >
          Ready to accelerate your learning and career growth? Join our
          mentorship program today and transform your professional journey.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-white text-black px-10 py-4 rounded-lg font-bold transition-all duration-300 transform shadow-xl"
            onClick={() => console.log("Apply button clicked")}
          >
            Apply Now
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold transition-all duration-300 transform"
            transition={{ delay: 0.2 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-sm mt-8 text-gray-300"
        >
          Applications are reviewed on a rolling basis. Limited spots available.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Mentorship;
