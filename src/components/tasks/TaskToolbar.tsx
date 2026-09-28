import type { TaskFilter } from '../../types';

interface TaskToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const filters: TaskFilter[] = ['All', 'Active', 'Completed'];

/**
 * The search box and the All / Active / Completed filter buttons.
 */
export default function TaskToolbar({ search, onSearchChange, filter, onFilterChange }: TaskToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        placeholder="🔍 Search tasks by name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:max-w-xs"
      />

      <div className="flex rounded-lg bg-slate-100 p-1">
        {filters.map((name) => (
          <button
            key={name}
            onClick={() => onFilterChange(name)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition sm:flex-none ${
              filter === name ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
