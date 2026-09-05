import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "./AuthContext"; // Favorites DEPENDE de saber quién es el usuario actual

type FavoritesContextType = {
  favoritos: string[];
  toggleFavorito: (articleId: string) => void;
  esFavorito: (articleId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { usuarioActual } = useAuth(); // aquí es donde se conecta con AuthContext

  // Guardamos un MAPA (diccionario) en vez de un array plano:
  // la llave es el email, el valor es la lista de IDs favoritos de ESE usuario.
  const [favoritosPorUsuario, setFavoritosPorUsuario] = useState<Record<string, string[]>>({});

  // Los favoritos "visibles" ahora mismo son solo los del usuario logueado.
  // Si no hay sesión, devolvemos un array vacío como default seguro.
  const favoritos = usuarioActual ? favoritosPorUsuario[usuarioActual.email] ?? [] : [];

  const toggleFavorito = (articleId: string) => {
    if (!usuarioActual) return; // sin sesión, no hay a quién asociarle el favorito

    setFavoritosPorUsuario((prev) => {
      const actuales = prev[usuarioActual.email] ?? [];
      const actualizados = actuales.includes(articleId)
        ? actuales.filter((id) => id !== articleId) // ya estaba: lo quitamos
        : [...actuales, articleId];                  // no estaba: lo agregamos

      // Reconstruimos el mapa completo, solo cambiando la entrada de este usuario
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
  if (!context) throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  return context;
}