"use client"
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import ReferencesDashboard from './components/ReferencesDashboard';
import data from './datos/data.json';
import { TableData } from '../types';
import Modal from './components/Modal';
import { FaSearch } from 'react-icons/fa';

const Home: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<TableData[]>([]);
  const [allExpanded, setAllExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectItem = (item: TableData) => {
    setSelectedItems([...selectedItems, item]);
  };

  const toggleExpandAll = () => {
    setAllExpanded(!allExpanded);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterTables = (title: string) => {
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const {
    estudioEnsayoSuelo,
    pagosComun,
    andeDerechos,
    essapDerechos,
    trabajos,
    demonteDemoliciones,
    estructurasMetalicasConTechoDeChapa,
    estructurasPremoldeadas,
    estructurasDeMadera,
    estructurasDeAlbanileria,
    albanileriaDeLadrillos,
    aislacionVertical,
    aislacionDeBanos,
    aislacionTermica,
    techosDeFibrocemento,
    portonesAccesoVehicular,
    puertas,
    ventanasChapaDoblada,
    cielosRasos,
    revoquesMuros,
    pisos,
    zocalos,
    revestimientos,
    pinturaEmpapelado
  }: any = data;

  const tables = [
    { title: "Estudio y Ensayo de Suelo", data: estudioEnsayoSuelo },
    { title: "Pagos del Comunero - Derecho de Construcción", data: pagosComun },
    { title: "Ande - Derechos", data: andeDerechos },
    { title: "Essap - Derechos", data: essapDerechos },
    { title: "Trabajos", data: trabajos },
    { title: "Demonte y Demoliciones", data: demonteDemoliciones },
    { title: "Estructuras Metálicas con Techo de Chapa", data: estructurasMetalicasConTechoDeChapa },
    { title: "Estructuras Premoldeadas", data: estructurasPremoldeadas },
    { title: "Estructuras de Madera", data: estructurasDeMadera },
    { title: "Estructuras de Albañilería", data: estructurasDeAlbanileria },
    { title: "Albañilería de Ladrillos", data: albanileriaDeLadrillos },
    { title: "Aislación Vertical", data: aislacionVertical },
    { title: "Aislación de Baños", data: aislacionDeBanos },
    { title: "Aislación Térmica", data: aislacionTermica },
    { title: "Techos de Fibrocemento", data: techosDeFibrocemento },
    { title: "Portones Acceso Vehicular", data: portonesAccesoVehicular },
    { title: "Puertas", data: puertas },
    { title: "Ventanas Chapa Doblada", data: ventanasChapaDoblada },
    { title: "Cielo Raso", data: cielosRasos },
    { title: "Revoques de Muro", data: revoquesMuros },
    { title: "Pisos", data: pisos },
    { title: "Zocalos", data: zocalos },
    { title: "Revestimientos", data: revestimientos },
    { title: "Pintura para Empapelado", data: pinturaEmpapelado }
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <ReferencesDashboard />
        <div className="flex justify-end items-center mb-4 text-xs">
          <button
            onClick={toggleExpandAll}
            className="bg-slate-600 hover:bg-slate-700 text-white py-1.5 px-1.5 rounded mr-4"
          >
            {allExpanded ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
          <FaSearch  size={15} className='mr-2 text-gray-500 dark:text-white'/>
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded border"
          />
        </div>
        {tables.filter(table => filterTables(table.title)).map((table, index) => (
          <Table
            key={index}
            title={table.title}
            data={table.data as TableData[]}
            onSelectItem={handleSelectItem}
            allExpanded={allExpanded}
          />
        ))}
      </div>
      <Modal selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default Home;
