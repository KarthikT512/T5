import { motion } from "framer-motion";

const HeroContent = ({
  title,
  description,
  primaryButton,
  secondaryButton,
}) => {
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.h1
        variants={item}
        className="font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-tight"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={item}
        className="text-white/90 text-base md:text-lg max-w-xl md:pr-8 leading-relaxed"
      >
        {description}
      </motion.p>

      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row gap-4 pt-4"
      >
        <button
          onClick={primaryButton.action}
          className="px-6 py-3 bg-black text-white font-medium rounded-md border border-white/50 transition-all hover:bg-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] focus:ring-2 focus:ring-white/30 transform hover:-translate-y-1"
        >
          {primaryButton.text}
        </button>
        <button
          onClick={secondaryButton.action}
          className={`px-6 py-3 bg-transparent ${secondaryButton.textColor} font-medium rounded-md border border-white/30 transition-all hover:bg-black/30 hover:border-white/70 focus:ring-2 focus:ring-white/20 transform hover:-translate-y-1`}
        >
          {secondaryButton.text}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
