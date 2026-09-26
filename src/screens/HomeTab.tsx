// src/screens/HomeTab.tsx
import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList, TabsParamList } from "../navigation/types";

// Igual que en tu proyecto de clase con Home.tsx: esta pantalla vive dentro
// de las Tabs, pero necesita navegar hacia pantallas del Stack padre
// (EssentialCodes, FullCodes), así que combina ambos tipos de navegación.
type Props = CompositeScreenProps<BottomTabScreenProps<TabsParamList, "Home">, NativeStackScreenProps<RootStackParamList>>;

export default function HomeTab({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué deseas consultar?</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("EssentialCodes")}>
        <Ionicons name="bulb-outline" size={30} color="#0B2545" />
        <Text style={styles.cardTitle}>Artículos esenciales</Text>
        <Text style={styles.cardSubtitle}>Resúmenes por código, en lenguaje sencillo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("FullCodes")}>
        <Ionicons name="document-text-outline" size={30} color="#0B2545" />
        <Text style={styles.cardTitle}>Códigos completos</Text>
        <Text style={styles.cardSubtitle}>El texto oficial completo, en formato PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EFE6", padding: 24, justifyContent: "center" },
  title: {
    fontSize: 22, fontWeight: "bold", color: "#0B2545", textAlign: "center",
    marginBottom: 24, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  card: {
    backgroundColor: "#FFFFFF", borderColor: "#C9C2B4", borderWidth: 1.5,
    borderRadius: 14, padding: 20, marginBottom: 16, alignItems: "center",
  },
  cardTitle: { fontSize: 17, fontWeight: "bold", color: "#0B2545", marginTop: 10 },
  cardSubtitle: { fontSize: 12, color: "#5C6B7A", marginTop: 4, textAlign: "center" },
});