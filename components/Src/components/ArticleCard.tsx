// src/components/ArticleCard.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ArticleCardProps = {
  articulo: string;
  ley: string;
  resumen: string;
  onPress: () => void;
};

export default function ArticleCard({ articulo, ley, resumen, onPress }: ArticleCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.articulo}>{articulo}</Text>
        <Text style={styles.ley}>{ley}</Text>
      </View>
      <Text style={styles.resumen} numberOfLines={2}>
        {resumen}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    // Sombra ligera para que la tarjeta "flote" un poco sobre el fondo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  articulo: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#206291",
  },
  ley: {
    fontSize: 12,
    color: "gray",
    backgroundColor: "#e8f0f7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  resumen: {
    fontSize: 13,
    color: "#333",
  },
});