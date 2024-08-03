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
  const [allExpanded, setAllExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTables, setExpandedTables] = useState<string[]>([]);

  const handleSelectItem = (item: TableData) => {
    setSelectedItems([...selectedItems, item]);
  };

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedTables([]);
    } else {
      setExpandedTables(tables.map(table => table.title));
    }
    setAllExpanded(!allExpanded);
    setSelectedCategory(null); // Reset category filter when toggling expand all
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSelectedCategory(null); // Reset category filter when using search
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category === '' ? null : category);
    setSearchTerm(''); // Reset search term when selecting a category
    setAllExpanded(false); // Ensure allExpanded state is false
    if (category) {
      setExpandedTables([category]);
    }
  };

  const filterTables = (title: string) => {
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filterItemsByCategory = (items: TableData[]) => {
    if (!selectedCategory) return items;
    return items.filter(item => item.categoria === selectedCategory);
  };

  const toggleTableExpand = (title: string) => {
    if (expandedTables.includes(title)) {
      setExpandedTables(expandedTables.filter(t => t !== title));
    } else {
      setExpandedTables([...expandedTables, title]);
    }
  };

  const isTableExpanded = (title: string) => {
    return expandedTables.includes(title);
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

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <ReferencesDashboard />
        <div className="flex justify-evenly items-center mb-4 text-xs">
          <button
            onClick={toggleExpandAll}
            className="bg-slate-200 hover:bg-slate-300 text-black py-1.5 px-1.5 rounded mr-4"
          >
            {allExpanded ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
          <div className='flex items-center'>
            <FaSearch size={15} className='mr-2 text-gray-500 dark:text-white' />
            <input
              type="text"
              placeholder="Buscar por título"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 rounded border"
            />
          </div>
          <div className='flex items-center ml-4'>
            <label htmlFor="category-select" className="mr-2 text-gray-500 dark:text-white">Categoría:</label>
            <select
              id="category-select"
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
              className="p-2 rounded border"
            >
              <option value="">Todas</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        {tables
          .filter(table => (selectedCategory ? table.title === selectedCategory : filterTables(table.title)))
          .map((table, index) => (
            <Table
              key={index}
              title={table.title}
              data={filterItemsByCategory(table.data as TableData[])}
              onSelectItem={handleSelectItem}
              allExpanded={isTableExpanded(table.title)}
              toggleTableExpand={toggleTableExpand}
            />
          ))}
      </div>
      <Modal selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default Home;
