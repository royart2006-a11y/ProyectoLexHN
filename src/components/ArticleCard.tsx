import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type ArticleCardProps = {
  articulo: string;
  ley: string;
  resumen: string;
  onPress: () => void;
};

export default function ArticleCard({ articulo, ley, resumen, onPress }: ArticleCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={[styles.articulo, { color: colors.primary }]}>{articulo}</Text>
        <Text style={[styles.ley, { backgroundColor: colors.accent, color: colors.primary }]}>{ley}</Text>
      </View>
      <Text style={[styles.resumen, { color: colors.textSecondary }]} numberOfLines={2}>{resumen}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1.5, borderRadius: 12, padding: 16, marginBottom: 12 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  articulo: { fontWeight: "bold", fontSize: 15 },
  ley: { fontSize: 11, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 6, fontWeight: "600", overflow: "hidden" },
  resumen: { fontSize: 13, lineHeight: 18 },
});