
"use client"
import React, { useState } from 'react';
import { getLogin } from '../../utils/getLogin';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { handleLoginSuccess } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await getLogin(username, password);
      handleLoginSuccess(data.user);
      router.push('/'); // Redirige al usuario a la página de dashboard
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-black p-6 rounded-lg shadow-md">
    {error && <p className="text-red-500 text-sm">{error}</p>}
    <h1 className='font-bold text-2xl text-center text-white'>Iniciar Sesión</h1>
    <div>
      <label htmlFor="username" className="block text-gray-300 mb-2">Usuario</label>
      <div className="flex items-center border border-gray-600 rounded bg-gray-900">
        <FaUser className="text-gray-500 mx-3" />
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
      </div>
    </div>
    <div>
      <label htmlFor="password" className="block text-gray-300 mb-2">Contraseña</label>
      <div className="flex items-center border border-gray-600 rounded bg-gray-900">
        <FaLock className="text-gray-500 mx-3" />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
      </div>
    </div>
    <button type="submit" className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white font-semibold flex items-center justify-center">
      <FaSignInAlt className="mr-2" />
      Ingresar
    </button>
    <div className="flex justify-between text-gray-400 text-sm mt-4">
      <a href="/recuperar" className="hover:underline">Recuperar Contraseña</a>
      <a href="/registrarse" className="hover:underline">Registrarse</a>
    </div>
  </form>
  );
};

export default LoginForm;
