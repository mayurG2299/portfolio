"use client";

import { portfolioData } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Github, ExternalLink, Box } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  print: boolean;
  name: string;
  featured: boolean;
  tags: string | null;
  github: string | null;
  dockerHub: string | null;
  live?: string | null;
  highlight: string;
  bullets: Array<{ print: boolean; text: string }>;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="flex flex-col h-full gap-6 p-8 rounded-xl bg-[var(--bg)] border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group"
    >
      <div className="flex flex-col h-full z-10">
        <div className="flex items-center gap-3 mb-4">
          <h3 className={`font-heading font-black text-[var(--text)] tracking-tight ${project.featured ? "text-3xl md:text-5xl" : "text-2xl"}`}>
            {project.name}
          </h3>
          {project.featured && (
            <span className="px-3 py-1 bg-[var(--bg-card)] text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-widest rounded-sm mt-1 md:mt-2">
              Featured
            </span>
          )}
        </div>
        
        <p className={`text-[var(--text-muted)] font-body font-medium mb-6 ${project.featured ? "text-lg md:text-xl" : "text-[15px]"}`}>
          {project.highlight}
        </p>
        
        <ul className="space-y-3 mb-8">
          {project.bullets.filter(b => b.print).map((bullet, i: number) => (
            <li key={i} className="flex gap-3 text-[var(--text-muted)] font-body text-[14px] leading-relaxed">
              <span className="text-[var(--accent)] mt-[2px] shrink-0">▹</span>
              <span>{bullet.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {project.tags && project.tags.split(' · ').map((tech: string) => (
              <span key={tech} className="font-mono text-[11px] text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-1 rounded-sm">
                {tech.trim()}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-[var(--border)]">
            {project.github && (
              <Link href={project.github} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-[13px] font-mono text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                <Github className="w-4 h-4" />
                <span>GitHub ↗</span>
              </Link>
            )}
            {project.dockerHub && (
              <Link href={project.dockerHub} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-[13px] font-mono text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                <Box className="w-4 h-4" />
                <span>Docker ↗</span>
              </Link>
            )}
            {project.live && (
              <Link href={project.live} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-[13px] font-mono text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Demo ↗</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  if (!portfolioData.projects.print) return null;
  const items = portfolioData.projects.items.filter(p => p.print);
  const featured = items.filter(p => p.featured);
  const regular = items.filter(p => !p.featured);

  return (
    <div className="w-full bg-[var(--bg-card)]">
      <div id="projects" className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <AnimatedSection>
          <SectionLabel number="04" label="PROJECTS" />

          <div className="flex flex-col gap-12">
            {/* Featured Projects */}
            {featured.length > 0 && (
              <div className="flex flex-col gap-12">
                {featured.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}

            {/* Regular Projects Grid */}
            {regular.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regular.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
