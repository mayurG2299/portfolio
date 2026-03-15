export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-[var(--bg-card)] border border-[var(--border)] rounded font-mono text-sm text-[var(--text)]">
      {children}
    </span>
  );
}
