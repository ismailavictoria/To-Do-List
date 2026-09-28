import { useState } from 'react';
import NotesSection from './components/notes/NotesSection';
import StatCard from './components/StatCard';
import TasksSection from './components/tasks/TasksSection';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Note, Task } from './types';

type Tab = 'tasks' | 'notes';

export default function App() {
  // Tasks and notes are stored in localStorage, so they survive a refresh.
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-app-tasks', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('todo-app-notes', []);

  // Which section is currently shown.
  const [activeTab, setActiveTab] = useState<Tab>('tasks');

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white">
              ✓
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">My Dashboard</h1>
              <p className="text-xs text-slate-500">Tasks & notes, saved in your browser</p>
            </div>
          </div>

          {/* Tabs to switch between Tasks and Notes */}
          <nav className="flex rounded-lg bg-slate-100 p-1">
            <TabButton label="✅ Tasks" isActive={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
            <TabButton label="📝 Notes" isActive={activeTab === 'notes'} onClick={() => setActiveTab('notes')} />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {/* Quick overview */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total tasks" value={tasks.length} />
          <StatCard label="Active" value={activeCount} color="text-indigo-600" />
          <StatCard label="Completed" value={completedCount} color="text-emerald-600" />
          <StatCard label="Notes" value={notes.length} color="text-amber-600" />
        </div>

        {/* The selected section */}
        {activeTab === 'tasks' ? (
          <TasksSection tasks={tasks} setTasks={setTasks} />
        ) : (
          <NotesSection notes={notes} setNotes={setNotes} />
        )}
      </main>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-md px-5 py-2 text-sm font-medium transition sm:flex-none ${
        isActive ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
      }`}
    >
      {label}
    </button>
  );
}
