"use client"
import React from 'react';
import Image from 'next/image';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';

const Navbar: React.FC = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <nav className="bg-black p-6 dark:bg-black">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.webp" alt="Logo" width={250} height={200} />
          <h1 className="text-white text-2xl ml-4"></h1>
        </div>
        <button onClick={toggleTheme} className="text-white">
          {theme === 'light' ? (
            <FaMoon className="h-6 w-6" />
          ) : (
            <FaSun className="h-6 w-6" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
