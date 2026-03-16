"use client";

import { useRef, useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import { Github, Linkedin, Mail, LucideIcon } from "lucide-react";

export type WordData = {
  rect: DOMRect;
  fontSize: number;
  letterSpacing: string;
  color: string;
  text: string;
};

export let heroNameData: {
  absoluteTop: number;
  word1: WordData;
  word2: WordData | null;
} | null = null;

function SocialIcon({ 
  href, 
  icon: Icon, 
  label, 
  isExternal = true 
}: { 
  href: string; 
  icon: LucideIcon; 
  label: string; 
  isExternal?: boolean 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="p-3 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="w-6 h-6" />
      </Link>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-10 px-3 py-1.5 bg-[var(--text)] text-[var(--bg)] text-xs font-mono rounded whitespace-nowrap pointer-events-none z-50 shadow-xl"
          >
            {label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--text)] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const nameRef = useRef<HTMLHeadingElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  const nameWords = portfolioData.hero.headline.split(" ");
  const line1 = nameWords[0];
  const line2 = nameWords.length > 1 ? nameWords[nameWords.length - 1] : "";

  useEffect(() => {
    const updateRect = () => {
      if (nameRef.current && word1Ref.current) {
        const rect = nameRef.current.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;

        const getCtx = (el: HTMLElement, text: string): WordData => {
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return {
             rect: {
               ...r.toJSON(),
               top: r.top + window.scrollY,
               y: r.y + window.scrollY,
               bottom: r.bottom + window.scrollY
             },
             fontSize: parseFloat(s.fontSize) || 120,
             letterSpacing: s.letterSpacing,
             color: s.color,
             text,
          };
        };

        const w1 = getCtx(word1Ref.current, line1);
        const w2 = word2Ref.current ? getCtx(word2Ref.current, line2) : null;

        heroNameData = { absoluteTop, word1: w1, word2: w2 };
      }
    };
    
    updateRect();
    const t = setTimeout(updateRect, 300); // give layout a moment to settle
    window.addEventListener("resize", updateRect);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateRect);
    };
  }, [line1, line2]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroNameData || heroNameData.absoluteTop <= 0) return;
      const p = Math.max(0, Math.min(1, window.scrollY / heroNameData.absoluteTop));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between px-6 max-w-7xl mx-auto w-full pt-20 pb-12 overflow-hidden">
      {/* Top spacer */}
      <div className="flex-1 flex flex-col justify-center w-full">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-mono text-[12px] text-[var(--text-muted)] uppercase tracking-widest">
            — {portfolioData.title}
          </span>
        </motion.div>

        <motion.h1
          ref={nameRef}
          className="font-heading font-black uppercase tracking-tight text-[var(--text)] leading-[0.85] w-full flex flex-col transition-opacity duration-150"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: progress > 0 ? 0 : 1 }}
        >
          {/* Line 1 - Flush Left */}
          <div className="flex justify-start">
            <motion.span 
              ref={word1Ref}
              variants={prefersReducedMotion ? {} : wordVariants} 
              className="block"
              style={{ fontSize: "clamp(3.5rem, 9vw, 10rem)" }}
            >
              {line1}
            </motion.span>
          </div>
          {/* Line 2 - Indented Right */}
          {line2 && (
            <div className="flex justify-end pr-0 md:pr-12 md:mt-0">
              <motion.span 
                ref={word2Ref}
                variants={prefersReducedMotion ? {} : wordVariants} 
                className="block text-right"
                style={{ fontSize: "clamp(3.5rem, 9vw, 10rem)" }}
              >
                {line2}
              </motion.span>
            </div>
          )}
        </motion.h1>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 md:mt-16 max-w-[560px]"
        >
          <p className="font-body font-normal text-[16px] md:text-[17px] text-[var(--text-muted)] leading-[1.7]">
            {portfolioData.summary.text}
          </p>
        </motion.div>
      </div>

      {/* Bottom section: Links & Scroll Indicator */}
      <motion.div
        className="flex flex-row justify-between items-end w-full pb-8"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <div className="flex flex-row flex-wrap items-center gap-x-12 gap-y-6">
          <Link
            href={portfolioData.hero.cta[0].href}
            className="group inline-flex items-center text-[var(--text)] font-body font-medium text-lg hover:text-[var(--accent)] transition-colors relative pb-1"
          >
            <span className="relative z-10">
              {portfolioData.hero.cta[0].label} ↓
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-transparent group-hover:bg-[var(--accent)] transition-colors duration-300"></span>
          </Link>

          <div className="flex flex-row items-center gap-2">
            <SocialIcon 
              href={portfolioData.contact.linkedinUrl || "#"} 
              icon={Linkedin} 
              label="LinkedIn" 
            />
            <SocialIcon 
              href={portfolioData.contact.github} 
              icon={Github} 
              label="GitHub" 
            />
            <SocialIcon 
              href={`mailto:${portfolioData.contact.email}`} 
              icon={Mail} 
              label="Email" 
              isExternal={false} 
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[var(--border)] relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-[50%] bg-[var(--accent)]"
              animate={prefersReducedMotion ? {} : { top: ["-50%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
