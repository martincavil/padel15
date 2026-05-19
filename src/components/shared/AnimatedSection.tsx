"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: typeof fadeInUp;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variants = fadeInUp,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible as { transition?: Record<string, unknown> }).transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
