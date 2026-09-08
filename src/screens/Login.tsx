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
  const { validarLogin } = useAuth();

  const handleLogin = () => {
    const esValido = validarLogin(email, password);

    if (!esValido) {
      setLoginError("Correo o contraseña incorrectos.");
      return;
    }

    setLoginError(null);
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

      <CustomButton title="Iniciar Sesión" onPress={handleLogin} style={styles.mainButton} />
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
    backgroundColor: "#F4EFE6", // tono marfil/pergamino, evoca papel legal antiguo
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    paddingTop: 60, // sube todo el contenido, como pediste
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0B2545", // azul marino profundo, tipo toga/uniforme judicial
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif", // tipografía con serifas, más solemne
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
    backgroundColor: "#D9C9A3", // línea dorada decorativa, como un sello o listón
    borderRadius: 2,
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C9C2B4",
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 16, // inputs más altos/largos, como pediste
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