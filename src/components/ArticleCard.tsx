import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ArticleCardProps = {
  articulo: string;   // ej. "Art. 46"
  ley: string;        // ej. "Código Civil"
  resumen: string;    // texto corto para la vista de lista
  onPress: () => void; // qué pasa al tocar la tarjeta (navegar al detalle)
};

export default function ArticleCard({ articulo, ley, resumen, onPress }: ArticleCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.articulo}>{articulo}</Text>
        <Text style={styles.ley}>{ley}</Text>
      </View>
      {/* numberOfLines corta el texto con "..." si es muy largo, para no romper el diseño de la tarjeta */}
      <Text style={styles.resumen} numberOfLines={2}>{resumen}</Text>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // artículo a la izquierda, ley (badge) a la derecha
    alignItems: "center",
    marginBottom: 6,
  },
  articulo: { fontWeight: "bold", fontSize: 15, color: "#206291" },
  ley: {
    fontSize: 12, color: "gray", backgroundColor: "#e8f0f7",
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  resumen: { fontSize: 13, color: "#333" },
});