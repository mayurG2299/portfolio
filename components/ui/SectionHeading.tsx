export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text)]">
        {children}
      </h2>
      <div className="w-16 h-1 bg-[var(--accent)] mt-4" />
    </div>
  );
}
