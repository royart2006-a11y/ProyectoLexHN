// src/screens/Search.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ArticleCard from "../components/ArticleCard";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../navigation/Types";


// Datos de ejemplo — se reemplazan luego con el contenido real del área civil
const ARTICULOS_PLACEHOLDER = [
  { id: "1", articulo: "Art. 12", ley: "Código Civil", resumen: "Resumen de ejemplo pendiente de reemplazar con contenido real." },
  { id: "2", articulo: "Art. 45", ley: "Código Civil", resumen: "Resumen de ejemplo pendiente de reemplazar con contenido real." },
];

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Search() {
  const [query, setQuery] = useState("");
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <CustomInput
        onChangeText={setQuery}
        value={query}
        placeholder="Buscar por palabra clave..."
        type="default"
      />
      <FlatList
        data={ARTICULOS_PLACEHOLDER}
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