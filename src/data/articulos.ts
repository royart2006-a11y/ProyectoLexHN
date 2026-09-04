// src/data/articulos.ts

// Datos de ejemplo del área civil — se reemplazan luego con el contenido real
export type Articulo = {
  id: string;
  articulo: string;
  ley: string;
  categoria: string;
  resumen: string;
  resumenCompleto: string;
};

export const ARTICULOS: Articulo[] = [
  {
    id: "1",
    articulo: "Art. 12",
    ley: "Código Civil",
    categoria: "capacidad legal",
    resumen: "Resumen breve de ejemplo pendiente de reemplazar con contenido real.",
    resumenCompleto:
      "Explicación completa en lenguaje sencillo de este artículo. Este texto es un placeholder que se reemplazará con el contenido real del área civil.",
  },
  {
    id: "2",
    articulo: "Art. 45",
    ley: "Código Civil",
    categoria: "contratos",
    resumen: "Resumen breve de ejemplo pendiente de reemplazar con contenido real.",
    resumenCompleto:
      "Explicación completa en lenguaje sencillo de este artículo. Este texto es un placeholder que se reemplazará con el contenido real del área civil.",
  },
];