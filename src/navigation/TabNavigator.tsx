import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import { TabsParamList } from "./types";


// El genérico <TabsParamList> le dice a TypeScript qué pestañas existen
// y qué parámetros espera cada una (en este caso, ninguna: todas son 'undefined').
const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabNavigator() {
  return (
    // screenOptions aplica a TODAS las pestañas por defecto; cada Tab.Screen
    // puede sobreescribir lo que necesite en su propio 'options'.
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          title: "Buscar", // texto que aparece en el header Y debajo del ícono en la barra de tabs
          // tabBarIcon es una función que React Navigation llama automáticamente,
          // pasándole 'color' y 'size' ya calculados según si la pestaña está activa o no.
          // Así el ícono cambia de color solo, sin que nosotros manejemos ese estado.
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}