import { useState } from 'react';
import type { Note } from '../../types';
import { createId } from '../../utils/helpers';
import NoteEditor from './NoteEditor';
import NoteList from './NoteList';

interface NotesSectionProps {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

export default function NotesSection({ notes, setNotes }: NotesSectionProps) {
  // Which note is open in the editor (starts with the first note, if any).
  const [selectedId, setSelectedId] = useState<string | null>(notes[0]?.id ?? null);

  // Show the most recently updated notes first.
  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  const selectedNote = notes.find((note) => note.id === selectedId);

  // ---------- Actions ----------

  function createNote() {
    const newNote: Note = { id: createId(), title: '', content: '', updatedAt: Date.now() };
    setNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
  }

  // Called on every keystroke. Updating the notes list saves it automatically.
  function updateNote(id: string, changes: Partial<Note>) {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...changes, updatedAt: Date.now() } : note)));
  }

  function deleteNote(id: string) {
    const remaining = notes.filter((note) => note.id !== id);
    setNotes(remaining); // also removes it from storage
    setSelectedId(remaining[0]?.id ?? null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Left: list of notes */}
      <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">My Notes</h2>
          <button
            onClick={createNote}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + New Note
          </button>
        </div>
        <NoteList notes={sortedNotes} selectedId={selectedId} onSelect={setSelectedId} />
      </section>

      {/* Right: the editor */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {selectedNote ? (
          <NoteEditor note={selectedNote} onChange={updateNote} onDelete={deleteNote} />
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-sm text-slate-500">
            <p className="text-3xl">📝</p>
            <p className="mt-2">Select a note or create a new one to start writing.</p>
          </div>
        )}
      </section>
    </div>
  );
}
