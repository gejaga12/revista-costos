// components/Navbar.js
import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex items-center">
        <Image src="/logo.webp" alt="Logo" width={150} height={150} />
        <h1 className="text-white text-2xl ml-4">Construction Costs</h1>
      </div>
    </nav>
  );
};

export default Navbar;
