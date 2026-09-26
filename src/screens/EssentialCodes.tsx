// src/screens/EssentialCodes.tsx
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CODIGOS } from "../data/codigos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "EssentialCodes">;

export default function EssentialCodes({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={CODIGOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Search", { codigoId: item.id, codigoNombre: item.nombre })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Ionicons name="chevron-forward" size={20} color="#5C6B7A" />
            </View>
            <Text style={styles.cardArea}>{item.area}</Text>
            <Text style={styles.cardDesc}>{item.descripcion}</Text>
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
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#0B2545" },
  cardArea: { fontSize: 12, color: "#0B2545", fontWeight: "600", marginTop: 2 },
  cardDesc: { fontSize: 13, color: "#5C6B7A", marginTop: 6 },
});