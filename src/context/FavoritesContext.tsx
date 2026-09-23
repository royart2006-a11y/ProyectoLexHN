import { supabase } from "@/lib/supabase";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";


type FavoritesContextType = {
  favoritos: string[];
  toggleFavorito: (articleId: string) => void;
  esFavorito: (articleId: string) => boolean;
  loading: boolean; // útil para mostrar un indicador mientras se cargan los favoritos guardados
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Cada vez que cambia el usuario (login, logout, o al abrir la app con sesión
  // ya guardada), traemos sus favoritos reales desde Supabase.
  useEffect(() => {
    if (!user) {
      setFavoritos([]); // sin sesión, sin favoritos que mostrar
      return;
    }

    const cargarFavoritos = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("favoritos")
        .select("article_id")
        .eq("user_id", user.id);

      if (!error && data) {
        setFavoritos(data.map((fila) => fila.article_id));
      }

      setLoading(false);
    };

    cargarFavoritos();
  }, [user]);

  const toggleFavorito = async (articleId: string) => {
    if (!user) return;

    const yaEsFavorito = favoritos.includes(articleId);

    // Actualización optimista: cambiamos el estado local de inmediato,
    // para que la UI responda al instante sin esperar la respuesta del servidor.
    if (yaEsFavorito) {
      setFavoritos((prev) => prev.filter((id) => id !== articleId));
    } else {
      setFavoritos((prev) => [...prev, articleId]);
    }

    if (yaEsFavorito) {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("user_id", user.id)
        .eq("article_id", articleId);

      // Si falla en el servidor, revertimos el cambio local para no mentirle al usuario
      if (error) {
        setFavoritos((prev) => [...prev, articleId]);
      }
    } else {
      const { error } = await supabase
        .from("favoritos")
        .insert({ user_id: user.id, article_id: articleId });

      if (error) {
        setFavoritos((prev) => prev.filter((id) => id !== articleId));
      }
    }
  };

  const esFavorito = (articleId: string) => favoritos.includes(articleId);

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorito, esFavorito, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  return context;
}