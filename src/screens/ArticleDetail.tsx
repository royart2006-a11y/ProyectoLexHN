// src/screens/ArticleDetail.tsx
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";


type Props = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export default function ArticleDetail({ route }: Props) {
  const { articleId } = route.params;
  const { esFavorito, toggleFavorito } = useFavorites();

  const articulo = ARTICULOS.find((item) => item.id === articleId);

  if (!articulo) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Artículo no encontrado.</Text>
      </View>
    );
  }

  const marcado = esFavorito(articulo.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.articuloTitle}>{articulo.articulo}</Text>
        <TouchableOpacity onPress={() => toggleFavorito(articulo.id)}>
          <Ionicons
            name={marcado ? "heart" : "heart-outline"}
            size={26}
            color={marcado ? "#e74c3c" : "gray"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.leyBadge}>{articulo.ley}</Text>
      <Text style={styles.categoriaLabel}>Categoría: {articulo.categoria}</Text>

      <Text style={styles.sectionTitle}>Explicación</Text>
      <Text style={styles.resumenCompleto}>{articulo.resumenCompleto}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  articuloTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#206291",
  },
  leyBadge: {
    fontSize: 13,
    color: "gray",
    backgroundColor: "#e8f0f7",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  categoriaLabel: {
    fontSize: 13,
    color: "gray",
    marginBottom: 20,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resumenCompleto: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
  notFound: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 40,
  },
});