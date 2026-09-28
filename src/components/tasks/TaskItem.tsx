import { useState } from 'react';
import type { Priority, Task } from '../../types';
import { formatDueDate, isOverdue } from '../../utils/helpers';
import TaskForm from './TaskForm';
import type { TaskFormData } from './TaskForm';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: TaskFormData) => void;
  onDelete: (id: string) => void;
}

// Colors for each priority badge.
const priorityStyles: Record<Priority, string> = {
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  High: 'bg-red-50 text-red-700 ring-red-200',
};

/**
 * Shows a single task. Clicking "Edit" swaps it for the edit form.
 */
export default function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  // --- Edit mode ---
  if (isEditing) {
    return (
      <li className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
        <TaskForm
          initialData={{
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          }}
          submitLabel="Save Changes"
          onSubmit={(data) => {
            onUpdate(task.id, data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  // --- Normal view ---
  const overdue = !task.completed && isOverdue(task.dueDate);

  return (
    <li
      className={`flex items-start gap-3 rounded-xl border p-4 transition ${
        task.completed ? 'border-slate-200 bg-slate-50' : 'border-slate-200 bg-white shadow-sm'
      }`}
    >
      {/* Checkbox to mark as completed */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 cursor-pointer accent-indigo-600"
        aria-label="Mark task as completed"
      />

      <div className="min-w-0 flex-1">
        <p
          className={`font-medium break-words ${
            task.completed ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}
        >
          {task.title}
        </p>

        {task.description && (
          <p className={`mt-1 text-sm break-words ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
            {task.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span
            className={`rounded-full px-2 py-0.5 font-medium ring-1 ${
              task.completed ? 'bg-slate-100 text-slate-400 ring-slate-200' : priorityStyles[task.priority]
            }`}
          >
            {task.priority}
          </span>

          {task.dueDate && (
            <span className={overdue ? 'font-medium text-red-600' : 'text-slate-500'}>
              📅 {formatDueDate(task.dueDate)}
              {overdue && ' (overdue)'}
            </span>
          )}

          {task.completed && <span className="font-medium text-emerald-600">✓ Completed</span>}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex shrink-0 gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm('Delete this task?')) onDelete(task.id);
          }}
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
