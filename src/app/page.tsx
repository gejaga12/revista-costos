import Navbar from './components/Navbar';
import ReferencesTable from './components/ReferencesTable';
import Table from './components/Table';
import data from './datos/data.json';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <ReferencesTable />
        <Table title="Estudio y Ensayo de Suelo" data={data.estudioEnsayoSuelo} />
        <Table title="Pagos del Comunero - Derecho de Construcción" data={data.pagosComún} />
        <Table title="Ande - Derechos" data={data.andeDerechos} />
        <Table title="Essap - Derechos" data={data.essapDerechos} />
        <Table title="Trabajos" data={data.trabajos} />
        <Table title="Demonte y Demoliciones" data={data.demonteDemoliciones} />
      </div>
    </div>
  );
}
