import React from "react";
import { motion } from "motion/react";

type BlogLinkProps = {
  url: string;
  title: string;
};

const BlogLink: React.FC<BlogLinkProps> = ({ url, title }) => {
  if (!url || !title) return <p>Invalid blog data</p>;

  return (
    <motion.div 
      className="p-4 bg-gray-100 rounded-2xl shadow-md w-full max-w-md mb-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{url}</p>
      </a>
    </motion.div>
    
  );
};

export default BlogLink;