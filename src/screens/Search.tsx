// src/screens/Search.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ArticleCard from "../components/ArticleCard";
import CustomInput from "../components/CustomInput";
import { ARTICULOS } from "../data/articulos";
import { RootStackParamList } from "../navigation/types";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Search() {
  const [query, setQuery] = useState("");
  const navigation = useNavigation<NavProp>();

  const filteredArticles = ARTICULOS.filter(
    (item) =>
      item.articulo.toLowerCase().includes(query.toLowerCase()) ||
      item.resumen.toLowerCase().includes(query.toLowerCase()) ||
      item.categoria.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <CustomInput
        onChangeText={setQuery}
        value={query}
        placeholder="Buscar por palabra clave..."
        type="default"
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});