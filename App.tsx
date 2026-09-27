import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}