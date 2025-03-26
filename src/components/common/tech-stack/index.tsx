"use client";

import { technologies } from "@/data/skills";
import { motion } from "framer-motion";

const TechStack = () => {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-center text-xl font-bold">Tech Stack</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-center gap-1 rounded-full border bg-background px-3 py-1 text-sm"
          >
            <span>{tech.icon}</span>
            <span>{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
