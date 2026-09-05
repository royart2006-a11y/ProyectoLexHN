import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ArticleDetail from "../screens/ArticleDetail";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";


// El genérico <RootStackParamList> le da a TypeScript la info de qué pantallas existen
// y qué parámetros espera cada una — así, si te equivocas navegando, TypeScript te avisa.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* Login sin header, es la puerta de entrada, no necesita "volver" */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ title: "Crear cuenta" }} />
      {/* gestureEnabled: false evita que el usuario "deslice hacia atrás" y regrese al Login
          después de haber iniciado sesión */}
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} options={{ title: "Detalle del artículo" }} />
    </Stack.Navigator>
  );
}