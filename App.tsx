import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </FavoritesProvider>
    </AuthProvider>
  );
}