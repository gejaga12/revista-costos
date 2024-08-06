// pages/crear-presupuesto.tsx
"use client"
import React, { useState } from 'react';
import data from '../datos/data.json';
import { TableData } from '../../types';
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaClock, FaFileAlt, FaSave, FaTrash } from 'react-icons/fa';

const CrearPresupuesto: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<(TableData & { cantidad: number })[]>([]);
    const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);
    const [isCotizacionExpanded, setIsCotizacionExpanded] = useState<boolean>(true);
    const [isClienteExpanded, setIsClienteExpanded] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(1);
    const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
    const [itemToAdd, setItemToAdd] = useState<TableData | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const handleItemClick = (item: TableData) => {
        if (item.unidad === 'M2' || item.unidad === 'ML') {
            setItemToAdd(item);
            setShowQuantityModal(true);
        } else {
            setSelectedItems([...selectedItems, { ...item, cantidad: 1 }]);
        }
    };

    const handleAddItemWithQuantity = () => {
        if (itemToAdd) {
            const newItem = { ...itemToAdd, costo: itemToAdd.costo * quantity, cantidad: quantity };
            setSelectedItems([...selectedItems, newItem]);
            setShowQuantityModal(false);
            setItemToAdd(null);
            setQuantity(1);
        }
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...selectedItems];
        newItems.splice(index, 1);
        setSelectedItems(newItems);
    };

    const toggleItemsExpand = () => {
        setIsItemsExpanded(!isItemsExpanded);
    };

    const toggleCotizacionExpand = () => {
        setIsCotizacionExpanded(!isCotizacionExpanded);
    };

    const toggleClienteExpand = () => {
        setIsClienteExpanded(!isClienteExpanded);
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
                <div className="mb-4 flex justify-start items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mr-2">Cotización</h2>
                    <button
                        type="button"
                        onClick={toggleCotizacionExpand}
                        className="text-black dark:text-white bg-gray-300 dark:bg-gray-400 p-2 rounded-lg flex items-center"
                    >
                        {isCotizacionExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                {isCotizacionExpanded && (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-1">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre">
                                Nombre de Empresa
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="p-2 rounded border w-full text-black"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="descripcion">
                                Ruc
                            </label>
                            <input
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                className="p-2 rounded border w-full text-black"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="descripcion">
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                className="p-2 rounded border w-full text-black"
                            />
                        </div>
                    </form>
                )}
                <div className="mb-4 flex justify-start items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mr-2">Cliente</h2>
                    <button
                        type="button"
                        onClick={toggleClienteExpand}
                        className="text-black dark:text-white bg-gray-300 dark:bg-gray-400 p-2 rounded-lg flex items-center"
                    >
                        {isClienteExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                {isClienteExpanded && (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-1">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="clienteNombre">
                                Nombre de Empresa
                            </label>
                            <input
                                type="text"
                                id="clienteNombre"
                                name="clienteNombre"
                                className="p-2 rounded border w-full text-black"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="clienteRuc">
                                Ruc
                            </label>
                            <input
                                type="text"
                                id="clienteRuc"
                                name="clienteRuc"
                                className="p-2 rounded border w-full text-black"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="clienteDireccion">
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="clienteDireccion"
                                name="clienteDireccion"
                                className="p-2 rounded border w-full text-black"
                            />
                        </div>
                    </form>
                )}
                <div className="mb-4 mt-4">
                    <div className="flex justify-start items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mr-2">Items Seleccionados</h3>
                        <button
                            type="button"
                            onClick={toggleItemsExpand}
                            className="text-black dark:text-white bg-gray-300 dark:bg-gray-400 p-2 rounded-lg flex items-center"
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

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center">
                    <FaFileAlt className="mr-2" />
                    Crear Presupuesto
                </button>
                {renderItems()}
            </div>

            {showQuantityModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Ingrese la cantidad de {itemToAdd?.unidad}</h3>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="p-2 rounded border w-full text-black mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowQuantityModal(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddItemWithQuantity}
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearPresupuesto;
