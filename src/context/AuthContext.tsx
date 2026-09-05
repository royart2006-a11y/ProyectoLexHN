// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

export type TipoUsuario = "abogado" | "usuario";

type Usuario = {
  email: string;
  password: string;
  tipoUsuario: TipoUsuario;
};

type AuthContextType = {
  usuarioActual: Usuario | null;
  registrarUsuario: (email: string, password: string, tipoUsuario: TipoUsuario) => boolean;
  validarLogin: (email: string, password: string) => boolean;
  cerrarSesion: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);

  const registrarUsuario = (email: string, password: string, tipoUsuario: TipoUsuario): boolean => {
    const yaExiste = usuarios.some((u) => u.email === email);
    if (yaExiste) return false;

    const nuevoUsuario = { email, password, tipoUsuario };
    setUsuarios((prev) => [...prev, nuevoUsuario]);
    setUsuarioActual(nuevoUsuario); // inicia sesión automáticamente con este usuario
    return true;
  };

  const validarLogin = (email: string, password: string): boolean => {
    const encontrado = usuarios.find((u) => u.email === email && u.password === password);
    if (!encontrado) return false;

    setUsuarioActual(encontrado);
    return true;
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioActual, registrarUsuario, validarLogin, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}