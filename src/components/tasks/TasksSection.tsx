import { useState } from 'react';
import type { Task, TaskFilter } from '../../types';
import { createId } from '../../utils/helpers';
import TaskForm from './TaskForm';
import type { TaskFormData } from './TaskForm';
import TaskItem from './TaskItem';
import TaskToolbar from './TaskToolbar';

interface TasksSectionProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export default function TasksSection({ tasks, setTasks }: TasksSectionProps) {
  const [filter, setFilter] = useState<TaskFilter>('All');
  const [search, setSearch] = useState('');

  // ---------- Actions ----------

  function addTask(data: TaskFormData) {
    const newTask: Task = {
      id: createId(),
      ...data,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]); // newest task goes on top
  }

  function toggleTask(id: string) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  function updateTask(id: string, data: TaskFormData) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...data } : task)));
  }

  function deleteTask(id: string) {
    // Keep every task EXCEPT the one being deleted.
    // Because tasks are saved automatically, it is also removed from storage.
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // ---------- Filter + search ----------

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Active' && task.completed) return false;
    if (filter === 'Completed' && !task.completed) return false;
    return task.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* Left: add a new task */}
      <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Add a Task</h2>
        <TaskForm submitLabel="Add Task" onSubmit={addTask} />
      </section>

      {/* Right: the list of tasks */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">My Tasks</h2>

        <TaskToolbar search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} />

        {visibleTasks.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
            {tasks.length === 0 ? 'No tasks yet. Add your first task!' : 'No tasks match your search or filter.'}
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
