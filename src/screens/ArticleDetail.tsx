// src/screens/ArticleDetail.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export default function ArticleDetail({ route }: Props) {
  const { articleId } = route.params;

  // Busca el artículo correspondiente en la fuente de datos compartida
  const articulo = ARTICULOS.find((item) => item.id === articleId);

  // Comportamiento condicionado: si por alguna razón el ID no existe, mostramos un aviso
  if (!articulo) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Artículo no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.articuloTitle}>{articulo.articulo}</Text>
        <Text style={styles.leyBadge}>{articulo.ley}</Text>
      </View>

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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
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