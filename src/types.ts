// Shared "shapes" of the data used across the app.

export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; // stored as "YYYY-MM-DD" (or "" if no date)
  completed: boolean;
  createdAt: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number; // timestamp in milliseconds
}

export type TaskFilter = 'All' | 'Active' | 'Completed';
