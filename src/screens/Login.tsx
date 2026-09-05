// src/screens/Login.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

// NativeStackScreenProps le da a esta pantalla acceso tipado a 'navigation' y 'route',
// sabiendo específicamente que esta es la pantalla "Login" del RootStackParamList.
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  // Estado LOCAL de esta pantalla: lo que el usuario va escribiendo, antes de enviarlo.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error específico de "credenciales incorrectas" — distinto del error de FORMATO
  // que ya maneja CustomInput internamente (ej. "correo inválido").
  const [loginError, setLoginError] = useState<string | null>(null);

  // Traemos la función de validación desde el contexto global de autenticación.
  const { validarLogin } = useAuth();

  const handleLogin = () => {
    const esValido = validarLogin(email, password);

    if (!esValido) {
      setLoginError("Correo o contraseña incorrectos.");
      return; // cortamos aquí: no navegamos si las credenciales fallan
    }

    setLoginError(null);
    // replace() en vez de navigate(): reemplaza Login en la pila de navegación,
    // así el usuario no puede volver a Login con el botón atrás una vez adentro.
    navigation.replace("Tabs");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/temis.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>LexHN</Text>
      <Text style={styles.subtitle}>Consulta legal simplificada</Text>

      <CustomInput onChangeText={setEmail} value={email} placeholder="Ingresa tu correo" type="email" />
      <CustomInput onChangeText={setPassword} value={password} placeholder="Ingresa tu contraseña" type="password" />

      {/* Solo se muestra si loginError tiene contenido (no es null) */}
      {loginError && <Text style={styles.loginErrorText}>{loginError}</Text>}

      <CustomButton title="Iniciar Sesión" onPress={handleLogin} />
      <CustomButton title="Crear cuenta" variant="tertiary" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  logo: { width: 160, height: 160, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "bold", color: "#206291" },
  subtitle: { fontSize: 14, color: "gray", marginBottom: 24, textAlign: "center" },
  loginErrorText: { color: "red", fontSize: 13, marginBottom: 10, textAlign: "center" },
});