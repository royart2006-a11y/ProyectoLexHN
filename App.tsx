import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./components/Src/navigation/StackNavigator";


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}