// src/context/FavoritesContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

type FavoritesContextType = {
  favoritos: string[];
  toggleFavorito: (articleId: string) => void;
  esFavorito: (articleId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Guardamos solo los IDs de los artículos marcados como favoritos
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const toggleFavorito = (articleId: string) => {
    setFavoritos((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId) // si ya estaba, lo quita
        : [...prev, articleId] // si no estaba, lo agrega
    );
  };

  const esFavorito = (articleId: string) => favoritos.includes(articleId);

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personalizado para usar el contexto más fácilmente en cualquier pantalla
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
}