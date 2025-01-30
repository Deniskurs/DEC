import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { LuLucideIcon } from "react-icons/lu";
import { useRef } from "react";

interface FeatureCardProps {
  Icon: LuLucideIcon;
  title: string;
  description: string;
  stats: {
    value: string;
    label: string;
  };
  iconLabel: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  stats,
  iconLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle animations based on view/hover
  useEffect(() => {
    if (isMobile && isInView) {
      controls.start("animate");
    }
  }, [isMobile, isInView, controls]);

  const getVariants = () => {
    if (isMobile) {
      return {
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      };
    }
    return {
      initial: { opacity: 1, y: 0 },
      hover: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
    };
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      initial="initial"
      animate={isMobile ? controls : undefined}
      whileHover={!isMobile ? "hover" : undefined}
      style={{ touchAction: "pan-x pan-y" }}
    >
      {/* Clean overlay effect */}
      <motion.div
        className="absolute -inset-1 bg-rich-blue-900 rounded-2xl"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 0.98 },
          animate: { opacity: 0.98 },
        }}
      />

      {/* Main card content */}
      <div className="relative h-full bg-gradient-to-br from-rich-blue-800 via-rich-blue-700 to-rich-blue-600 rounded-2xl border border-cream-50/20 overflow-hidden">
        <div className="relative p-4 md:p-8 h-full flex flex-col">
          {/* Icon assembly */}
          <div className="relative mb-8">
            <motion.div
              className="relative z-10 w-12 h-12 md:w-16 md:h-16 bg-rich-blue-900 rounded-2xl flex items-center justify-center"
              variants={{
                initial: { rotate: 0 },
                hover: {
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                },
                animate: {
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                },
              }}
            >
              {/* Mechanical rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-cream-50/40 rounded-2xl"
                  style={{ padding: i * 4 }}
                  variants={{
                    initial: { rotate: 0 },
                    hover: {
                      rotate: i % 2 === 0 ? 360 : -360,
                      transition: {
                        duration: 10 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    },
                    animate: {
                      rotate: i % 2 === 0 ? 360 : -360,
                      transition: {
                        duration: 10 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    },
                  }}
                />
              ))}
              <Icon className="h-6 w-6 md:h-8 md:w-8 text-cream-50" />
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute -right-4 top-0 bg-rich-blue-900 px-4 py-1 rounded-xl border border-cream-50/20"
              variants={{
                initial: { y: 0 },
                hover: { y: -5 },
                animate: { y: -5 },
              }}
            >
              <span className="text-xs font-semibold text-cream-50 tracking-wider uppercase">
                {iconLabel}
              </span>
            </motion.div>
          </div>

          {/* Content with mechanical reveal */}
          <motion.div className="space-y-4 flex-grow" variants={getVariants()}>
            <motion.h3
              className="text-lg md:text-xl font-bold text-cream-50"
              variants={{
                initial: { opacity: isMobile ? 0 : 1 },
                hover: { color: "#fff" },
                animate: { opacity: 1, color: "#fff" },
              }}
            >
              {title}
            </motion.h3>

            <div className="space-y-3">
              {description.split(". ").map((sentence, index) => (
                <motion.div
                  key={index}
                  className="relative pl-4 text-sm md:text-base text-cream-50/90"
                  variants={{
                    initial: { x: -10, opacity: 0 },
                    hover: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.3, delay: index * 0.1 },
                    },
                    animate: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.3, delay: index * 0.1 },
                    },
                  }}
                >
                  <span className="absolute left-0 text-rich-blue-400">›</span>
                  {sentence}.
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats display */}
          <motion.div
            className="mt-8 pt-6 border-t border-cream-50/20"
            variants={getVariants()}
          >
            <div className="flex items-baseline gap-3">
              <motion.div
                className="text-2xl md:text-3xl font-bold text-cream-50"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.1 },
                  animate: { scale: 1.1 },
                }}
              >
                {stats.value}
              </motion.div>
              <motion.div
                className="text-sm text-cream-50/80"
                variants={{
                  initial: { opacity: isMobile ? 0 : 1 },
                  hover: { color: "#fff" },
                  animate: { opacity: 1, color: "#fff" },
                }}
              >
                {stats.label}
              </motion.div>
            </div>
          </motion.div>

          {/* Animated Grid Pattern */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 0.05 },
              animate: { opacity: 0.05 },
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                     linear-gradient(to right, rgba(252, 249, 240, 1) 1px, transparent 1px),
                     linear-gradient(to bottom, rgba(252, 249, 240, 1) 1px, transparent 1px)
                   `,
                backgroundSize: "24px 24px",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
