// src/types.ts

export interface Referencias {
    "Mano de obra de colocación o instalación": string;
    "Material / Materiales / Insumos": string;
    "Unidad / Unitario": string;
    "Global / Total": string;
    "Dolar": string;
    "Metro cuadrado": string;
    "Metro cúbico": string;
    "Metro Lineal": string;
    "Litro": string;
    "Viaje o transporte": string;
  }
  
  export interface ReferenceData {
    referencias: Referencias;
  }
  
  export interface TableData {
    item: string;
    unidad: string;
    costo: number;
  }
  