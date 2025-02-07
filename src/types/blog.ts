export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  category: BlogCategory;
  tags: string[];
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
}
