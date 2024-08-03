import Navbar from './components/Navbar';
import Table from './components/Table';
import ReferencesDashboard from './components/ReferencesDashboard';
import data from './datos/data.json';
import { TableData } from '../types';

const Home: React.FC = () => {
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
        <Table title="Estudio y Ensayo de Suelo" data={estudioEnsayoSuelo as TableData[]} />
        <Table title="Pagos del Comunero - Derecho de Construcción" data={pagosComun as TableData[]} />
        <Table title="Ande - Derechos" data={andeDerechos as TableData[]} />
        <Table title="Essap - Derechos" data={essapDerechos as TableData[]} />
        <Table title="Trabajos" data={trabajos as TableData[]} />
        <Table title="Demonte y Demoliciones" data={demonteDemoliciones as TableData[]} />
        <Table title="Estructuras Metálicas con Techo de Chapa" data={estructurasMetalicasConTechoDeChapa as TableData[]} />
        <Table title="Estructuras Premoldeadas" data={estructurasPremoldeadas as TableData[]} />
        <Table title="Estructuras de Madera" data={estructurasDeMadera as TableData[]} />
        <Table title="Estructuras de Albañilería" data={estructurasDeAlbanileria as TableData[]} />
        <Table title="Albañilería de Ladrillos" data={albanileriaDeLadrillos as TableData[]} />
        <Table title="Aislación Vertical" data={aislacionVertical as TableData[]} />
        <Table title="Aislación de Baños" data={aislacionDeBanos as TableData[]} />
        <Table title="Aislación Térmica" data={aislacionTermica as TableData[]} />
        <Table title="Techos de Fibrocemento" data={techosDeFibrocemento as TableData[]} />
      </div>
    </div>
  );
};

export default Home;
