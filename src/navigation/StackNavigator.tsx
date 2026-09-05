// src/navigation/StackNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ArticleDetail from "../screens/ArticleDetail";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* La pantalla Login es la inicial, y no debe mostrar botón de retroceso */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      {/* Tabs no debe permitir volver al Login con el botón atrás */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ title: "Detalle del artículo" }}
      />
    </Stack.Navigator>
  );
}