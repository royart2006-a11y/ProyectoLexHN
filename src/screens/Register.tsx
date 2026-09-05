// src/screens/Register.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CategoryChip from "../components/CategoryChip"; // reutilizado del filtro de Search
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { TipoUsuario, useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Por defecto, cualquiera que llegue aquí se registra como "usuario" común,
  // a menos que elija explícitamente "abogado" con el chip.
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("usuario");
  const [registerError, setRegisterError] = useState<string | null>(null);

  const { registrarUsuario } = useAuth();

  const handleRegister = () => {
    // Validaciones manuales ANTES de intentar registrar (evita llamar al contexto en vano)
    if (!email.includes("@")) {
      setRegisterError("Ingresa un correo válido.");
      return;
    }
    if (password.length < 4) {
      setRegisterError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    // registrarUsuario devuelve false si el correo ya existía
    const exito = registrarUsuario(email, password, tipoUsuario);

    if (!exito) {
      setRegisterError("Ese correo ya está registrado.");
      return;
    }

    setRegisterError(null);
    // reset() en vez de navigate(): BORRA todo el historial anterior (Login, Register)
    // y deja únicamente "Tabs" como única pantalla en la pila.
    // Así, tras registrarse, el usuario no puede "volver" a la pantalla de registro.
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/temis.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Crear cuenta</Text>

      <CustomInput onChangeText={setEmail} value={email} placeholder="Correo electrónico" type="email" />
      <CustomInput onChangeText={setPassword} value={password} placeholder="Contraseña" type="password" />

      <Text style={styles.roleLabel}>¿Cómo describirías tu perfil?</Text>
      <View style={styles.roleRow}>
        {/* 'selected' compara el estado actual contra el valor que representa ESTE chip específico */}
        <CategoryChip label="Usuario común" selected={tipoUsuario === "usuario"} onPress={() => setTipoUsuario("usuario")} />
        <CategoryChip label="Persona de derecho" selected={tipoUsuario === "abogado"} onPress={() => setTipoUsuario("abogado")} />
      </View>

      {registerError && <Text style={styles.errorText}>{registerError}</Text>}

      <CustomButton title="Registrarse" onPress={handleRegister} />
      <CustomButton title="Volver al login" variant="tertiary" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  logo: { width: 110, height: 110, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "bold", color: "#206291", marginBottom: 16 },
  roleLabel: { fontSize: 13, color: "gray", alignSelf: "flex-start", marginTop: 6, marginBottom: 8 },
  roleRow: { flexDirection: "row", marginBottom: 14 },
  errorText: { color: "red", fontSize: 13, marginBottom: 10, textAlign: "center" },
});