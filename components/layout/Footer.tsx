import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[var(--text-muted)] text-sm font-mono">
          © {currentYear} {portfolioData.footer.credit}
        </p>
        
        <div className="flex items-center gap-6">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.contact.linkedinUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
