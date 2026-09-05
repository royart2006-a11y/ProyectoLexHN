// src/screens/Search.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleCard from "../components/ArticleCard";
import CustomInput from "../components/CustomInput";

import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

// A diferencia de Login/Register (que reciben 'navigation' como prop porque
// son pantallas directas del Stack), Search vive DENTRO del TabNavigator.
// Por eso usamos el hook useNavigation() en vez de recibirlo como prop:
// necesitamos "subir" hasta el Stack padre para poder navegar a ArticleDetail.
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIA_TODAS = "Todas"; // valor especial que representa "sin filtro de categoría"

export default function Search() {
  const [query, setQuery] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(CATEGORIA_TODAS);
  const [modalVisible, setModalVisible] = useState(false); // controla si el modal de filtro está abierto
  const navigation = useNavigation<NavProp>();

  // useMemo evita recalcular la lista de categorías únicas en cada render;
  // solo se recalcula si ARTICULOS cambiara (lo cual no pasa en esta app).
  const categorias = useMemo(() => {
    // Set elimina duplicados; Array.from lo convierte de vuelta a array normal
    const unicas = Array.from(new Set(ARTICULOS.map((item) => item.categoria)));
    return [CATEGORIA_TODAS, ...unicas];
  }, []);

  // Filtro combinado: el artículo debe cumplir AMBAS condiciones (&&) para mostrarse
  const filteredArticles = ARTICULOS.filter((item) => {
    const coincideTexto =
      item.articulo.toLowerCase().includes(query.toLowerCase()) ||
      item.resumen.toLowerCase().includes(query.toLowerCase()) ||
      item.categoria.toLowerCase().includes(query.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === CATEGORIA_TODAS || item.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  const seleccionarCategoria = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
    setModalVisible(false); // UX: cerramos el modal automáticamente al elegir, sin botón extra
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <CustomInput onChangeText={setQuery} value={query} placeholder="Buscar por palabra clave..." type="default" />
        </View>
        {/* Botón que abre el modal de filtros (las "tres rayitas" conceptualmente, aquí un ícono de filtro) */}
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={22} color="#206291" />
        </TouchableOpacity>
      </View>

      {/* Solo se muestra si hay un filtro activo distinto de "Todas" */}
      {categoriaSeleccionada !== CATEGORIA_TODAS && (
        <View style={styles.activeFilterRow}>
          <Text style={styles.activeFilterText}>Filtro: {categoriaSeleccionada}</Text>
          <TouchableOpacity onPress={() => setCategoriaSeleccionada(CATEGORIA_TODAS)}>
            <Ionicons name="close-circle" size={18} color="gray" />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredArticles}
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

      {/* Modal tipo "bottom sheet": aparece deslizándose desde abajo */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        {/* Pressable exterior: tocar el fondo oscuro cierra el modal */}
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}>
          {/* Pressable interior: stopPropagation evita que tocar DENTRO de la tarjeta blanca
              también dispare el onPress del fondo (que cerraría el modal sin querer) */}
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Filtrar por categoría</Text>
            <FlatList
              data={categorias}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryOption} onPress={() => seleccionarCategoria(item)}>
                  <Text style={[styles.categoryOptionText, categoriaSeleccionada === item && styles.categoryOptionTextSelected]}>
                    {item}
                  </Text>
                  {/* El checkmark solo aparece junto a la opción actualmente seleccionada */}
                  {categoriaSeleccionada === item && <Ionicons name="checkmark" size={20} color="#206291" />}
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  searchRow: { flexDirection: "row", alignItems: "center" },
  inputWrapper: { flex: 1 }, // el input ocupa todo el espacio disponible, empujando el botón de filtro a la derecha
  filterButton: { marginLeft: 10, marginBottom: 10, backgroundColor: "#e8f0f7", padding: 12, borderRadius: 9 },
  activeFilterRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  activeFilterText: { fontSize: 13, color: "#206291", marginRight: 6, fontWeight: "bold" },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" }, // empuja el sheet hacia abajo
  sheet: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: "70%" },
  sheetTitle: { fontSize: 17, fontWeight: "bold", marginBottom: 12 },
  categoryOption: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  categoryOptionText: { fontSize: 15, color: "#333" },
  categoryOptionTextSelected: { color: "#206291", fontWeight: "bold" },
});