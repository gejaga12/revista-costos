"use client"
import React, { useState } from 'react';
import { TableData } from '../../types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface TableProps {
  title: string;
  data: TableData[];
}

const Table: React.FC<TableProps> = ({ title, data = [] }) => {  // Proporcionar un valor predeterminado vacío para data
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="overflow-x-auto mb-4">
      <div 
        className="flex items-center justify-between text-lg font-semibold my-2 bg-slate-600 text-white p-2 cursor-pointer rounded-ee-lg rounded-ss-lg"
        onClick={toggleExpand}
      >
        <h2>{title}</h2>
        <span className="ml-2">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isExpanded && data && data.length > 0 && (  // Añadir comprobación para verificar que data no es undefined y tiene elementos
        <table className="min-w-full bg-white dark:bg-gray-800 text-xs">
          <thead>
            <tr>
              <th className="py-2 px-4 text-black dark:text-white text-start">ITEM</th>
              <th className="py-2 px-4 text-black dark:text-white text-start">UNIDAD</th>
              <th className="py-2 px-4 text-black dark:text-white text-start">COSTO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="even:bg-gray-100 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <td className="border px-4 py-2 text-black dark:text-white">{row.item}</td>
                <td className="border px-4 py-2 text-black dark:text-white">{row.unidad}</td>
                <td className="border px-4 py-2 text-black dark:text-white">${row.costo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isExpanded && (!data || data.length === 0) && (
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          No data available
        </div>
      )}
    </div>
  );
};

export default Table;
