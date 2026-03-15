"use client";

import { portfolioData } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32 mb-12">
      <AnimatedSection id="contact">
        <div className="max-w-2xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col gap-6">
            <h2 className="font-heading font-black text-4xl md:text-6xl text-[var(--text)] tracking-tight">
              {portfolioData.contact.heading}
            </h2>
            <p className="text-[var(--text-muted)] text-[17px] md:text-lg leading-relaxed font-body max-w-lg">
              {portfolioData.contact.subtext}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-4">
            <Link 
              href={portfolioData.contact.linkedinUrl || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-2 text-[15px] font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link 
              href={portfolioData.contact.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-2 text-[15px] font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link 
              href={`mailto:${portfolioData.contact.email}`}
              className="group flex w-fit items-center gap-2 text-[15px] font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <span>Email</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

        </div>
      </AnimatedSection>
    </div>
  );
}
