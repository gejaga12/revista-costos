// ProfilePage.tsx
"use client";
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileDetails from '../components/perfil/ProfileDetails';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    const PresupuestosCard: React.FC = () => {
        return (
            <div className="bg-gray-200 text-white rounded-lg shadow-lg p-4 space-y-1 flex flex-col items-center w-full sm:w-auto">
                <h2 className="text-sm text-black font-bold">Presupuestos</h2>
                <p className="text-xs text-white bg-black rounded-lg p-1 text-center w-10">10</p>
            </div>
        );
    };

    const MembresiaCard: React.FC = () => {
        return (
            <div className="bg-gray-200 text-white rounded-lg shadow-lg p-4 space-y-1 flex flex-col items-center w-full sm:w-auto">
                <h2 className="text-sm text-black font-bold">Membresía</h2>
                <p className="text-xs text-yellow-600 bg-black rounded-lg p-1 px-2 text-center">Premium</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <UserCircleIcon className="h-16 w-16 text-gray-500 dark:text-gray-300 mr-2" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Perfil de Usuario</h1>
                    </div>
                    <div className="flex flex-row sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 space-x-3">
                        <PresupuestosCard />
                        <MembresiaCard />
                    </div>
                </div>
                {user ? (
                    <ProfileDetails />
                ) : (
                    <p className="mt-4 text-gray-600 dark:text-gray-400">No se encontró información del usuario.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;