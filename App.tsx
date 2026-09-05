import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import StackNavigator from "./src/navigation/StackNavigator";



export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}