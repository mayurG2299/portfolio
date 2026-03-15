"use client";

import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function About() {
  if (!portfolioData.summary.print && !portfolioData.skills.print) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <AnimatedSection id="about">
        <SectionHeading>About Me</SectionHeading>

        <div className="mb-20">
          {portfolioData.summary.print && (
            <div className="text-lg text-[var(--text-muted)] font-body">
              <p className="leading-relaxed whitespace-pre-line">{portfolioData.summary.text}</p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Skills */}
      {portfolioData.skills.print && (
        <AnimatedSection>
          <h3 className="text-2xl font-heading font-bold text-[var(--text)] mb-8">Technical Arsenals</h3>
          <div className="space-y-8">
            {portfolioData.skills.items.filter(s => s.print).map((categoryGroup, index) => (
              <div key={index}>
                <h4 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 font-body">{categoryGroup.category}</h4>
                <div className="flex flex-wrap gap-3">
                  {categoryGroup.items.split(",").map((skill) => (
                    <TechBadge key={skill.trim()}>{skill.trim()}</TechBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
