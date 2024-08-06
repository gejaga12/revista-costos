// pages/crear-presupuesto.tsx
"use client"
import React, { useState } from 'react';
import data from '../datos/data.json';
import { TableData } from '../../types';
import { FaCheckCircle, FaClock, FaTrash } from 'react-icons/fa';

const CrearPresupuesto: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<TableData[]>([]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const handleItemClick = (item: TableData) => {
        setSelectedItems([...selectedItems, item]);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...selectedItems];
        newItems.splice(index, 1);
        setSelectedItems(newItems);
    };

    const categories = [
        "Estudio y Ensayo de Suelo",
        "Pagos del Comunero - Derecho de Construcción",
        "Ande - Derechos",
        "Essap - Derechos",
        "Trabajos",
        "Demonte y Demoliciones",
        "Estructuras Metálicas con Techo de Chapa",
        "Estructuras Premoldeadas",
        "Estructuras de Madera",
        "Estructuras de Albañilería",
        "Albañilería de Ladrillos",
        "Aislación Vertical",
        "Aislación de Baños",
        "Aislación Térmica",
        "Techos de Fibrocemento",
        "Portones Acceso Vehicular",
        "Puertas",
        "Ventanas Chapa Doblada",
        "Cielo Raso",
        "Revoques de Muro",
        "Pisos",
        "Zocalos",
        "Revestimientos",
        "Pintura para Empapelado"
    ];

    const isCategoryCompleted = (category: string) => {
        return selectedItems.some(item => item.categoria === category);
    };

    const renderItems = () => {
        if (!selectedCategory) return null;

        const items = Object.values(data)
            .flat()
            .filter((item: any) => item.categoria === selectedCategory);

        return (
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white dark:bg-gray-800 text-xs">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-black dark:text-white text-start" style={{ width: '60%' }}>ITEM</th>
                            <th className="py-2 px-4 text-black dark:text-white text-start" style={{ width: '20%' }}>UNIDAD</th>
                            <th className="py-2 px-4 text-black dark:text-white text-start" style={{ width: '20%' }}>COSTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: any, index: number) => (
                            <tr
                                key={index}
                                className="even:bg-gray-100 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                                onClick={() => handleItemClick(item)}
                            >
                                <td className="border px-4 py-1 text-black dark:text-white text-xs">{item.item}</td>
                                <td className="border px-4 py-1 text-black dark:text-white text-xs">{item.unidad}</td>
                                <td className="text-xs border px-4 py-1 text-black dark:text-white">{item.costo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex">
            <div className="w-1/4 bg-white dark:bg-gray-800 p-4 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categorías</h2>
                <ul>
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center p-2 cursor-pointer ${selectedCategory === category ? 'bg-blue-500 text-white' : 'text-black dark:text-white'}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <span className='text-xs mr-1'>{category}</span>
                            {isCategoryCompleted(category) ? (
                                <FaCheckCircle className="text-green-500" />
                            ) : (
                                <FaClock className="text-yellow-500" />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Crear Presupuesto</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="p-2 rounded border w-full text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <input
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            className="p-2 rounded border w-full text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Items Seleccionados</h3>
                        {selectedItems.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">No hay items seleccionados.</p>
                        ) : (
                            <ul>
                                {selectedItems.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-700 mb-2 rounded">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-black dark:text-white">{item.item}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">${item.costo}</span>
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
                        )}
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Crear
                    </button>
                </form>
                {renderItems()}
            </div>
        </div>
    );
};

export default CrearPresupuesto;
