"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './../context/AuthContext';
import LoginForm from './../components/login/LoginForm';

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen relative bg-white dark:bg-black">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="/fondo1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative w-full max-w-sm p-6 border rounded-lg shadow bg-black bg-opacity-50 backdrop-filter backdrop-blur-base">
        <div className="flex justify-center mb-4">
          {/* <Image src="/logo.webp" alt="Logo" width={100} height={100} /> */}
        </div>
        <LoginForm />
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-700">
        VERSION 0.0.1
      </div>
    </div>
  );
};

export default LoginPage;
