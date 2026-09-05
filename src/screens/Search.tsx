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

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIA_TODAS = "Todas";

export default function Search() {
  const [query, setQuery] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(CATEGORIA_TODAS);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavProp>();

  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(ARTICULOS.map((item) => item.categoria)));
    return [CATEGORIA_TODAS, ...unicas];
  }, []);

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
    setModalVisible(false); // cierra el modal automáticamente al elegir
  };

  return (
    <View style={styles.container}>
      {/* Fila del buscador + botón de filtro */}
      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <CustomInput
            onChangeText={setQuery}
            value={query}
            placeholder="Buscar por palabra clave..."
            type="default"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={22} color="#206291" />
        </TouchableOpacity>
      </View>

      {/* Indicador de filtro activo, visible solo si hay uno distinto de "Todas" */}
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
            onPress={() =>
              navigation.navigate("ArticleDetail", { articleId: item.id })
            }
          />
        )}
      />

      {/* Modal de filtro por categoría, tipo bottom sheet */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Fondo semitransparente: al tocarlo, cierra el modal */}
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}>
          {/* Pressable interno para que tocar la tarjeta NO cierre el modal (evita propagación) */}
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Filtrar por categoría</Text>
            <FlatList
              data={categorias}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryOption}
                  onPress={() => seleccionarCategoria(item)}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      categoriaSeleccionada === item && styles.categoryOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {categoriaSeleccionada === item && (
                    <Ionicons name="checkmark" size={20} color="#206291" />
                  )}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
  },
  filterButton: {
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: "#e8f0f7",
    padding: 12,
    borderRadius: 9,
  },
  activeFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activeFilterText: {
    fontSize: 13,
    color: "#206291",
    marginRight: 6,
    fontWeight: "bold",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 12,
  },
  categoryOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoryOptionText: {
    fontSize: 15,
    color: "#333",
  },
  categoryOptionTextSelected: {
    color: "#206291",
    fontWeight: "bold",
  },
});