import type { Note } from '../../types';
import { formatDateTime } from '../../utils/helpers';

interface NoteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/**
 * Shows all saved notes. Clicking one opens it in the editor.
 */
export default function NoteList({ notes, selectedId, onSelect }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500">
        No notes yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {notes.map((note) => {
        const isSelected = note.id === selectedId;
        return (
          <li key={note.id}>
            <button
              onClick={() => onSelect(note.id)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                isSelected
                  ? 'border-indigo-300 bg-indigo-50'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <p className="truncate font-medium text-slate-800">{note.title || 'Untitled note'}</p>
              <p className="mt-0.5 truncate text-sm text-slate-500">{note.content || 'No content yet'}</p>
              <p className="mt-1 text-xs text-slate-400">Updated {formatDateTime(note.updatedAt)}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
