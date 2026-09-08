// src/screens/ArticleDetail.tsx
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export default function ArticleDetail({ route }: Props) {
  const { articleId } = route.params;
  const { esFavorito, toggleFavorito } = useFavorites();
  const { usuarioActual } = useAuth();

  const articulo = ARTICULOS.find((item) => item.id === articleId);

  if (!articulo) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Artículo no encontrado.</Text>
      </View>
    );
  }

  const marcado = esFavorito(articulo.id);
  const esAbogado = usuarioActual?.tipoUsuario === "abogado";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.articuloTitle}>{articulo.articulo}</Text>
        <TouchableOpacity onPress={() => toggleFavorito(articulo.id)}>
          <Ionicons name={marcado ? "heart" : "heart-outline"} size={26} color={marcado ? "#8B2E2E" : "#5C6B7A"} />
        </TouchableOpacity>
      </View>

      <Text style={styles.leyBadge}>{articulo.ley}</Text>
      <Text style={styles.categoriaLabel}>Categoría: {articulo.categoria}</Text>

      <View style={[styles.modeBadge, esAbogado ? styles.modeBadgeAbogado : styles.modeBadgeUsuario]}>
        <Ionicons name={esAbogado ? "briefcase-outline" : "person-outline"} size={14} color="#0B2545" />
        <Text style={styles.modeBadgeText}>
          {esAbogado ? "Vista técnica / legal" : "Vista para usuario general"}
        </Text>
      </View>

      {esAbogado ? (
        <>
          <Text style={styles.sectionTitle}>Texto íntegro del artículo</Text>
          <Text style={styles.resumenCompleto}>{articulo.resumenCompleto}</Text>
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>En términos simples</Text>
          <Text style={styles.resumenCompleto}>{articulo.resumen}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Texto oficial del artículo</Text>
          <Text style={styles.resumenCompleto}>{articulo.resumenCompleto}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EFE6", padding: 22 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  articuloTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B2545",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  leyBadge: {
    fontSize: 12,
    color: "#0B2545",
    backgroundColor: "#EFE6D3",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
    fontWeight: "600",
  },
  categoriaLabel: { fontSize: 13, color: "#5C6B7A", marginBottom: 12, fontStyle: "italic" },
  modeBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C9C2B4",
  },
  modeBadgeUsuario: {},
  modeBadgeAbogado: {},
  modeBadgeText: { fontSize: 12, color: "#0B2545", marginLeft: 5, fontWeight: "bold" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#0B2545", marginBottom: 8 },
  resumenCompleto: { fontSize: 15, lineHeight: 23, color: "#3E4C59" },
  divider: { height: 1, backgroundColor: "#D9C9A3", marginVertical: 22 },
  notFound: { fontSize: 16, color: "#5C6B7A", textAlign: "center", marginTop: 40 },
});