// components/login/Logo.tsx
import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <Image src="/logo.webp" alt="Logo" width={100} height={100} />
    </div>
  );
};

export default Logo;
