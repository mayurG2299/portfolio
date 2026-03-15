import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Experience() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <AnimatedSection id="experience">
        <SectionHeading>Experience</SectionHeading>

        <div className="max-w-3xl ml-4 md:ml-8 border-l border-[var(--border)]">
          {portfolioData.experience.items.filter(exp => exp.print).map((exp, expIdx) => (
            <div key={expIdx} className="relative pl-8 pb-16 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] bg-[var(--accent)] rounded-full outline outline-4 outline-[var(--bg)]" />

              <h3 className="text-2xl font-heading font-bold text-[var(--text)] mb-1">
                {exp.company}
              </h3>
              <p className="text-[var(--text-muted)] text-sm mb-8">{exp.location}</p>

              <div className="space-y-10">
                {exp.roles.filter(role => role.print).map((role, rIdx) => (
                  <div key={rIdx}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <h4 className="text-lg font-bold text-[var(--text)]">{role.title}</h4>
                      <span className="text-sm font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-1 rounded inline-block w-fit">
                        {role.dates}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {role.bullets.filter(bullet => bullet.print).map((highlight, hIdx) => (
                        <li key={hIdx} className="flex gap-3 text-[var(--text-muted)]">
                          <span className="text-[var(--accent)] shrink-0 mt-1">▹</span>
                          <span className="leading-relaxed">{highlight.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
