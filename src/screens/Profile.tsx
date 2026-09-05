import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../navigation/types";


type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const navigation = useNavigation<NavProp>();

  const handleLogout = () => {
    // reset() limpia TODO el historial de navegación y deja solo "Login".
    // Sin esto, el usuario podría presionar "atrás" después de cerrar sesión
    // y volver a ver las Tabs como si nada.
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/temis.png")} style={styles.avatar} resizeMode="contain" />
      <Text style={styles.name}>Usuario de LexHN</Text>
      <Text style={styles.email}>usuario@ejemplo.com</Text>

      <View style={styles.spacer} />

      <CustomButton title="Cerrar sesión" onPress={handleLogout} variant="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", padding: 20 },
  avatar: { width: 90, height: 90, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "bold" },
  email: { fontSize: 13, color: "gray", marginBottom: 10 },
  spacer: { height: 30 },
});