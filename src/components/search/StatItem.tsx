interface StatItemProps {
  label: string;
  value: string;
  className?: string;
}

export function StatItem({ label, value, className }: StatItemProps) {
  return (
    <div className={`stat-item ${className ?? ""}`.trim()}>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}
