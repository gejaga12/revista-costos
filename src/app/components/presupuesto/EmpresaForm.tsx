// pages/components/EmpresaForm.tsx
import React from 'react';
import { AiOutlineFileText, AiOutlineSolution } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface EmpresaFormProps {
  isCotizacionExpanded: boolean;
  toggleCotizacionExpand: () => void;
  empresa: string;
  rucEmpresa: string;
  direccionEmpresa: string;
  setEmpresa: (value: string) => void;
  setRucEmpresa: (value: string) => void;
  setDireccionEmpresa: (value: string) => void;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({
  isCotizacionExpanded, toggleCotizacionExpand, empresa, rucEmpresa, direccionEmpresa, setEmpresa, setRucEmpresa, setDireccionEmpresa
}) => {
  return (
    <>
      <div onClick={toggleCotizacionExpand} className="mb-4 flex justify-between items-center dark:bg-gray-600 bg-gray-300 p-1 cursor-pointer rounded-ss-lg rounded-se-lg">
        <div className="flex items-center">
          <AiOutlineSolution className="text-gray-900 dark:text-white mx-2" />
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mr-2">Empresa</h2>
        </div>
        <button
          type="button"
          onClick={toggleCotizacionExpand}
                       className="ml-2 bg-red-600 dark:bg-slate-400 p-0.5  text-white rounded-lg "
        >
          {isCotizacionExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isCotizacionExpanded && (
        <form onSubmit={(e) => e.preventDefault()} className='mb-4'>
          <div className="mb-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombreEmpresa">
              Nombre de Empresa
            </label>
            <input
              type="text"
              id="nombreEmpresa"
              name="nombreEmpresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="p-2 rounded border w-full text-black text-xs"
            />
          </div>
          <div className="mb-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="rucEmpresa">
              Ruc
            </label>
            <input
              type="text"
              id="rucEmpresa"
              name="rucEmpresa"
              value={rucEmpresa}
              onChange={(e) => setRucEmpresa(e.target.value)}
              className="p-2 rounded border w-full text-black text-xs"
            />
          </div>
          <div className="mb-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="direccionEmpresa">
              Dirección
            </label>
            <input
              type="text"
              id="direccionEmpresa"
              name="direccionEmpresa"
              value={direccionEmpresa}
              onChange={(e) => setDireccionEmpresa(e.target.value)}
              className="p-2 rounded border w-full text-black text-xs"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default EmpresaForm;
