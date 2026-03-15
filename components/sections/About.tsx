"use client";

import { portfolioData } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  if (!portfolioData.summary.print && !portfolioData.skills.print) return null;

  // Split summary at "deployment."
  const summaryText = portfolioData.summary.text;
  const splitIndex = summaryText.indexOf("deployment.") + "deployment.".length;
  const p1 = splitIndex > "deployment.".length - 1 ? summaryText.substring(0, splitIndex).trim() : summaryText;
  const p2 = splitIndex > "deployment.".length - 1 ? summaryText.substring(splitIndex).trim() : "";

  return (
    <div id="about" className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Left Column: Title + Bio (60%) */}
          <div className="w-full md:w-[60%] flex flex-col">
            <SectionLabel number="02" label="ABOUT" />

            
            {portfolioData.summary.print && (
              <div className="font-body text-[17px] text-[var(--text)] leading-[1.8] flex flex-col gap-6">
                <p>{p1}</p>
                {p2 && <p>{p2}</p>}
              </div>
            )}
          </div>

          {/* Right Column: Skills (40%) */}
          {portfolioData.skills.print && (
            <div className="w-full md:w-[40%] flex flex-col gap-6 md:mt-16">
              {portfolioData.skills.items.filter(s => s.print).map((categoryGroup, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <h3 className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
                    {categoryGroup.category}
                  </h3>
                  <p className="font-body text-[15px] text-[var(--text)] leading-relaxed">
                    {categoryGroup.items}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </AnimatedSection>
    </div>
  );
}
