import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  email: string;
  authToken?: string;
  sessionToken?: string;
  role?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  register: (email: string, pwd: string, role: string) => Promise<boolean>; // true = ya hay sesión
  login: (email: string, pwd: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Un solo lugar que convierte una sesión de Supabase en nuestro User,
// incluyendo el rol guardado como metadata en el registro.
const mapUser = (session: Session): User => ({
  email: session.user.email ?? "",
  authToken: session.access_token,
  sessionToken: session.refresh_token,
  role: session.user.user_metadata?.role,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarSesion = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session ? mapUser(data.session) : null);
      setLoading(false);
    };

    cargarSesion();

    // Se dispara en login, logout, refresco de token, etc.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? mapUser(session) : null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const register = async (email: string, pwd: string, role: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pwd,
      options: { data: { role } }, // se guarda en user_metadata
    });
    if (error) throw error;
    console.log("session:", !!data.session, "| identities:", data.user?.identities?.length);

    // Hay sesión solo si la confirmación de correo está desactivada.
    // Si hay sesión, onAuthStateChange ya actualiza el user.
    return !!data.session;
  };

  const login = async (email: string, pwd: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    if (error) throw error;
    // onAuthStateChange se encarga de llenar el user (con el rol)
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe ser utilizado dentro de AuthProvider");
  return context;
};