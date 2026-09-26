// src/screens/FullCodes.tsx
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CODIGOS } from "../data/codigos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "FullCodes">;

export default function FullCodes({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={CODIGOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PdfViewer", { codigoId: item.id, codigoNombre: item.nombre })}
          >
            <Ionicons name="document-text" size={28} color="#0B2545" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardArea}>{item.area}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#5C6B7A" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EFE6", padding: 16 },
  card: {
    backgroundColor: "#FFFFFF", borderColor: "#C9C2B4", borderWidth: 1.5,
    borderRadius: 12, padding: 16, marginBottom: 12,
    flexDirection: "row", alignItems: "center",
  },
  cardText: { marginLeft: 12, flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#0B2545" },
  cardArea: { fontSize: 12, color: "#5C6B7A", marginTop: 2 },
});