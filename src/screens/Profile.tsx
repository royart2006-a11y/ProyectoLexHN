// src/screens/Profile.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const navigation = useNavigation<NavProp>();
  const { usuarioActual, cerrarSesion } = useAuth();

  const handleLogout = () => {
    cerrarSesion(); // limpia usuarioActual en el contexto
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/temis.png")}
        style={styles.avatar}
        resizeMode="contain"
      />
      <Text style={styles.name}>
        {usuarioActual?.tipoUsuario === "abogado" ? "Persona de derecho" : "Usuario de LexHN"}
      </Text>
      <Text style={styles.email}>{usuarioActual?.email ?? "Sin sesión"}</Text>

      <View style={styles.divider} />

      <CustomButton title="Cerrar sesión" onPress={handleLogout} variant="secondary" style={styles.logoutButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EFE6", alignItems: "center", justifyContent: "center", padding: 24 },
  avatar: { width: 100, height: 100, marginBottom: 14 },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0B2545",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  email: { fontSize: 13, color: "#5C6B7A", marginTop: 4, marginBottom: 10 },
  divider: { width: 60, height: 3, backgroundColor: "#D9C9A3", borderRadius: 2, marginVertical: 20 },
  logoutButton: { width: 180 },
});