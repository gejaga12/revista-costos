import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PhoneIcon, UserIcon, EnvelopeIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const ProfileDetails: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="mt-4 text-gray-600 dark:text-gray-400">No se encontró información del usuario.</p>;
  }

  return (
    <div className="mt-2">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="sm:col-span-1 flex items-center bg-gray-100 p-2 rounded-lg shadow-md">
          <UserIcon className="h-5 w-5 text-red-600 border-red-600 dark:text-gray-300 mr-2" />
          <div className='dark:bg-gray-700 border-gray-500 border-s-2 ps-2'>
            <dt className="text-xs font-medium text-gray-500 dark:text-gray-300">Nombre de Usuario</dt>
            <dd className="mt-1 text-xs text-gray-900 dark:text-white">{user.username}</dd>
          </div>
        </div>

        <div className="sm:col-span-1 flex items-center bg-gray-100 p-2 rounded-lg shadow-md">
          <EnvelopeIcon className="h-5 w-5 text-red-600 border-red-600 dark:text-gray-300 mr-2" />
          <div className='dark:bg-gray-700 border-gray-500 border-s-2 ps-2'>
            <dt className="text-xs font-medium text-gray-500 dark:text-gray-300">Correo Electrónico</dt>
            <dd className="mt-1 text-xs text-gray-900 dark:text-white">{user.email}</dd>
          </div>
        </div>


        <div className="sm:col-span-1 flex items-center bg-gray-100 p-2 rounded-lg shadow-md">
          <PhoneIcon className="h-5 w-5 text-red-600 border-red-600 dark:text-gray-300 mr-2" />
          <div className='dark:bg-gray-700 border-gray-500 border-s-2 ps-2'>
            <dt className="text-xs font-medium text-gray-500 dark:text-gray-300">Teléfono</dt>
            <dd className="mt-1 text-xs text-gray-900 dark:text-white">{user.phone || "123456789"}</dd>
          </div>
        </div>

        <div className="sm:col-span-1 flex items-center bg-gray-100 p-2 rounded-lg shadow-md">
          <MapPinIcon className="h-5 w-5 text-red-600 border-red-600 dark:text-gray-300 mr-2" />
          <div className='dark:bg-gray-700 border-gray-500 border-s-2 ps-2'>
            <dt className="text-xs font-medium text-gray-500 dark:text-gray-300">Dirección</dt>
            <dd className="mt-1 text-xs text-gray-900 dark:text-white">{user.address || "Av. Avellaneda 1547"}</dd>
          </div>
        </div>

        <div className="sm:col-span-1 flex items-center bg-gray-100 p-2 rounded-lg shadow-md">
          <MapPinIcon className="h-5 w-5 text-red-600 border-red-600 dark:text-gray-300 mr-2" />
          <div className='dark:bg-gray-700 border-gray-500 border-s-2 ps-2'>
            <dt className="text-xs font-medium text-gray-500 dark:text-gray-300">RUT</dt>
            <dd className="mt-1 text-xs text-gray-900 dark:text-white">3772454856</dd>
          </div>
        </div>

        <div className="sm:col-span-1 flex items-center bg-gray-100 p-2 rounded-lg shadow-md">
          <BuildingOffice2Icon className="h-5 w-5 text-red-600 border-red-600 dark:text-gray-300 mr-2" />
          <div className='dark:bg-gray-700 border-gray-500 border-s-2 ps-2'>
            <dt className="text-xs font-medium text-gray-500 dark:text-gray-300">Empresa</dt>
            <dd className="mt-1 text-xs text-gray-900 dark:text-white">HOGAR SERMAN SRL</dd>
          </div>
        </div>



      </dl>
    </div>
  );
};

export default ProfileDetails;
