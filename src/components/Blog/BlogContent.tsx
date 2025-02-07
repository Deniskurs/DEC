import React from "react";
import { motion } from "framer-motion";
import { LuClock, LuArrowUpRight } from "react-icons/lu";
import type { BlogPost } from "../../types/blog";

interface BlogContentProps {
  post: BlogPost;
}

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  return (
    <div className="px-2 pt-6">
      <div className="flex items-center gap-2 text-sm text-cream-50/60 mb-3">
        <LuClock className="h-4 w-4" />
        <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
      </div>

      <a href={`/blog/${post.slug}`} className="block group">
        <h3 className="text-xl font-bold text-cream-50 mb-3 line-clamp-2 group-hover:text-cream-50/90 transition-colors">
          {post.title}
        </h3>
      </a>

      <p className="text-cream-50/70 text-sm leading-relaxed line-clamp-2 mb-4">
        {post.excerpt}
      </p>

      <motion.a
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-sm font-medium text-cream-50/90 hover:text-cream-50 group"
        whileHover={{ x: 4 }}
      >
        Read More
        <LuArrowUpRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </motion.a>
    </div>
  );
};

export default BlogContent;
