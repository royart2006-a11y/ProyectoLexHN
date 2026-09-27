import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { CODIGOS } from "../data/codigos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "FullCodes">;

export default function FullCodes({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={CODIGOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate("PdfViewer", { codigoId: item.id, codigoNombre: item.nombre })}
          >
            <Ionicons name="document-text" size={28} color={colors.primary} />
            <View style={styles.cardText}>
              <Text style={[styles.cardTitle, { color: colors.primary }]}>{item.nombre}</Text>
              <Text style={[styles.cardArea, { color: colors.textSecondary }]}>{item.area}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderWidth: 1.5, borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: "row", alignItems: "center" },
  cardText: { marginLeft: 12, flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "bold" },
  cardArea: { fontSize: 12, marginTop: 2 },
});