"use client"
// pages/index.tsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import ReferencesDashboard from './components/ReferencesDashboard';
import data from './datos/data.json';
import { TableData } from '../types';
import Modal from './components/Modal';

const Home: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<TableData[]>([]);
  const [allExpanded, setAllExpanded] = useState(true);

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
  }: any = data;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <ReferencesDashboard />
        <div className="text-end mb-4 text-xs">
          <button
            onClick={toggleExpandAll}
            className="bg-slate-600 hover:bg-slate-700 text-white py-1.5 px-1.5 rounded"
          >
            {allExpanded ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
        <Table title="Estudio y Ensayo de Suelo" data={estudioEnsayoSuelo as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Pagos del Comunero - Derecho de Construcción" data={pagosComun as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Ande - Derechos" data={andeDerechos as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Essap - Derechos" data={essapDerechos as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Trabajos" data={trabajos as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Demonte y Demoliciones" data={demonteDemoliciones as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Estructuras Metálicas con Techo de Chapa" data={estructurasMetalicasConTechoDeChapa as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Estructuras Premoldeadas" data={estructurasPremoldeadas as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Estructuras de Madera" data={estructurasDeMadera as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Estructuras de Albañilería" data={estructurasDeAlbanileria as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Albañilería de Ladrillos" data={albanileriaDeLadrillos as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Aislación Vertical" data={aislacionVertical as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Aislación de Baños" data={aislacionDeBanos as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Aislación Térmica" data={aislacionTermica as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
        <Table title="Techos de Fibrocemento" data={techosDeFibrocemento as TableData[]} onSelectItem={handleSelectItem} allExpanded={allExpanded} />
      </div>
      <Modal selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default Home;
