// src/screens/Register.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { registrarUsuario } = useAuth();

  const handleRegister = () => {
    // Validación básica de campos antes de intentar registrar
    if (!email.includes("@")) {
      setRegisterError("Ingresa un correo válido.");
      setSuccessMessage(null);
      return;
    }
    if (password.length < 4) {
      setRegisterError("La contraseña debe tener al menos 4 caracteres.");
      setSuccessMessage(null);
      return;
    }

    const exito = registrarUsuario(email, password);

    if (!exito) {
      setRegisterError("Ese correo ya está registrado.");
      setSuccessMessage(null);
      return;
    }

    setRegisterError(null);
    setSuccessMessage("Cuenta creada. Ya puedes iniciar sesión.");
  };

  return (
    <View style={styles.container}>
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
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

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
  successText: {
    color: "green",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
});