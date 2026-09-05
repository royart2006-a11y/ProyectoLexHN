// src/context/FavoritesContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

type FavoritesContextType = {
  favoritos: string[];
  toggleFavorito: (articleId: string) => void;
  esFavorito: (articleId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { usuarioActual } = useAuth();

  // En vez de un solo array, guardamos un mapa: email -> lista de IDs favoritos
  const [favoritosPorUsuario, setFavoritosPorUsuario] = useState<Record<string, string[]>>({});

  // Los favoritos "activos" son solo los del usuario actualmente logueado
  const favoritos = usuarioActual ? favoritosPorUsuario[usuarioActual.email] ?? [] : [];

  const toggleFavorito = (articleId: string) => {
    if (!usuarioActual) return; // seguridad: sin sesión, no hay a quién asociar el favorito

    setFavoritosPorUsuario((prev) => {
      const actuales = prev[usuarioActual.email] ?? [];
      const actualizados = actuales.includes(articleId)
        ? actuales.filter((id) => id !== articleId)
        : [...actuales, articleId];

      return { ...prev, [usuarioActual.email]: actualizados };
    });
  };

  const esFavorito = (articleId: string) => favoritos.includes(articleId);

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
}