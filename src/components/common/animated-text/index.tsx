"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedTextProps } from "./animated-text.types";

const AnimatedText = (props: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, props.delay * 1000);

    return () => clearTimeout(timer);
  }, [props.delay]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="inline-block"
    >
      {props.text}
    </motion.span>
  );
};

export default AnimatedText;
