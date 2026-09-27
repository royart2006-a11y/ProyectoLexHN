// src/screens/HomeTab.tsx
import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { RootStackParamList, TabsParamList } from "../navigation/types";

// Igual que en el proyecto de clase con Home.tsx: esta pantalla vive dentro
// de las Tabs, pero necesita navegar hacia pantallas del Stack padre
// (EssentialCodes, FullCodes), así que combina ambos tipos de navegación.
type Props = CompositeScreenProps<BottomTabScreenProps<TabsParamList, "Home">, NativeStackScreenProps<RootStackParamList>>;

export default function HomeTab({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>
        ¿Qué deseas consultar?
      </Text>

      <TouchableOpacity style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("EssentialCodes")}>
        <Ionicons name="bulb-outline" size={30} color={colors.primary} />
        <Text style={[styles.cardTitle, { color: colors.primary }]}>Artículos esenciales</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>Resúmenes por código, en lenguaje sencillo</Text>
      </TouchableOpacity>

           <TouchableOpacity style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("FullCodes")}>
        <Ionicons name="document-text-outline" size={30} color={colors.primary} />
        <Text style={[styles.cardTitle, { color: colors.primary }]}>Códigos completos</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>El texto oficial completo, en formato PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("Glossary")}>
        <Ionicons name="book-outline" size={30} color={colors.primary} />
        <Text style={[styles.cardTitle, { color: colors.primary }]}>Glosario legal</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>Términos técnicos explicados de forma sencilla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  card: { borderWidth: 1.5, borderRadius: 14, padding: 20, marginBottom: 16, alignItems: "center" },
  cardTitle: { fontSize: 17, fontWeight: "bold", marginTop: 10 },
  cardSubtitle: { fontSize: 12, marginTop: 4, textAlign: "center" },
});