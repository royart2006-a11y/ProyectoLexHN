// src/screens/Search.tsx (cambios clave respecto a tu versión anterior)
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleCard from "../components/ArticleCard";
import CustomInput from "../components/CustomInput";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;
const CATEGORIA_TODAS = "Todas";

export default function Search({ route, navigation }: Props) {
  const { codigoId, codigoNombre } = route.params; // ya no es un Tab, ahora SIEMPRE recibe estos parámetros

  const [query, setQuery] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(CATEGORIA_TODAS);
  const [modalVisible, setModalVisible] = useState(false);

  // Primer filtro: solo artículos que pertenecen al código seleccionado
  const articulosDelCodigo = useMemo(
    () => ARTICULOS.filter((item) => item.codigoId === codigoId),
    [codigoId]
  );

  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(articulosDelCodigo.map((item) => item.categoria)));
    return [CATEGORIA_TODAS, ...unicas];
  }, [articulosDelCodigo]);

  const filteredArticles = articulosDelCodigo.filter((item) => {
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
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>{codigoNombre}</Text>

      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <CustomInput
            onChangeText={setQuery}
            value={query}
            placeholder="Buscar por palabra clave..."
            type="default"
            containerStyle={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={22} color="#F4EFE6" />
        </TouchableOpacity>
      </View>

      {categoriaSeleccionada !== CATEGORIA_TODAS && (
        <View style={styles.activeFilterRow}>
          <Text style={styles.activeFilterText}>Filtro: {categoriaSeleccionada}</Text>
          <TouchableOpacity onPress={() => setCategoriaSeleccionada(CATEGORIA_TODAS)}>
            <Ionicons name="close-circle" size={18} color="#5C6B7A" />
          </TouchableOpacity>
        </View>
      )}

      {/* Estado vacío: importante ahora, porque otros códigos aún no tienen artículos cargados */}
      {filteredArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Aún no hay artículos esenciales aquí</Text>
          <Text style={styles.emptySubtitle}>Este código está en preparación.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredArticles}
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
      )}

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}>
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
                  {categoriaSeleccionada === item && <Ionicons name="checkmark" size={20} color="#0B2545" />}
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
  container: { flex: 1, backgroundColor: "#F4EFE6", padding: 16 },
  screenTitle: { fontSize: 20, fontWeight: "bold", color: "#0B2545", marginBottom: 14, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" },
  searchRow: { flexDirection: "row", alignItems: "center" },
  inputWrapper: { flex: 1 },
  searchInput: { backgroundColor: "#FFFFFF", borderColor: "#C9C2B4", borderWidth: 1.5, borderRadius: 12 },
  filterButton: { marginLeft: 10, marginBottom: 10, backgroundColor: "#0B2545", padding: 13, borderRadius: 12 },
  activeFilterRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  activeFilterText: { fontSize: 13, color: "#0B2545", marginRight: 6, fontWeight: "bold" },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontSize: 15, fontWeight: "bold", color: "#0B2545" },
  emptySubtitle: { fontSize: 13, color: "#5C6B7A", marginTop: 4 },
  backdrop: { flex: 1, backgroundColor: "rgba(11,37,69,0.5)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#F4EFE6", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: "70%" },
  sheetTitle: { fontSize: 17, fontWeight: "bold", color: "#0B2545", marginBottom: 12, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" },
  categoryOption: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#E0D8C7" },
  categoryOptionText: { fontSize: 15, color: "#5C6B7A" },
  categoryOptionTextSelected: { color: "#0B2545", fontWeight: "bold" },
});