"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Inicio', href: '/', current: true },
  { name: 'Historial de Presupuestos', href: '/historial', current: false },
  { name: 'Perfil', href: '/perfil', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
  const [theme, toggleTheme] = useDarkMode();
  const { user, handleLogout } = useAuth();
  const router = useRouter();

  const handleLogoutClick = () => {
    handleLogout();
    router.push('/login');
  };

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between"> {/* Aumentar la altura */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                
                      <Image src="/logo.webp" alt="Logo" width={350} height={280} className="block h-16 w-auto" /> {/* Aumentar el tamaño del logo */}
                 
                  </Link>
                </div>
                {user && ( // Mostrar solo si el usuario está autenticado
                  <div className="hidden sm:flex sm:ml-auto sm:mr-auto items-center justify-center"> {/* Flex contenedor centrado */}
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}  className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >                        
                            {item.name}
                        
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {user && ( // Mostrar solo si el usuario está autenticado
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-black p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-black text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon className="h-8 w-8 rounded-full text-gray-300" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/"className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                             
                                Inicio
                             
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/historial" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              
                                Historial de Presupuestos
                             
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/perfil" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              
                                Perfil
                           
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogoutClick}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Cerrar Sesión
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
              <button onClick={toggleTheme} className="text-white ml-4">
                {theme === 'light' ? <FaMoon className="h-6 w-6" /> : <FaSun className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {user && ( // Mostrar solo si el usuario está autenticado
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
