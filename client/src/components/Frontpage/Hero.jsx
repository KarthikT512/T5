"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";
import HeroContent from "./HeroContent";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const autoplayTimerRef = useRef(null);
  const slidesRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Learn from Top IITians in Engineering",
      description:
        "Access premium courses taught by renowned IITians and enhance your technical skills with industry-recognized curriculum developed by graduates from prestigious IITs.",
      imageSrc:
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&h=544&q=90",
      imageAlt: "IITians teaching engineering concepts",
      gradientFrom: "from-black/70 via-black/50 to-transparent",
      primaryButton: {
        text: "Explore Courses",
        action: () => {
          // Navigate to courses
          window.location.href = "/courses";
        },
      },
      secondaryButton: {
        text: "Meet Our IITians",
        action: () => {
          // Open modal with faculty info
          console.log("Open faculty modal");
        },
        textColor: "text-white",
      },
    },
    {
      id: 2,
      title: "Advanced Technologies Taught by IITians",
      description:
        "Our educators from Indian Institutes of Technology bring decades of research experience to help you master cutting-edge engineering concepts and innovations.",
      imageSrc:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&h=544&q=90",
      imageAlt: "IITians demonstrating technical concepts",
      gradientFrom: "from-black/70 via-black/50 to-transparent",
      primaryButton: {
        text: "View Programs",
        action: () => {
          // Navigate to programs
          window.location.href = "/courses";
        },
      },
      secondaryButton: {
        text: "Research Publications",
        action: () => {
          // Open research publications
          console.log("Open research publications");
        },
        textColor: "text-white",
      },
    },
    {
      id: 3,
      title: "Gain Industry-Ready Skills with IITian-Designed Curriculum",
      description:
        "Access specialized engineering courses designed by IITians that combine theoretical foundations with practical applications demanded by top companies worldwide.",
      imageSrc:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&h=544&q=90",
      imageAlt: "Engineering students working on technical projects",
      gradientFrom: "from-black/70 via-black/50 to-transparent",
      primaryButton: {
        text: "Certification Programs",
        action: () => {
          // View certification options
          console.log("View certification programs");
        },
      },
      secondaryButton: {
        text: "Alumni Success Stories",
        action: () => {
          // Navigate to alumni stories
          window.location.href = "/success-stories";
        },
        textColor: "text-white",
      },
    },
  ];

  const startAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      goToNextSlide();
    }, 7000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  const goToSlide = (index) => {
    if (index === currentSlide) return;

    setSlideDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
    startAutoplay(); // Reset the autoplay timer
  };

  const goToNextSlide = () => {
    setSlideDirection("right");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setSlideDirection("left");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Scroll to the content section below hero
  const scrollToNextSection = () => {
    const contentSection =
      document.getElementById("content") ||
      document.querySelector("div:not(#hero)");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If no specific section is found, just scroll down by the hero's height
      const heroHeight = document.getElementById("hero").offsetHeight;
      window.scrollBy({
        top: heroHeight,
        behavior: "smooth",
      });
    }
  };

  // Variants for slide animations
  const slideVariants = {
    enterFromRight: {
      x: "100%",
      opacity: 0,
    },
    enterFromLeft: {
      x: "-100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exitToLeft: {
      x: "-100%",
      opacity: 0,
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exitToRight: {
      x: "100%",
      opacity: 0,
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
  };

  return (
    <section
      className="relative w-full bg-black overflow-hidden pt-16"
      id="hero"
    >
      {/* Hero Container */}
      <div ref={slidesRef} className="relative w-full h-[544px]">
        {/* Hero Slider */}
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence initial={false} custom={slideDirection}>
            <motion.div
              key={currentSlide}
              custom={slideDirection}
              variants={slideVariants}
              initial={
                slideDirection === "right" ? "enterFromRight" : "enterFromLeft"
              }
              animate="center"
              exit={slideDirection === "right" ? "exitToLeft" : "exitToRight"}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slides[currentSlide].imageSrc}
                alt={slides[currentSlide].imageAlt}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradientFrom}`}
              ></div>

              <div className="hero-content absolute inset-0 flex items-center px-4 md:px-12 lg:px-24 z-20">
                <div className="w-full max-w-3xl">
                  <HeroContent
                    title={slides[currentSlide].title}
                    description={slides[currentSlide].description}
                    primaryButton={slides[currentSlide].primaryButton}
                    secondaryButton={slides[currentSlide].secondaryButton}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 hover:bg-black/70 hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 group"
            aria-label="Previous slide"
            onClick={goToPrevSlide}
          >
            <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 hover:bg-black/70 hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 group"
            aria-label="Next slide"
            onClick={goToNextSlide}
          >
            <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot w-2.5 h-2.5 rounded-full ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                } focus:outline-none transition-all duration-300`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>

          {/* Scroll Down Button */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={scrollToNextSection}
              className="flex flex-col items-center justify-center text-white opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Scroll to next section"
            >
              <span className="text-xs mt-2 tracking-wider">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ChevronsDown className="h-6 w-6" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
