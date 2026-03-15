"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { heroNameData } from "@/components/sections/Hero";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [active, setActive] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cloneStyle, setCloneStyle] = useState<React.CSSProperties | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check initial theme
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    setIsDark(theme === "dark");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Handle floating clone interpolation
      if (heroNameData && heroNameData.absoluteTop > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / heroNameData.absoluteTop));
        setProgress(p);

        if (p > 0 && p < 1) {
          const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
          const fromSize = heroNameData.fontSize;
          const toSize = 15;
          const fromTop = heroNameData.absoluteTop;
          const toTop = 27; // Center slightly within 80px navbar height
          const fromLeft = heroNameData.rect.left;
          const toLeft = 24; // px-6 is 24px

          setCloneStyle({
            position: 'fixed',
            top: lerp(fromTop - window.scrollY, toTop, p), 
            left: lerp(fromLeft, toLeft, p),
            fontSize: lerp(fromSize * 0.8, toSize, p),
            opacity: p > 0.1 ? 1 : 0,
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            color: 'var(--text)',
            pointerEvents: 'none',
            zIndex: 60,
            whiteSpace: 'nowrap',
            transition: 'none',
          });
        }
      } else {
        setProgress(0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Trigger when section is in top 30% of viewport
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio_theme", newTheme);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="min-w-[200px] flex items-center">
          <AnimatePresence>
            {isScrolled && progress === 1 && (
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col"
              >
                <span className="font-heading font-bold text-[15px] text-[var(--text)]">
                  {portfolioData.name}
                </span>
                <span className="font-mono text-[11px] text-[var(--text-muted)] mt-[2px]">
                  {portfolioData.title} &middot; 6+ yrs
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.substring(1);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--accent)] ${
                        !prefersReducedMotion ? "transition-all duration-300" : ""
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="w-[1px] h-6 bg-[var(--border)]" />

          <button
            onClick={toggleTheme}
            className="text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="text-[var(--text)]">
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--text)]">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border)] px-6 py-4 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide ${active === item.href.substring(1) ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Floating identity clone */}
      {progress > 0 && progress < 1 && cloneStyle && (
        <div style={cloneStyle} className="leading-none uppercase tracking-tight">
          {portfolioData.name}
        </div>
      )}
    </nav>
  );
}
