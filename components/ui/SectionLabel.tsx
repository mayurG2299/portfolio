export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <h2 className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest mb-12 md:mb-16">
      {number} / {label}
    </h2>
  );
}
