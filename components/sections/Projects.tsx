import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
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
      className={`flex flex-col gap-8 p-8 rounded-xl bg-[var(--bg)] border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent)] ${
        project.featured ? "lg:flex-row" : "h-full"
      }`}
    >
      <div className={`flex flex-col justify-between ${project.featured ? "lg:w-2/3" : "w-full h-full"}`}>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-heading font-bold text-[var(--text)]">{project.name}</h3>
            {project.featured && (
              <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold uppercase tracking-wider rounded-full border border-[var(--accent)]/20">
                Featured
              </span>
            )}
          </div>
          <p className="text-lg text-[var(--text)] font-medium mb-2">{project.highlight}</p>
          <p className="text-[var(--text-muted)] leading-relaxed mb-6">{project.bullets.filter(b => b.print).map(b => b.text).join(" ")}</p>
          
          <ul className="space-y-2 mb-8">
            {project.bullets.filter(b => b.print).map((bullet, i: number) => (
              <li key={i} className="flex gap-2 text-[var(--text-muted)] text-sm">
                <span className="text-[var(--accent)]">▹</span>
                {bullet.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags && project.tags.split(' · ').map((tech: string) => (
              <TechBadge key={tech}>{tech.trim()}</TechBadge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.github && (
              <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                <Github className="w-5 h-5" />
                Code
              </Link>
            )}
            {project.dockerHub && (
              <Link href={project.dockerHub} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                <Box className="w-5 h-5" />
                Hub
              </Link>
            )}
            {project.live && (
              <Link href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                <ExternalLink className="w-5 h-5" />
                Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      {project.featured && (
        <div className="lg:w-1/3 flex flex-col justify-center items-center bg-[var(--bg-card)] rounded-lg border border-[var(--border)] p-6 hidden lg:flex">
           <div className="w-full aspect-video rounded border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center overflow-hidden relative">
              <Box className="w-16 h-16 text-[var(--text-muted)] opacity-20" />
           </div>
        </div>
      )}
    </div>
  );
}

export function Projects() {
  if (!portfolioData.projects.print) return null;
  const items = portfolioData.projects.items.filter(p => p.print);
  const featured = items.filter(p => p.featured);
  const regular = items.filter(p => !p.featured);

  return (
    <div className="w-full bg-[var(--bg-card)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <AnimatedSection id="projects">
          <SectionHeading>Selected Projects</SectionHeading>

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
