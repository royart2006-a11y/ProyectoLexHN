// src/screens/Favorites.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ArticleCard from "../components/ArticleCard";

import { useFavorites } from "../context/FavoritesContext";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Favorites() {
  // 'favoritos' aquí ya viene FILTRADO por usuario desde el contexto
  // (gracias al fix que hicimos indexando por email)
  const { favoritos } = useFavorites();
  const navigation = useNavigation<NavProp>();

  // Cruzamos los IDs guardados como favoritos contra la fuente completa de artículos,
  // para obtener los objetos completos (no solo los IDs) y poder mostrarlos en tarjetas
  const articulosFavoritos = ARTICULOS.filter((item) => favoritos.includes(item.id));

  // Estado vacío: mejor UX que mostrar una lista en blanco sin explicación
  if (articulosFavoritos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Aún no tienes favoritos</Text>
        <Text style={styles.emptySubtitle}>Marca un artículo con el ícono de corazón para guardarlo aquí.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articulosFavoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard
            articulo={item.articulo}
            ley={item.ley}
            resumen={item.resumen}
            onPress={() => navigation.navigate("ArticleDetail", { articleId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  emptyTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  emptySubtitle: { fontSize: 13, color: "gray", textAlign: "center" },
});