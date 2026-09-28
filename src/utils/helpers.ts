// Small helper functions used in several places.

/** Creates a unique id for a new task or note. */
export function createId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Turns "2025-03-14" into something friendly like "Mar 14, 2025". */
export function formatDueDate(date: string): string {
  if (!date) return '';
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Returns true if the due date is before today. */
export function isOverdue(date: string): boolean {
  if (!date) return false;
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
  return date < today;
}

/** Turns a timestamp into something like "Mar 14, 2025, 3:45 PM". */
export function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
