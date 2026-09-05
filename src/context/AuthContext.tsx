import React, { createContext, ReactNode, useContext, useState } from "react";

export type TipoUsuario = "abogado" | "usuario";

type Usuario = {
  email: string;
  password: string;
  tipoUsuario: TipoUsuario;
};

type AuthContextType = {
  usuarioActual: Usuario | null;   // null = nadie ha iniciado sesión
  registrarUsuario: (email: string, password: string, tipoUsuario: TipoUsuario) => boolean;
  validarLogin: (email: string, password: string) => boolean;
  cerrarSesion: () => void;
};

// createContext empieza en 'undefined' porque, fuera del Provider, no hay contexto válido.
// Esto nos permite detectar el error "usaste useAuth() sin envolver con AuthProvider".
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);       // "base de datos" en memoria
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null); // sesión activa

  const registrarUsuario = (email: string, password: string, tipoUsuario: TipoUsuario): boolean => {
    const yaExiste = usuarios.some((u) => u.email === email);
    if (yaExiste) return false; // avisamos al que llamó que falló, sin lanzar excepción

    const nuevoUsuario = { email, password, tipoUsuario };
    setUsuarios((prev) => [...prev, nuevoUsuario]); // agregamos sin mutar el array anterior
    setUsuarioActual(nuevoUsuario); // login automático tras registrarse
    return true;
  };

  const validarLogin = (email: string, password: string): boolean => {
    // Busca un usuario cuyo email Y password coincidan EXACTAMENTE
    const encontrado = usuarios.find((u) => u.email === email && u.password === password);
    if (!encontrado) return false;

    setUsuarioActual(encontrado);
    return true;
  };

  const cerrarSesion = () => setUsuarioActual(null);

  return (
    <AuthContext.Provider value={{ usuarioActual, registrarUsuario, validarLogin, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado: evita que cada pantalla tenga que escribir useContext(AuthContext)
// y el chequeo de undefined manualmente. Centraliza el mensaje de error también.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
}