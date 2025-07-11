"use client";

import { technologies } from "@/data/skills";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import TechIcon from "../tech-icons";

const TechStack = () => {
  const t = useTranslations("skills");

  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <h3 className="mb-2 sm:mb-3 md:mb-4 text-center text-base md:text-lg font-bold">
        {t("techStack")}
      </h3>
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="flex items-center gap-1 rounded-full border bg-background px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm"
          >
            <TechIcon name={tech.icon} className="h-4 w-4" />
            <span>{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
