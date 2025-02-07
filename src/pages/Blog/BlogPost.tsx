import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LuClock, LuTag, LuArrowLeft, LuChevronUp } from "react-icons/lu";
import { blogPosts } from "../../data/blogData";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const titleOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleBack = () => {
    if (location.key) {
      // If we have history
      navigate(-1);
    } else {
      // Direct URL access
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rich-blue-900 to-rich-blue-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-cream-50 mb-4">
            Post not found
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cream-50/80 hover:text-cream-50"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-blue-900 to-rich-blue-800">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cream-50/30 to-cream-50/60 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(252,249,240,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(252,249,240,0.1),transparent_60%)]" />

        {/* Dynamic Particles */}
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
        {/* Back Navigation */}
        <motion.div
          className="fixed top-8 left-8 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rich-blue-800/80 backdrop-blur-sm border border-cream-50/10 text-cream-50/80 hover:text-cream-50 hover:bg-rich-blue-700/80 transition-all duration-300 group cursor-pointer"
          >
            <LuArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Insights</span>
          </button>
        </motion.div>
        {/* Hero Section */}
        <div className="relative h-screen max-h-[800px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <img
              src={`/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-rich-blue-900/40 via-rich-blue-900/60 to-rich-blue-900" />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{ opacity: titleOpacity }}
          >
            <div className="max-w-4xl mx-auto text-center relative">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 relative inline-block"
              >
                <span className="absolute inset-0 bg-cream-50/10 blur-xl animate-pulse" />
                <span className="relative inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-cream-50/95 text-rich-blue-900 shadow-lg">
                  {post.category.name}
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold gradient-text mb-8 leading-tight"
              >
                {post.title}
              </motion.h1>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-6 text-cream-50/60"
              >
                <div className="flex items-center gap-2">
                  <LuClock className="h-5 w-5" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuTag className="h-5 w-5" />
                  <span>{post.tags.join(", ")}</span>
                </div>
                <time className="text-sm">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </motion.div>

              {/* Floating Decorative Elements */}
              <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <motion.div
                  animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-cream-50/5 to-transparent blur-2xl"
                />
              </div>
              <div className="absolute -right-20 bottom-1/4 hidden lg:block">
                <motion.div
                  animate={{
                    y: [20, -20, 20],
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-32 h-32 rounded-full bg-gradient-to-tl from-cream-50/5 to-transparent blur-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-cream-50/20 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-cream-50/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
        ;{/* Content Section with restored animations */}
        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-cream-50/90 space-y-6 leading-relaxed">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("#")) {
                  const level = paragraph.match(/^#+/)[0].length;
                  const text = paragraph.replace(/^#+\s/, "");
                  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <HeadingTag className="text-cream-50 font-bold text-2xl mt-12 mb-6">
                        {text}
                      </HeadingTag>
                    </motion.div>
                  );
                }
                if (paragraph.startsWith("-")) {
                  return (
                    <motion.ul
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="list-disc list-inside space-y-2 text-cream-50/90"
                    >
                      {paragraph.split("\n").map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {item.replace("- ", "")}
                        </motion.li>
                      ))}
                    </motion.ul>
                  );
                }
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-cream-50/90"
                  >
                    {paragraph}
                  </motion.p>
                );
              })}
            </div>
          </motion.div>
        </div>
        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-rich-blue-800/80 backdrop-blur-sm border border-cream-50/10 text-cream-50/80 hover:text-cream-50 transition-all duration-300 ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LuChevronUp className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default BlogPost;
