"use client"
import React, { useState } from 'react';
import data from '../datos/referencias.json';

const ReferencesTable = () => {
  const { referencias } = data;
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
        Referencias
      </h2>
      {isExpanded && (
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-1 px-2 text-black">Descripción</th>
              <th className="py-1 px-2 text-black">Abreviatura</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(referencias).map(([key, value], index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-black">{key}</td>
                <td className="border px-2 py-1 text-black">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReferencesTable;
