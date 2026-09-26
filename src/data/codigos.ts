// src/data/codigos.ts

export type Codigo = {
  id: string;
  nombre: string;
  area: string;
  descripcion: string;
  pdfAsset: number; // resultado de require(...) para el PDF
};

export const CODIGOS: Codigo[] = [
  {
    id: "civil",
    nombre: "Código Civil",
    area: "Derecho civil",
    descripcion: "Personas, bienes, propiedad, obligaciones, contratos, sucesiones.",
    pdfAsset: require("../../assets/pdfs/codigo-civil.pdf"),
  },
  {
    id: "familia",
    nombre: "Código de Familia",
    area: "Familia",
    descripcion: "Matrimonio, filiación, relaciones familiares, etc.",
    pdfAsset: require("../../assets/pdfs/codigo-familia.pdf"),
  },
  {
    id: "ninez",
    nombre: "Código de la Niñez y la Adolescencia",
    area: "Niñez",
    descripcion: "Derechos y protección de niños y adolescentes.",
    pdfAsset: require("../../assets/pdfs/codigo-ninez.pdf"),
  },
  {
    id: "comercio",
    nombre: "Código de Comercio",
    area: "Mercantil",
    descripcion: "Comerciantes, sociedades, actos de comercio, empresas.",
    pdfAsset: require("../../assets/pdfs/codigo-comercio.pdf"),
  },
  {
    id: "trabajo",
    nombre: "Código del Trabajo",
    area: "Laboral",
    descripcion: "Relaciones trabajador–empleador.",
    pdfAsset: require("../../assets/pdfs/codigo-trabajo.pdf"),
  },
  {
    id: "tributario",
    nombre: "Código Tributario",
    area: "Tributario",
    descripcion: "Impuestos, obligaciones fiscales y procedimientos tributarios.",
    pdfAsset: require("../../assets/pdfs/codigo-tributario.pdf"),
  },
];