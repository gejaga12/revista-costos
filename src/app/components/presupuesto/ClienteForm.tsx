// pages/components/ClienteForm.tsx
import React from 'react';
import { FaChevronDown, FaChevronUp, FaUser } from 'react-icons/fa';

interface ClienteFormProps {
  isClienteExpanded: boolean;
  toggleClienteExpand: () => void;
  cliente: string;
  rucCliente: string;
  direccionCliente: string;
  setCliente: (value: string) => void;
  setRucCliente: (value: string) => void;
  setDireccionCliente: (value: string) => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({
  isClienteExpanded, toggleClienteExpand, cliente, rucCliente, direccionCliente, setCliente, setRucCliente, setDireccionCliente
}) => {
  return (
    <>
      <div onClick={toggleClienteExpand} className="mb-4 flex justify-between items-center dark:bg-gray-600 bg-gray-300 p-1 cursor-pointer rounded-ss-lg rounded-se-lg">
        <div className="flex items-center">
          <FaUser className="text-gray-900 dark:text-white mx-2" />
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mr-2">Cliente</h2>
        </div>
        <button
          type="button"
          onClick={toggleClienteExpand}
                      className="ml-2 bg-red-600 dark:bg-slate-400 p-0.5  text-white rounded-lg"
        >
          {isClienteExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isClienteExpanded && (
        <form onSubmit={(e) => e.preventDefault()} className='mb-4'>
          <div className="mb-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombreCliente">
              Nombre del Cliente
            </label>
            <input
              type="text"
              id="nombreCliente"
              name="nombreCliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="p-2 rounded border w-full text-black text-xs"
            />
          </div>
          <div className="mb-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="rucCliente">
              Ruc
            </label>
            <input
              type="text"
              id="rucCliente"
              name="rucCliente"
              value={rucCliente}
              onChange={(e) => setRucCliente(e.target.value)}
              className="p-2 rounded border w-full text-black text-xs"
            />
          </div>
          <div className="mb-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="direccionCliente">
              Dirección
            </label>
            <input
              type="text"
              id="direccionCliente"
              name="direccionCliente"
              value={direccionCliente}
              onChange={(e) => setDireccionCliente(e.target.value)}
              className="p-2 rounded border w-full text-black text-xs"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default ClienteForm;
