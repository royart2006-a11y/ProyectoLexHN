import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import ArticleCard from "../components/ArticleCard";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Favorites() {
  const { favoritos, loading } = useFavorites();
  const navigation = useNavigation<NavProp>();
  const { colors } = useTheme();

  const articulosFavoritos = ARTICULOS.filter((item) => favoritos.includes(item.id));

  if (!loading && articulosFavoritos.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyTitle, { color: colors.primary }]}>Aún no tienes favoritos</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>Marca un artículo con el ícono de corazón para guardarlo aquí.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.screenTitle, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>Tus favoritos</Text>
      <FlatList
        data={articulosFavoritos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ArticleCard articulo={item.articulo} ley={item.ley} resumen={item.resumen} onPress={() => navigation.navigate("ArticleDetail", { articleId: item.id })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  screenTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 14 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  emptyTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  emptySubtitle: { fontSize: 13, textAlign: "center" },
});