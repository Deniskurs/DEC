import React from "react";
import { motion } from "framer-motion";
import type { BlogPost } from "../../types/blog";

interface BlogImageCardProps {
  post: BlogPost;
}

const BlogImageCard: React.FC<BlogImageCardProps> = ({ post }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative"
    >
      <a href={`/blog/${post.slug}`} className="block relative">
        {/* Elegant Border Effect */}
        <div className="absolute -inset-[1px] rounded-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cream-50/10 via-cream-50/20 to-cream-50/10 opacity-0 group-hover:opacity-100 animate-border-flow transition-all duration-700" />
        </div>

        {/* Subtle Glow */}
        <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition-all duration-700 bg-gradient-to-r from-cream-50/30 via-cream-50/5 to-cream-50/30 animate-border-flow" />

        {/* Main Image Container */}
        <div className="relative rounded-2xl overflow-hidden border border-cream-50/10">
          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-20">
            <motion.span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cream-50/95 text-rich-blue-900"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {post.category.name}
            </motion.span>
          </div>

          {/* Image */}
          <div className="relative h-[240px] bg-rich-blue-900/20">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-103"
            />

            {/* Subtle Overlay on Hover */}
            <div className="absolute inset-0 bg-rich-blue-900/0 group-hover:bg-rich-blue-900/20 transition-all duration-700" />

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-rich-blue-900/80 to-transparent" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default BlogImageCard;
