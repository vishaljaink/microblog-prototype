'use client';

import { Moon, Sun, PenSquare } from 'lucide-react';
import { useTheme } from '../store/useTheme';
import { useFeed } from '../store/useFeed';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { openComposer } = useFeed();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Microblog
        </h1>
        
        <div className="flex items-center gap-3">
          <button
            onClick={openComposer}
            className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
          >
            <PenSquare size={16} />
            Post
          </button>
          
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
