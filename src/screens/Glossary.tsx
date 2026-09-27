// src/screens/Glossary.tsx
import { useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import { useTheme } from "../context/ThemeContext";
import { GLOSARIO } from "../data/glosario";

export default function Glossary() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");

  const terminosOrdenados = useMemo(
    () => [...GLOSARIO].sort((a, b) => a.termino.localeCompare(b.termino)),
    []
  );

  const filtrados = terminosOrdenados.filter(
    (t) =>
      t.termino.toLowerCase().includes(query.toLowerCase()) ||
      t.significado.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>
        Glosario legal
      </Text>
      <CustomInput
        onChangeText={setQuery}
        value={query}
        placeholder="Buscar un término..."
        type="default"
      />

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.termino, { color: colors.primary }]}>{item.termino}</Text>
              <Text style={[styles.area, { backgroundColor: colors.accent, color: colors.primary }]}>{item.area}</Text>
            </View>
            <Text style={[styles.significado, { color: colors.textSecondary }]}>{item.significado}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No se encontraron términos.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 14 },
  card: { borderWidth: 1.5, borderRadius: 12, padding: 14, marginBottom: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  termino: { fontSize: 15, fontWeight: "bold", flex: 1, marginRight: 8 },
  area: { fontSize: 11, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, fontWeight: "600", overflow: "hidden" },
  significado: { fontSize: 13, lineHeight: 19 },
  emptyText: { textAlign: "center", marginTop: 30, fontSize: 13 },
});