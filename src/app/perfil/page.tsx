"use client";
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileDetails from '../components/perfil/ProfileDetails';
import { BriefcaseIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const ProfilePage: React.FC = () => {

    const { user } = useAuth(); 

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 items-center flex">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-shrink-0 mr-2">
                    <Image
                        src="/foto-perfil.png"
                        alt="Profile"
                        width={150}
                        height={150}
                        className="rounded-lg object-cover"
                    />
                    <div className="absolute bottom-1 left-1 text-black text-[10px] font-semibold py-0.5 px-1 rounded">
                    {/* <StarIcon className="h-5 w-5 text-yellow-400 " /> */}
                    </div>
                </div>
                <div className="flex-grow">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Perfil de Usuario</h1> 

                    {user ? (
                        <ProfileDetails />
                    ) : (
                        <p className="mt-4 text-gray-600 dark:text-gray-400">No se encontró información del usuario.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
