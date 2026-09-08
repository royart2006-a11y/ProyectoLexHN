// src/screens/Favorites.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import ArticleCard from "../components/ArticleCard";

import { useFavorites } from "../context/FavoritesContext";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Favorites() {
  const { favoritos } = useFavorites();
  const navigation = useNavigation<NavProp>();

  const articulosFavoritos = ARTICULOS.filter((item) => favoritos.includes(item.id));

  if (articulosFavoritos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Aún no tienes favoritos</Text>
        <Text style={styles.emptySubtitle}>
          Marca un artículo con el ícono de corazón para guardarlo aquí.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Tus favoritos</Text>
      <FlatList
        data={articulosFavoritos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
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
  container: { flex: 1, backgroundColor: "#F4EFE6", padding: 16 },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0B2545",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 14,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#F4EFE6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#0B2545", marginBottom: 6 },
  emptySubtitle: { fontSize: 13, color: "#5C6B7A", textAlign: "center" },
});