// ProfileDetails.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileDetails: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="mt-4 text-gray-600 dark:text-gray-400">No se encontró información del usuario.</p>;
  }

  return (
    <div className="mt-6">
    <dl className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">        
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Nombre de Usuario</dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.username}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Correo Electrónico</dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.email || 'No proporcionado'}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Teléfono</dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
          {user.phone || 'No proporcionado'}
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Dirección</dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
          {user.address || 'No proporcionado'}
        </dd>
      </div>
    </dl>
    
  </div>
  );
};

export default ProfileDetails;