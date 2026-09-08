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
      <Text style={styles.resumen} numberOfLines={2}>{resumen}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C9C2B4",
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#0B2545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  articulo: { fontWeight: "bold", fontSize: 15, color: "#0B2545" },
  ley: {
    fontSize: 11,
    color: "#0B2545",
    backgroundColor: "#EFE6D3", // tono dorado suave, tipo etiqueta oficial
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
    fontWeight: "600",
    overflow: "hidden",
  },
  resumen: { fontSize: 13, color: "#5C6B7A", lineHeight: 18 },
});