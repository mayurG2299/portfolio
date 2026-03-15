"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id={id}
      className={className}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={prefersReducedMotion ? {} : variants}
    >
      {children}
    </motion.section>
  );
}
