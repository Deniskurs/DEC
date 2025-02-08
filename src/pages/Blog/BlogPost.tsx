import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  LuClock,
  LuTag,
  LuArrowLeft,
  LuChevronUp,
  LuChevronsUp,
} from "react-icons/lu";
import { blogPosts } from "../../data/blogData";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Markdown components with staggered animations
  // Counter ref for staggered animations
  const elementIndexRef = React.useRef(0);

  useEffect(() => {
    elementIndexRef.current = 0;
  }, [post?.content]);

  // Markdown components with faster, scroll-based animations
  const markdownComponents = React.useMemo(
    () => ({
      h1: ({ children }) => {
        const index = elementIndexRef.current++;
        return (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-cream-50 font-bold text-5xl lg:text-6xl mt-16 mb-8 leading-tight gradient-text"
          >
            {children}
          </motion.h1>
        );
      },
      h2: ({ children }) => {
        const index = elementIndexRef.current++;
        return (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-cream-50 font-bold text-4xl lg:text-5xl mt-16 mb-8 leading-tight gradient-text"
          >
            {children}
          </motion.h2>
        );
      },
      h3: ({ children }) => {
        const index = elementIndexRef.current++;
        return (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-cream-50 font-bold text-3xl lg:text-4xl mt-12 mb-6 leading-tight"
          >
            {children}
          </motion.h3>
        );
      },
      p: ({ children }) => {
        const index = elementIndexRef.current++;
        return (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-cream-50/90 mb-6 leading-relaxed"
          >
            {children}
          </motion.p>
        );
      },
      ul: ({ children }) => {
        const index = elementIndexRef.current++;
        return (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="list-disc list-inside space-y-2 text-cream-50/90 mb-6"
          >
            {children}
          </motion.ul>
        );
      },
      li: ({ children }) => <li className="text-cream-50/90">{children}</li>,
    }),
    []
  );

  const MobileScrollIndicator = () => (
    <motion.div
      className="flex flex-col items-center gap-2 text-cream-50/60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        <LuChevronsUp className="h-6 w-6" />
      </motion.div>
      <span className="text-sm">Swipe up to read</span>
    </motion.div>
  );

  const DesktopScrollIndicator = () => (
    <motion.div
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
  );

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
          className="fixed bottom-5 left-8 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rich-blue-800/80 backdrop-blur-sm border border-cream-50/10 text-cream-50/80 hover:text-cream-50 hover:bg-rich-blue-700/80 transition-all duration-300 group cursor-pointer"
          >
            <LuArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
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
            </div>
          </motion.div>

          {/* Conditional Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            {isMobile ? <MobileScrollIndicator /> : <DesktopScrollIndicator />}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <ReactMarkdown components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
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
