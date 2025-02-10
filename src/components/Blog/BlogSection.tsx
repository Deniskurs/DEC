import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuBookOpen } from "react-icons/lu";
import BlogCard from "./BlogCard";
import { blogPosts } from "../../data/blogData";

const BlogSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="blog-section"
      className="relative bg-gradient-to-b from-rich-blue-900 to-rich-blue-800"
    >
      {/* Enhanced Background with better blending */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(252,249,240,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(252,249,240,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-rich-blue-900/10" />

        {/* Animated particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-cream-50/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16 lg:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <LuBookOpen className="h-6 w-6 text-cream-50" />
                <span className="text-sm font-semibold tracking-wider text-cream-50 uppercase">
                  Market Intelligence
                </span>
              </div>

              <div
                className="section-title relative"
                data-text="D.E.C Articles"
                style={
                  {
                    "--section-title-color": "rgba(252, 249, 240, 0.1)",
                  } as React.CSSProperties
                }
              >
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream-50 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Latest Market Insights
                </motion.h2>

                <motion.p
                  className="text-base sm:text-lg md:text-xl font-medium text-cream-50/90 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  Stay ahead with expert analysis and strategic intelligence
                </motion.p>
              </div>
            </motion.div>

            {/* Card Carousel Container */}
            <div className="relative -mx-4 sm:mx-0">
              <div className="relative px-4 sm:px-6">
                <div
                  ref={scrollContainerRef}
                  onScroll={checkScrollButtons}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth py-4"
                  style={{
                    paddingLeft: "max(1rem, calc((100vw - 1400px) / 2))",
                    paddingRight: "max(1rem, calc((100vw - 1400px) / 2))",
                  }}
                >
                  {blogPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="snap-start flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[calc(50vw-3rem)] lg:w-[450px]"
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Buttons - Hidden on mobile */}
                {!isMobile && (
                  <AnimatePresence>
                    {isLeftVisible && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-rich-blue-800/80 backdrop-blur-sm hover:bg-rich-blue-700/90 transition-all duration-300 group"
                      >
                        <LuChevronLeft className="h-6 w-6 text-cream-50 transition-transform group-hover:-translate-x-0.5" />
                      </motion.button>
                    )}
                    {isRightVisible && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-rich-blue-800/80 backdrop-blur-sm hover:bg-rich-blue-700/90 transition-all duration-300 group"
                      >
                        <LuChevronRight className="h-6 w-6 text-cream-50 transition-transform group-hover:translate-x-0.5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
