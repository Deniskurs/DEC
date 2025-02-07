import React from "react";
import type { BlogPost } from "../../types/blog";
import BlogImageCard from "./BlogImageCard";
import BlogContent from "./BlogContent";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="space-y-2">
      <BlogImageCard post={post} />
      <BlogContent post={post} />
    </div>
  );
};

export default BlogCard;
