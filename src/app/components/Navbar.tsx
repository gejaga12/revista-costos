"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [theme, toggleTheme] = useDarkMode();
  const { user, handleLogout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    handleLogout();
    router.push('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black p-6 dark:bg-black">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/">
            <Image src="/logo.webp" alt="Logo" width={250} height={200} />
            <h1 className="text-white text-2xl ml-4"></h1>
          </a>
        </div>
        <div className="flex items-center">
          {user && (
            <div className="relative text-white mr-4 border-white border rounded-lg p-2 hover:bg-gray-600">
              <button onClick={toggleMenu} className="flex items-center focus:outline-none">
                <FaUser className="mr-2" />
                <span>{user.username}</span>
              </button>
              {isMenuOpen && (
              <>
                <div className="absolute right-0 mt-3 w-auto bg-gray-800 rounded-md shadow-lg py-2 z-20">
                  <button
                    onClick={handleLogoutClick}
                    className="block px-4 py-2 text-xs text-white hover:bg-gray-700 w-full text-center"
                  >
                    Cerrar Sesión
                  </button>
                </div>
                <div className="absolute right-0 mt-3 w-auto bg-gray-800 rounded-md shadow-lg py-2 z-20">
                <button
                  onClick={handleLogoutClick}
                  className="block px-4 py-2 text-xs text-white hover:bg-gray-700 w-full text-center"
                >
                  Cerrar Sesión
                </button>
              </div>
              </>
              )}
            </div>
          )}
          <button onClick={toggleTheme} className="text-white ml-4">
            {theme === 'light' ? (
              <FaMoon className="h-6 w-6" />
            ) : (
              <FaSun className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
