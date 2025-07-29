'use client';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

interface Props {
  open: boolean;
}

export const DarkModeToggle = ({ open }: Props) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Carrega o tema salvo ao montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Alterna o tema
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center gap-3 transition-all duration-300 px-2 py-2 rounded-lg w-full
        text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400
        ${open ? '' : 'justify-center'}
      `}
    >
      <span className="relative flex items-center justify-center">
        {!open && (
          <span className="absolute w-12 h-12 rounded-full bg-blue-100 -z-10" />
        )}
        {theme === 'dark' ? <HiSun size={24} /> : <HiMoon size={24} />}
      </span>
      <span className={`${open ? 'transition-all duration-300' : 'sr-only'}`}>
        {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
      </span>
    </button>
  );
};
