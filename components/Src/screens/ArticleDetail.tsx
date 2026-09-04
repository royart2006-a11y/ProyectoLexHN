// src/screens/ArticleDetail.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/Types";


type Props = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export default function ArticleDetail({ route }: Props) {
  const { articleId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalle del artículo ID: {articleId}</Text>
      <Text style={styles.pending}>(Contenido real pendiente)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  text: { fontSize: 18, fontWeight: "bold" },
  pending: { color: "gray", marginTop: 8 },
});