import type { Note } from '../../types';
import { formatDateTime } from '../../utils/helpers';

interface NoteEditorProps {
  note: Note;
  onChange: (id: string, changes: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

/**
 * Edit a note. There is no Save button: every keystroke calls onChange,
 * which updates the note and saves it to localStorage automatically.
 */
export default function NoteEditor({ note, onChange, onDelete }: NoteEditorProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <p className="text-xs text-slate-500">
          <span className="font-medium text-emerald-600">✓ Saved automatically</span>
          <span className="mx-1.5">·</span>
          Last updated {formatDateTime(note.updatedAt)}
        </p>
        <button
          onClick={() => {
            if (confirm('Delete this note?')) onDelete(note.id);
          }}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>

      <input
        type="text"
        placeholder="Note title"
        value={note.title}
        onChange={(e) => onChange(note.id, { title: e.target.value })}
        className="mt-3 w-full border-none bg-transparent text-xl font-semibold text-slate-800 placeholder-slate-300 outline-none"
      />

      <textarea
        placeholder="Start writing your note..."
        value={note.content}
        onChange={(e) => onChange(note.id, { content: e.target.value })}
        className="mt-2 min-h-[300px] w-full flex-1 resize-none border-none bg-transparent text-sm leading-relaxed text-slate-700 placeholder-slate-300 outline-none"
      />
    </div>
  );
}
