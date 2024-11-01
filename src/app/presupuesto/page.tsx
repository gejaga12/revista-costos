// pages/crear-presupuesto.tsx
"use client"
import React, { useState } from 'react';
import data from '../datos/data.json';
import { TableData } from '../../types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CategoriesList from '../components/presupuesto/CategoriesList';
import EmpresaForm from '../components/presupuesto/EmpresaForm';
import ClienteForm from '../components/presupuesto/ClienteForm';
import SelectedItemsList from '../components/presupuesto/SelectedItemsList';
import { FaFileAlt } from 'react-icons/fa';
import withAuth from '../utils/withAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const CrearPresupuesto: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<(TableData & { cantidad: number })[]>([]);
    const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);
    const [isCotizacionExpanded, setIsCotizacionExpanded] = useState<boolean>(false);
    const [isClienteExpanded, setIsClienteExpanded] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
    const [itemToAdd, setItemToAdd] = useState<TableData | null>(null);
    const [empresa, setEmpresa] = useState<string>('');
    const [rucEmpresa, setRucEmpresa] = useState<string>('');
    const [direccionEmpresa, setDireccionEmpresa] = useState<string>('');
    const [cliente, setCliente] = useState<string>('');
    const [rucCliente, setRucCliente] = useState<string>('');
    const [direccionCliente, setDireccionCliente] = useState<string>('');

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const handleItemClick = (item: TableData) => {
        if (item.unidad === 'M2' || item.unidad === 'ML' || item.unidad === 'UN' || item.unidad === 'L' || item.unidad === 'M3') {
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

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Agregar fondo negro alrededor del logo
        doc.setFillColor(0, 0, 0);
        doc.rect(10, 10, 50, 15, 'F');
        
        // Agregar logo
        const logoURL = '/logo.webp';
        doc.addImage(logoURL, 'WEBP', 10, 10, 50, 15);
    
        // Título
        doc.setFontSize(18);
        doc.text('PRESUPUESTO DE CONSTRUCCIÓN', 70, 22);
    
        // Obtener la fecha actual
        const date = new Date();
        const formattedDate = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    
        // Agregar fecha debajo del título
        doc.setFontSize(12);
        doc.text(`Fecha: ${formattedDate}`, 70, 30);
    
        // Datos de la empresa y el cliente
        doc.setFontSize(10);
        doc.setFillColor(230, 230, 230);
        doc.rect(10, 40, 190, 20, 'F'); // Fondo gris claro para empresa y cliente
    
        doc.text(`Empresa: ${empresa}`, 12, 46);
        doc.text(`RUC: ${rucEmpresa}`, 12, 52);
        doc.text(`Dirección: ${direccionEmpresa}`, 12, 58);
    
        doc.text(`Cliente: ${cliente}`, 150, 46);
        doc.text(`RUC: ${rucCliente}`, 150, 52);
        doc.text(`Dirección: ${direccionCliente}`, 150, 58);
    
        const tableColumn = ["Item", "Unidad", "Cantidad", "Costo", "Total"];
        const tableRows: any[] = [];
    
        const categorizedItems: any = selectedItems.reduce((acc: any, item: any) => {
            if (!acc[item.categoria]) {
                acc[item.categoria] = [];
            }
            acc[item.categoria].push(item);
            return acc;
        }, {});
    
        Object.keys(categorizedItems).forEach(categoria => {
            const totalCategoria = categorizedItems[categoria].reduce((sum: any, item: any) => sum + (item.costo * item.cantidad), 0);
            tableRows.push([
                { content: categoria, colSpan: 4, styles: { halign: 'left', fillColor: [211, 211, 211] } },
                { content: `$${totalCategoria.toFixed(2)}`, styles: { halign: 'center', fillColor: [211, 211, 211], textColor: [0, 0, 0] } }
            ]);
            categorizedItems[categoria].forEach((item: any) => {
                const itemData = [
                    item.item,
                    item.unidad,
                    item.cantidad,
                    `$${item.costo.toFixed(2)}`,
                    `$${(item.costo * item.cantidad).toFixed(2)}`
                ];
                tableRows.push(itemData);
            });
        });
    
        const total = selectedItems.reduce((acc, item) => acc + (item.costo * item.cantidad), 0);
        tableRows.push([
            { content: 'TOTAL GENERAL', colSpan: 4, styles: { halign: 'right' } },
            { content: `$${total.toFixed(2)}`, styles: { halign: 'center' } }
        ]);
    
        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 70,
            theme: 'striped',
            styles: {
                fillColor: [255, 255, 255],  // No fill color for cells
                textColor: [0, 0, 0],  // Black text color
                cellPadding: 1,
                halign: 'left',  // Align all text to the left
                lineColor: [211, 211, 211],  // Light gray borders
                lineWidth: 0.5,
            },
            headStyles: {
                fillColor: [44, 62, 80], // Dark blue header
                textColor: [255, 255, 255], // White text in header
                halign: 'center',  // Center text in header
            },
            columnStyles: {
                0: { cellWidth: 70 }, // Reduce width of Item column
                1: { cellWidth: 25 }, // Set width for Unidad
                2: { cellWidth: 25, halign: 'center' }, // Set width for Cantidad
                3: { cellWidth: 35, halign: 'center' }, // Set width for Costo
                4: { cellWidth: 35, halign: 'center' }, // Set width for Total
            },
            tableWidth: 'auto',
            margin: { left: 10, right: 10 },
        });
    
        doc.save('presupuesto.pdf');
    };
    
    

    const handleCreatePresupuesto = () => {
        Swal.fire({
            title: '<span style="font-size: 15px;">¿Desea generar el presupuesto?</span>',
            width: '350px',
            showCancelButton: true,
            confirmButtonText: 'Generar',
            confirmButtonColor: '#3b82f6',
            cancelButtonText: 'Cancelar',
            customClass: {
                title: 'swal-title-custom'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                generatePDF();
                toast.success('Presupuesto creado correctamente');
            }
        });
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
            <CategoriesList
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                isCategoryCompleted={isCategoryCompleted}
            />
            <div className="w-3/4 p-4">
                <EmpresaForm
                    isCotizacionExpanded={isCotizacionExpanded}
                    toggleCotizacionExpand={toggleCotizacionExpand}
                    empresa={empresa}
                    rucEmpresa={rucEmpresa}
                    direccionEmpresa={direccionEmpresa}
                    setEmpresa={setEmpresa}
                    setRucEmpresa={setRucEmpresa}
                    setDireccionEmpresa={setDireccionEmpresa}
                />
                <ClienteForm
                    isClienteExpanded={isClienteExpanded}
                    toggleClienteExpand={toggleClienteExpand}
                    cliente={cliente}
                    rucCliente={rucCliente}
                    direccionCliente={direccionCliente}
                    setCliente={setCliente}
                    setRucCliente={setRucCliente}
                    setDireccionCliente={setDireccionCliente}
                />
                <SelectedItemsList
                    selectedItems={selectedItems}
                    isItemsExpanded={isItemsExpanded}
                    toggleItemsExpand={toggleItemsExpand}
                    handleRemoveItem={handleRemoveItem}
                />
                <button
                    onClick={handleCreatePresupuesto}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                >
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

export default withAuth(CrearPresupuesto);
