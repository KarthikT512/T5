"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Updated stats array without numbers
const stats = [
  {
    statement: "Enrolling students globally",
    icon: "👨‍🎓",
    color: "from-cyan-500 to-blue-600",
  },
  {
    statement: "High satisfaction rate from student surveys",
    icon: "🏆",
    color: "from-emerald-500 to-teal-600",
  },
  {
    statement: "Certified tutors who are industry experts",
    icon: "👨‍🏫",
    color: "from-amber-500 to-orange-600",
  },
];

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="achievements"
      className="py-12 relative overflow-hidden mt-6"
      ref={ref}
    >
      {/* Solid background with floating patterns */}
      <div className="absolute inset-0 bg-black z-0">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ij48cGF0aCBkPSJNMzYgMzBoMnYyaC0yek0zMCAzNmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>

        {/* Floating circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto -mt-6 px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Title section - centered */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 max-w-2xl pt-1"
          >
            <motion.div
              className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold mb-4 text-blue-100"
              whileHover={{ scale: 1.05 }}
            >
              OUR IMPACT
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100">
                Learning Milestones
              </span>
            </h2>
            <p className="text-blue-100/80 text-sm mb-2">
              Our achievements reflect our commitment to quality education and
              student success
            </p>

            {/* Decorative element - Floating sparkles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white/30 text-sm"
                  style={{
                    left: `${5 + i * 20}%`,
                    top: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats cards - full width below the title */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                className="relative h-full"
              >
                <div className="h-full backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20 flex flex-col items-center text-center overflow-hidden group">
                  {/* Pulsing highlight effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    animate={{
                      boxShadow: [
                        "inset 0 0 0 0 rgba(255,255,255,0.1)",
                        "inset 0 0 20px 5px rgba(255,255,255,0.2)",
                        "inset 0 0 0 0 rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Icon with subtle animation */}
                  <motion.div
                    className="text-3xl mb-2"
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <span className="drop-shadow-glow">{stat.icon}</span>
                  </motion.div>

                  {/* Statement with animated underline */}
                  <div className="relative mb-2">
                    <p className="text-base font-medium text-blue-50">
                      {stat.statement}
                    </p>
                    <motion.div
                      className={`h-0.5 w-0 bg-gradient-to-r ${stat.color} absolute -bottom-1 left-1/2 transform -translate-x-1/2`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "80%" }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
