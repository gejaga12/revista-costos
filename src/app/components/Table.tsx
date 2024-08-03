"use client"
import React, { useState, useEffect } from 'react';
import { TableData } from '../../types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface TableProps {
  title: string;
  data: TableData[];
  onSelectItem: (item: TableData) => void;
  allExpanded: boolean;
}

const Table: React.FC<TableProps> = ({ title, data = [], onSelectItem, allExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setIsExpanded(allExpanded);
  }, [allExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="overflow-x-auto mb-4">
      <div 
        className="text-sm flex items-center justify-between font-semibold  bg-gray-200 dark:bg-gray-700 dark:text-white text-black p-2 cursor-pointer rounded-ee-lg rounded-ss-lg"
        onClick={toggleExpand}
      >
        <h2>{title}</h2>
        <span className="ml-2 bg-red-600 dark:bg-slate-400 p-0.5 border-black border text-white">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isExpanded && data.length > 0 && (
        <table className="min-w-full bg-white dark:bg-gray-800 text-xs">
          <thead>
            <tr>
              <th className="py-2 px-4 text-black dark:text-white text-start" style={{ width: '60%' }}>ITEM</th>
              <th className="py-2 px-4 text-black dark:text-white text-start" style={{ width: '20%' }}>UNIDAD</th>
              <th className="py-2 px-4 text-black dark:text-white text-start" style={{ width: '20%' }}>COSTO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="even:bg-gray-100 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <td className="border px-4 py-1 text-black dark:text-white text-xs" style={{ width: '60%' }}>{row.item}</td>
                <td className="border px-4 py-1 text-black dark:text-white text-xs" style={{ width: '20%' }}>{row.unidad}</td>
                <td 
                  className="text-xs border px-4 py-1 text-black dark:text-white cursor-pointer hover:underline"
                  onClick={() => onSelectItem(row)}
                  style={{ width: '20%' }}
                >
                  ${row.costo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isExpanded && data.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          No data available
        </div>
      )}      
    </div>
  );
};

export default Table;
