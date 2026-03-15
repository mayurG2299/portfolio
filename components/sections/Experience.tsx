"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const experienceItems = portfolioData.experience.items.filter(exp => exp.print);

  if (experienceItems.length === 0) return null;

  return (
    <div id="experience" className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32">
      <AnimatedSection>
        <SectionLabel number="03" label="EXPERIENCE" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left Column: Tabs */}
          <div className="flex md:flex-col overflow-x-auto no-scrollbar border-b md:border-b-0 md:border-l border-[var(--border)] md:w-[220px] shrink-0">
            {experienceItems.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-shrink-0 text-left px-4 py-3 md:pl-6 text-[14px] font-mono whitespace-nowrap md:whitespace-normal transition-colors border-b-2 md:border-b-0 md:border-l-2 -mb-[1px] md:-mb-0 md:-ml-[1px] ${
                  activeTab === idx 
                    ? "text-[var(--accent)] border-[var(--accent)]" 
                    : "text-[var(--text-muted)] border-transparent hover:text-[var(--text)] hover:bg-[var(--bg-card-hover)]"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-12">
                  {experienceItems[activeTab].roles.filter(role => role.print).map((role, rIdx) => (
                    <div key={rIdx}>
                      <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-6 gap-2">
                        <h3 className="text-xl font-heading font-bold text-[var(--text)]">{role.title}</h3>
                        <span className="text-[13px] font-mono text-[var(--text-muted)] mt-1 lg:mt-0">
                          {role.dates}
                        </span>
                      </div>

                      <ul className="space-y-4">
                        {role.bullets.filter(bullet => bullet.print).map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-4 text-[var(--text-muted)] font-body text-[15px] leading-[1.8]">
                            <span className="text-[var(--accent)] shrink-0 mt-[2px]">▹</span>
                            <span>{bullet.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
