import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ArticleDetail from "../screens/ArticleDetail";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Crear cuenta" }}
      />
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