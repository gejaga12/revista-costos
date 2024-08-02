"use client"
import React, { useState } from 'react';
import { TableData } from '../../types';

interface TableProps {
  title: string;
  data: TableData[];
}

const Table: React.FC<TableProps> = ({ title, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="overflow-x-auto mb-4">
      <h2 
        className="text-lg font-semibold my-2 bg-slate-500 text-white p-2 cursor-pointer"
        onClick={toggleExpand}
      >
        {title}
      </h2>
      {isExpanded && (
        <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
          <thead>
            <tr>
              <th className="py-1 px-2 text-black dark:text-white text-start">Item</th>
              <th className="py-1 px-2 text-black dark:text-white text-start">Unidad</th>
              <th className="py-1 px-2 text-black dark:text-white text-start">Costo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-black dark:text-white hover:bg-slate-100">{row.item}</td>
                <td className="border px-2 py-1 text-black dark:text-white hover:bg-slate-100">{row.unidad}</td>
                <td className="border px-2 py-1 text-black dark:text-white hover:bg-slate-100">${row.costo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
