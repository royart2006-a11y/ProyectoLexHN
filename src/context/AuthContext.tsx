// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

type Usuario = {
  email: string;
  password: string;
};

type AuthContextType = {
  usuarios: Usuario[];
  registrarUsuario: (email: string, password: string) => boolean;
  validarLogin: (email: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Registra un nuevo usuario. Devuelve false si el correo ya existe.
  const registrarUsuario = (email: string, password: string): boolean => {
    const yaExiste = usuarios.some((u) => u.email === email);
    if (yaExiste) return false;

    setUsuarios((prev) => [...prev, { email, password }]);
    return true;
  };

  // Valida que exista un usuario con ese email Y esa contraseña exacta.
  const validarLogin = (email: string, password: string): boolean => {
    return usuarios.some((u) => u.email === email && u.password === password);
  };

  return (
    <AuthContext.Provider value={{ usuarios, registrarUsuario, validarLogin }}>
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