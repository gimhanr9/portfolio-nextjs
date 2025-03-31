"use client";

import { technologies } from "@/data/skills";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TechStack = () => {
  const t = useTranslations("skills");

  return (
    <div className="mt-6 sm:mt-8">
      <h3 className="mb-3 sm:mb-4 text-center text-lg sm:text-xl font-bold">
        {t("techStack")}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {technologies?.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="flex items-center gap-1 rounded-full border bg-background px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm"
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
