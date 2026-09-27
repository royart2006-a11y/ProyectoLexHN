// src/data/articulos.ts
// Al inicio del archivo, junto a los demás imports:
import { ARTICULOS_CIVIL } from "./articulosPorCodigo/civil";
import { ARTICULOS_COMERCIO } from "./articulosPorCodigo/comercio";
import { ARTICULOS_CONSTITUCION } from "./articulosPorCodigo/constitucion";
import { ARTICULOS_FAMILIA } from "./articulosPorCodigo/familia";
import { ARTICULOS_NINEZ } from "./articulosPorCodigo/ninez";
import { ARTICULOS_TRABAJO } from "./articulosPorCodigo/trabajo";
import { ARTICULOS_TRIBUTARIO } from "./articulosPorCodigo/tributario";

export type Articulo = {
  id: string;              // identificador único, usado para navegar (ArticleDetail busca por esto)
  articulo: string;        // "Art. 46" — se muestra en la tarjeta y el detalle
  ley: string;             // "Código Civil" — de qué ley proviene
  categoria: string;       // usado para el filtro de categorías en Search
  resumen: string;         // versión corta / simplificada
  resumenCompleto: string; // texto legal íntegro
   codigoId: string;
};



// Renombra tu array existente de artículos del Código Civil a ARTICULOS_CIVIL,
// y al final del archivo, reemplaza el 'export const ARTICULOS' por:
export const ARTICULOS: Articulo[] = [
  ...ARTICULOS_CIVIL,
  ...ARTICULOS_FAMILIA,
  ...ARTICULOS_NINEZ,
  ...ARTICULOS_TRABAJO,
  ...ARTICULOS_COMERCIO,
  ...ARTICULOS_CONSTITUCION,
  ...ARTICULOS_TRIBUTARIO,

  ];