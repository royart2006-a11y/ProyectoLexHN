import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

type FavoritesContextType = {
  favoritos: string[];
  toggleFavorito: (articleId: string) => void;
  esFavorito: (articleId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth(); // antes: usuarioActual

  const [favoritosPorUsuario, setFavoritosPorUsuario] = useState<Record<string, string[]>>({});

  const favoritos = user ? favoritosPorUsuario[user.email] ?? [] : [];

  const toggleFavorito = (articleId: string) => {
    if (!user) return;

    setFavoritosPorUsuario((prev) => {
      const actuales = prev[user.email] ?? [];
      const actualizados = actuales.includes(articleId)
        ? actuales.filter((id) => id !== articleId)
        : [...actuales, articleId];

      return { ...prev, [user.email]: actualizados };
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
  if (!context) throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  return context;
}