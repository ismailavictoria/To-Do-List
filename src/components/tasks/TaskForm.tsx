import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Priority } from '../../types';

// The information the form collects.
export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

interface TaskFormProps {
  initialData?: TaskFormData; // filled in when editing a task
  submitLabel: string; // e.g. "Add Task" or "Save Changes"
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void; // only shown when editing
}

const emptyForm: TaskFormData = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: '',
};

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

/**
 * One form used for BOTH adding a new task and editing an existing task.
 */
export default function TaskForm({ initialData, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(initialData ?? emptyForm);
  const [error, setError] = useState('');

  // Updates one field of the form, e.g. updateField('title', 'Buy milk')
  function updateField<K extends keyof TaskFormData>(field: K, value: TaskFormData[K]) {
    setForm({ ...form, [field]: value });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault(); // stop the page from reloading

    if (form.title.trim() === '') {
      setError('Please enter a task name.');
      return;
    }

    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
    setError('');

    // When adding (not editing), clear the form for the next task.
    if (!initialData) setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="Task name"
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          className={inputClass}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>

      <textarea
        placeholder="Short description (optional)"
        value={form.description}
        onChange={(e) => updateField('description', e.target.value)}
        rows={2}
        className={`${inputClass} resize-none`}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium text-slate-600">
          Priority
          <select
            value={form.priority}
            onChange={(e) => updateField('priority', e.target.value as Priority)}
            className={`${inputClass} mt-1`}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="text-xs font-medium text-slate-600">
          Due date
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => updateField('dueDate', e.target.value)}
            className={`${inputClass} mt-1`}
          />
        </label>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
