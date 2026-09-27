import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleCard from "../components/ArticleCard";
import CustomInput from "../components/CustomInput";
import { useTheme } from "../context/ThemeContext";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;
const CATEGORIA_TODAS = "Todas";

export default function Search({ route, navigation }: Props) {
  const { codigoId, codigoNombre } = route.params;
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(CATEGORIA_TODAS);
  const [modalVisible, setModalVisible] = useState(false);

  const articulosDelCodigo = useMemo(() => ARTICULOS.filter((item) => item.codigoId === codigoId), [codigoId]);

  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(articulosDelCodigo.map((item) => item.categoria)));
    return [CATEGORIA_TODAS, ...unicas];
  }, [articulosDelCodigo]);

  const filteredArticles = articulosDelCodigo.filter((item) => {
    const coincideTexto =
      item.articulo.toLowerCase().includes(query.toLowerCase()) ||
      item.resumen.toLowerCase().includes(query.toLowerCase()) ||
      item.categoria.toLowerCase().includes(query.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === CATEGORIA_TODAS || item.categoria === categoriaSeleccionada;
    return coincideTexto && coincideCategoria;
  });

  const seleccionarCategoria = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.screenTitle, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>{codigoNombre}</Text>

      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <CustomInput onChangeText={setQuery} value={query} placeholder="Buscar por palabra clave..." type="default" containerStyle={styles.searchInput} />
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.primary }]} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={22} color={colors.background} />
        </TouchableOpacity>
      </View>

      {categoriaSeleccionada !== CATEGORIA_TODAS && (
        <View style={styles.activeFilterRow}>
          <Text style={[styles.activeFilterText, { color: colors.primary }]}>Filtro: {categoriaSeleccionada}</Text>
          <TouchableOpacity onPress={() => setCategoriaSeleccionada(CATEGORIA_TODAS)}>
            <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}

      {filteredArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: colors.primary }]}>Aún no hay artículos esenciales aquí</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>Este código está en preparación.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <ArticleCard articulo={item.articulo} ley={item.ley} resumen={item.resumen} onPress={() => navigation.navigate("ArticleDetail", { articleId: item.id })} />
          )}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}>
          <Pressable style={[styles.sheet, { backgroundColor: colors.background }]} onPress={(e) => e.stopPropagation()}>
            <Text style={[styles.sheetTitle, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>Filtrar por categoría</Text>
            <FlatList
              data={categorias}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.categoryOption, { borderBottomColor: colors.border }]} onPress={() => seleccionarCategoria(item)}>
                  <Text style={[styles.categoryOptionText, { color: categoriaSeleccionada === item ? colors.primary : colors.textSecondary }, categoriaSeleccionada === item && styles.categoryOptionTextSelected]}>
                    {item}
                  </Text>
                  {categoriaSeleccionada === item && <Ionicons name="checkmark" size={20} color={colors.primary} />}
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
  container: { flex: 1, padding: 16 },
  screenTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 14 },
  searchRow: { flexDirection: "row", alignItems: "center" },
  inputWrapper: { flex: 1 },
  searchInput: { borderRadius: 12 },
  filterButton: { marginLeft: 10, marginBottom: 10, padding: 13, borderRadius: 12 },
  activeFilterRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  activeFilterText: { fontSize: 13, marginRight: 6, fontWeight: "bold" },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontSize: 15, fontWeight: "bold" },
  emptySubtitle: { fontSize: 13, marginTop: 4 },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: "70%" },
  sheetTitle: { fontSize: 17, fontWeight: "bold", marginBottom: 12 },
  categoryOption: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1 },
  categoryOptionText: { fontSize: 15 },
  categoryOptionTextSelected: { fontWeight: "bold" },
});