import { portfolioData } from "@/data/portfolio";


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[var(--text-muted)] text-sm font-mono">
          © {currentYear} {portfolioData.footer.credit}
        </p>
      </div>
    </footer>
  );
}
