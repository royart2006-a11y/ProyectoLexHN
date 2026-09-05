// src/screens/Register.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { registrarUsuario } = useAuth();

  const handleRegister = () => {
    if (!email.includes("@")) {
      setRegisterError("Ingresa un correo válido.");
      return;
    }
    if (password.length < 4) {
      setRegisterError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    const exito = registrarUsuario(email, password);

    if (!exito) {
      setRegisterError("Ese correo ya está registrado.");
      return;
    }

    // Registro exitoso: inicia sesión automáticamente y navega directo a Tabs,
    // reemplazando el historial para que no pueda "volver" a Login o Register.
    setRegisterError(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }],
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/temis.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Crear cuenta</Text>

      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder="Correo electrónico"
        type="email"
      />
      <CustomInput
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        type="password"
      />

      {registerError && <Text style={styles.errorText}>{registerError}</Text>}

      <CustomButton title="Registrarse" onPress={handleRegister} />
      <CustomButton
        title="Volver al login"
        variant="tertiary"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#206291",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
});