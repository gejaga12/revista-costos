"use client"
import React, { useState } from 'react';

const Table = ({ title, data }) => {
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
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-1 px-2 text-black">Item</th>
              <th className="py-1 px-2 text-black">Unidad</th>
              <th className="py-1 px-2 text-black">Costo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-black">{row.item}</td>
                <td className="border px-2 py-1 text-black">{row.unidad}</td>
                <td className="border px-2 py-1 text-black">{row.costo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
