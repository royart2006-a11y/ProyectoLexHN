import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

// Esta pantalla SÍ vive directo en el Stack (no en Tabs), por eso recibe
// 'route' como prop directamente, en vez de usar el hook useRoute().
type Props = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export default function ArticleDetail({ route }: Props) {
  // route.params contiene exactamente lo que Types.ts definió para esta pantalla: { articleId: string }
  const { articleId } = route.params;

  const { esFavorito, toggleFavorito } = useFavorites();
  const { usuarioActual } = useAuth();

  // Buscamos el artículo completo en la fuente de datos usando el ID recibido por navegación
  const articulo = ARTICULOS.find((item) => item.id === articleId);

  // Comportamiento defensivo: si el ID no corresponde a ningún artículo real,
  // mostramos un mensaje en vez de dejar que la app truene al leer 'articulo.algo'
  if (!articulo) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Artículo no encontrado.</Text>
      </View>
    );
  }

  const marcado = esFavorito(articulo.id);
  // Optional chaining (?.) porque usuarioActual PODRÍA ser null en teoría;
  // si lo es, esAbogado simplemente da 'false' en vez de tronar.
  const esAbogado = usuarioActual?.tipoUsuario === "abogado";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.articuloTitle}>{articulo.articulo}</Text>
        <TouchableOpacity onPress={() => toggleFavorito(articulo.id)}>
          {/* El ícono y color cambian según si YA es favorito o no (comportamiento condicionado) */}
          <Ionicons name={marcado ? "heart" : "heart-outline"} size={26} color={marcado ? "#e74c3c" : "gray"} />
        </TouchableOpacity>
      </View>

      <Text style={styles.leyBadge}>{articulo.ley}</Text>
      <Text style={styles.categoriaLabel}>Categoría: {articulo.categoria}</Text>

      {/* Etiqueta visual que le confirma al usuario qué "modo de lectura" está viendo */}
      <View style={[styles.modeBadge, esAbogado ? styles.modeBadgeAbogado : styles.modeBadgeUsuario]}>
        <Ionicons name={esAbogado ? "briefcase-outline" : "person-outline"} size={14} color={esAbogado ? "#206291" : "#2e7d32"} />
        <Text style={[styles.modeBadgeText, esAbogado && styles.modeBadgeTextAbogado]}>
          {esAbogado ? "Vista técnica / legal" : "Vista para usuario general"}
        </Text>
      </View>

      {esAbogado ? (
        // Rama para "abogado": solo el texto legal íntegro
        <>
          <Text style={styles.sectionTitle}>Texto íntegro del artículo</Text>
          <Text style={styles.resumenCompleto}>{articulo.resumenCompleto}</Text>
        </>
      ) : (
        // Rama para "usuario": AMBAS versiones, simplificada primero, oficial después como respaldo
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
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  articuloTitle: { fontSize: 22, fontWeight: "bold", color: "#206291" },
  leyBadge: { fontSize: 13, color: "gray", backgroundColor: "#e8f0f7", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 6 },
  categoriaLabel: { fontSize: 13, color: "gray", marginBottom: 12, fontStyle: "italic" },
  modeBadge: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginBottom: 16 },
  modeBadgeUsuario: { backgroundColor: "#e8f5e9" },
  modeBadgeAbogado: { backgroundColor: "#e8f0f7" },
  modeBadgeText: { fontSize: 12, color: "#2e7d32", marginLeft: 5, fontWeight: "bold" },
  modeBadgeTextAbogado: { color: "#206291" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  resumenCompleto: { fontSize: 15, lineHeight: 22, color: "#333" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 20 },
  notFound: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 40 },
});