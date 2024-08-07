// pages/components/SelectedItemsList.tsx
import React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import { TableData } from '../../../types';

interface SelectedItemsListProps {
    selectedItems: (TableData & { cantidad: number })[];
    isItemsExpanded: boolean;
    toggleItemsExpand: () => void;
    handleRemoveItem: (index: number) => void;
}

const SelectedItemsList: React.FC<SelectedItemsListProps> = ({ selectedItems, isItemsExpanded, toggleItemsExpand, handleRemoveItem }) => {
    return (
        <div className="mb-4 mt-4">
            <div onClick={toggleItemsExpand} className="mb-4 flex justify-between items-center dark:bg-gray-600 bg-gray-300 p-1 cursor-pointer rounded-ss-lg rounded-se-lg">
                <div className="flex items-center">
                    <IoIosConstruct className="text-gray-900  dark:text-white mx-2" />
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mr-2">Items Seleccionados</h2>
                </div>
                <button
                    type="button"
                    onClick={toggleItemsExpand}
                    className="ml-2 bg-red-600 dark:bg-slate-400 p-0.5 text-white rounded-lg"
                >
                    {isItemsExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {isItemsExpanded && (
                selectedItems.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No hay items seleccionados.</p>
                ) : (
                    <ul>
                        {selectedItems.map((item, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-700 mb-2 rounded">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm text-black dark:text-white">{item.item}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">${item.costo}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Unidad: {item.unidad}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Cantidad de {item.unidad}: {item.cantidad}</span>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(index)}
                                    className="text-red-500 hover:text-red-700 mr-2 bg-gray-300 p-2 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
};

export default SelectedItemsList;
