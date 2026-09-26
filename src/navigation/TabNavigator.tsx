import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../screens/Favorites";
import HomeTab from "../screens/HomeTab";
import Profile from "../screens/Profile";
import { TabsParamList } from "./types";

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Home" component={HomeTab} options={{
        title: "Inicio",
        tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
      }} />
      <Tab.Screen name="Favorites" component={Favorites} options={{
        title: "Favoritos",
        tabBarIcon: ({ color, size }) => <MaterialIcons name="bookmark" size={size} color={color} />,
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        title: "Perfil",
        tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
      }} />
    </Tab.Navigator>
  );
}