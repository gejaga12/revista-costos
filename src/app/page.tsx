"use client"
import { useRouter } from 'next/navigation';
import ReferencesDashboard from './components/ReferencesDashboard';
import withAuth from './utils/withAuth';

const Home: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen items-center flex">    
      <div className="container mx-auto p-4">
      <div className='flex justify-center items-center'>
      <button
            onClick={() => router.push('/presupuesto')}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mb-5"
          >
            Crear Presupuesto
          </button>
          </div>
        <div className="flex justify-center mb-4">
          <ReferencesDashboard />          
        </div>      
      </div>
    </div>
  );
};

export default withAuth(Home);
