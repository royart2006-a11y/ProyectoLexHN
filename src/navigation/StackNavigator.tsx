import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticleDetail from "../screens/ArticleDetail";
import EssentialCodes from "../screens/EssentialCodes";
import FullCodes from "../screens/FullCodes";
import Login from "../screens/Login";
import PdfViewer from "../screens/PdfViewer";
import Register from "../screens/Register";
import Search from "../screens/Search";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ title: "Crear cuenta" }} />
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="EssentialCodes" component={EssentialCodes} options={{ title: "Artículos esenciales" }} />
      <Stack.Screen name="FullCodes" component={FullCodes} options={{ title: "Códigos completos" }} />
      <Stack.Screen name="Search" component={Search} options={{ title: "Buscar" }} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} options={{ title: "Detalle del artículo" }} />
      <Stack.Screen name="PdfViewer" component={PdfViewer} options={({ route }) => ({ title: route.params.codigoNombre })} />
    </Stack.Navigator>
  );
}