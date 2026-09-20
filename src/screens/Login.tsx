// src/screens/Login.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (loading) return; // evita doble toque mientras se espera a Supabase

    if (!email.includes("@") || password.length === 0) {
      setLoginError("Ingresa tu correo y contraseña.");
      return;
    }

    setLoginError(null);
    setLoading(true);

    try {
      await login(email, password);
      // replace() para que no se pueda volver a Login con el botón atrás
      navigation.replace("Tabs");
    } catch (err: any) {
      // Supabase devuelve mensajes como "Invalid login credentials"
      // o "Email not confirmed"
      if (err?.message?.toLowerCase().includes("email not confirmed")) {
        setLoginError("Debes confirmar tu correo antes de iniciar sesión.");
      } else {
        setLoginError("Correo o contraseña incorrectos.");
      }
    } finally {
      setLoading(false);
    }
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

      <View style={styles.divider} />

      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder="Correo electrónico"
        type="email"
        containerStyle={styles.inputContainer}
      />
      <CustomInput
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        type="password"
        containerStyle={styles.inputContainer}
      />

      {loginError && <Text style={styles.loginErrorText}>{loginError}</Text>}

      <CustomButton
        title={loading ? "Ingresando..." : "Iniciar Sesión"}
        onPress={handleLogin}
        style={styles.mainButton}
      />
      <CustomButton
        title="Crear cuenta"
        variant="tertiary"
        onPress={() => navigation.navigate("Register")}
        style={styles.tertiaryButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EFE6",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    paddingTop: 60,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0B2545",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#5C6B7A",
    marginTop: 2,
    marginBottom: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: "#D9C9A3",
    borderRadius: 2,
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C9C2B4",
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 22,
    width: "100%",
    shadowColor: "#0B2545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  loginErrorText: {
    color: "#B03A2E",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  mainButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  tertiaryButton: {
    width: "100%",
    marginTop: 4,
  },
});