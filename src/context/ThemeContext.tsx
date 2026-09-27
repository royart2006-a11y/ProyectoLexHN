import { createContext, ReactNode, useContext, useState } from "react";

type Theme = "light" | "dark";

type ThemeColors = {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  accent: string;
};

// Paleta clara: la que ya usas en toda la app (marfil/azul marino judicial)
const lightColors: ThemeColors = {
  background: "#F4EFE6",
  card: "#FFFFFF",
  text: "#0B2545",
  textSecondary: "#5C6B7A",
  border: "#C9C2B4",
  primary: "#0B2545",
  accent: "#D9C9A3",
};

// Paleta oscura: mismos roles de color, invertidos para modo nocturno
const darkColors: ThemeColors = {
  background: "#12181F",
  card: "#1E2731",
  text: "#F4EFE6",
  textSecondary: "#9AA7B4",
  border: "#3A4552",
  primary: "#D9C9A3", // el dorado pasa a ser el color de énfasis en modo oscuro
  accent: "#0B2545",
};

type ThemeContextType = {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
}