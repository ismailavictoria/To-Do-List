interface StatCardProps {
  label: string;
  value: number;
  color?: string; // Tailwind text color class for the number
}

/** A small box showing a number, e.g. "Completed: 3". */
export default function StatCard({ label, value, color = 'text-slate-800' }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
