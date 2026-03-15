"use client";

import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const nameWords = portfolioData.hero.headline.split(" ");

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-20">
      <div className="max-w-3xl">
        <motion.h1
          className="text-5xl md:text-7xl font-heading font-bold text-[var(--text)] leading-tight mb-4"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
        >
          {nameWords.map((word, i) => (
            <motion.span key={i} variants={prefersReducedMotion ? {} : wordVariants} className="inline-block mr-3 md:mr-4">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl text-[var(--text-muted)] font-body mb-6">
            {portfolioData.title}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text)] font-body mb-10 max-w-2xl leading-relaxed">
            {portfolioData.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {portfolioData.hero.cta.map((cta, i) => (
              <Link
                key={i}
                href={cta.href}
                className={`inline-flex items-center justify-center px-8 py-3 font-medium rounded-sm transition-colors ${
                  cta.primary
                    ? "bg-[var(--accent)] text-white hover:bg-amber-600"
                    : "border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-card-hover)]"
                }`}
                target={cta.href.startsWith("http") || cta.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={cta.href.startsWith("http") || cta.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[var(--accent)] relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[50%] bg-[var(--accent)]"
            animate={prefersReducedMotion ? {} : { top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
