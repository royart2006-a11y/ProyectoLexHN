import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export default function ArticleDetail({ route }: Props) {
  const { articleId } = route.params;
  const { esFavorito, toggleFavorito } = useFavorites();
  const { user } = useAuth();
  const { colors } = useTheme();

  const articulo = ARTICULOS.find((item) => item.id === articleId);

  if (!articulo) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFound, { color: colors.textSecondary }]}>Artículo no encontrado.</Text>
      </View>
    );
  }

  const marcado = esFavorito(articulo.id);
  const esAbogado = user?.role === "abogado";

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.articuloTitle, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>{articulo.articulo}</Text>
        <TouchableOpacity onPress={() => toggleFavorito(articulo.id)}>
          <Ionicons name={marcado ? "heart" : "heart-outline"} size={26} color={marcado ? "#8B2E2E" : colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.leyBadge, { backgroundColor: colors.accent, color: colors.primary }]}>{articulo.ley}</Text>
      <Text style={[styles.categoriaLabel, { color: colors.textSecondary }]}>Categoría: {articulo.categoria}</Text>

      <View style={[styles.modeBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name={esAbogado ? "briefcase-outline" : "person-outline"} size={14} color={colors.primary} />
        <Text style={[styles.modeBadgeText, { color: colors.primary }]}>{esAbogado ? "Vista técnica / legal" : "Vista para usuario general"}</Text>
      </View>

      {esAbogado ? (
        <>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Texto íntegro del artículo</Text>
          <Text style={[styles.resumenCompleto, { color: colors.text }]}>{articulo.resumenCompleto}</Text>
        </>
      ) : (
        <>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>En términos simples</Text>
          <Text style={[styles.resumenCompleto, { color: colors.text }]}>{articulo.resumen}</Text>
          <View style={[styles.divider, { backgroundColor: colors.accent }]} />
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Texto oficial del artículo</Text>
          <Text style={[styles.resumenCompleto, { color: colors.text }]}>{articulo.resumenCompleto}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  articuloTitle: { fontSize: 24, fontWeight: "bold" },
  leyBadge: { fontSize: 12, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 6, fontWeight: "600" },
  categoriaLabel: { fontSize: 13, marginBottom: 12, fontStyle: "italic" },
  modeBadge: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginBottom: 16, borderWidth: 1 },
  modeBadgeText: { fontSize: 12, marginLeft: 5, fontWeight: "bold" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  resumenCompleto: { fontSize: 15, lineHeight: 23 },
  divider: { height: 1, marginVertical: 22 },
  notFound: { fontSize: 16, textAlign: "center", marginTop: 40 },
});