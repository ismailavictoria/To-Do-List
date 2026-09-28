import { useEffect, useState } from 'react';

/**
 * Works just like useState, but also saves the value in the browser's
 * localStorage. This means the data is still there after a page refresh.
 *
 * Every time the value changes, it is saved again automatically.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. When the app starts, try to load the saved value.
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // 2. Whenever the value changes, save it to localStorage.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
