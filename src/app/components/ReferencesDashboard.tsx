"use client"
import React from 'react';
import { FaTools, FaCubes, FaRuler, FaMoneyBillWave, FaTruck } from 'react-icons/fa';
import data from '../datos/referencias.json';
import { ReferenceData } from '../../types';

const iconMap: { [key: string]: JSX.Element } = {
  "Mano de obra de colocación o instalación": <FaTools />,
  "Material / Materiales / Insumos": <FaCubes />,
  "Unidad / Unitario": <FaRuler />,
  "Global / Total": <FaMoneyBillWave />,
  "Dolar": <FaMoneyBillWave />,
  "Metro cuadrado": <FaRuler />,
  "Metro cúbico": <FaRuler />,
  "Metro Lineal": <FaRuler />,
  "Litro": <FaTruck />,
  "Viaje o transporte": <FaTruck />
};

const ReferencesDashboard: React.FC = () => {
  const { referencias }: ReferenceData = data;

  return (
    <div className="overflow-x-auto mb-4">
      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Referencias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {Object.entries(referencias).map(([key, value], index) => (
            <div key={index} className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <div className="text-2xl text-blue-500 dark:text-blue-300">
                {iconMap[key]}
              </div>
              <div className="ml-4">
                <div className="text-[10px] font-medium text-gray-900 dark:text-white">{key}</div>
                <div className="text-[8px] text-gray-500 dark:text-gray-400">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferencesDashboard;
