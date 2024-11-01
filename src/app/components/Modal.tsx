"use client"
import React, { useState, useEffect } from 'react';
import { TableData } from '../../types';
import { FaTimes, FaTrash, FaCalculator } from 'react-icons/fa';

interface ModalProps {
  selectedItems: TableData[];
  onRemoveItem: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({ selectedItems, onRemoveItem }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const totalCost = selectedItems.reduce((sum, item) => sum + item.costo, 0);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setIsMinimized(false); // Reset minimization when showing the modal
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    if (selectedItems.length > 0) {
      setIsAnimated(true);
      const timer = setTimeout(() => setIsAnimated(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedItems]);

  return (
    <>
      {(!isVisible || isMinimized) && (
        <button
          onClick={toggleVisibility}
          className={`fixed bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-transform duration-300 ${isAnimated ? 'animate-ping-once' : ''}`}
        >
          <FaCalculator />
        </button>
      )}
      <div className={`fixed bottom-2 right-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-0'} ${isMinimized ? 'w-36' : 'w-auto'}`}>
        <div className="flex justify-end items-center">
          {isVisible && !isMinimized && (
            <button
              onClick={toggleVisibility}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FaTimes />
            </button>            
          )}
        </div>
        {!isMinimized && (
          <>
            <ul className='border-b-[1px] border-gray-500 pb-2'>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Items Seleccionados</h2>
              {selectedItems.length === 0 ? (
                <li className="text-gray-700 dark:text-gray-300 text-xs font-extralight">
                  Seleccione items para calcular
                </li>
              ) : (
                selectedItems.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-xs font-extralight">
                    {item.item}: ${item.costo}
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))
              )}
            </ul>
            {selectedItems.length > 0 && (
              <div className="mt-2 font-bold text-gray-900 dark:text-white text-xs">
                Total: ${totalCost}
              </div>
            )}
          </>
        )}     
      </div>
    </>
  );
};

export default Modal;
