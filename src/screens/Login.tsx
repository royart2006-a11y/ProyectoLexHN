// src/screens/Login.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../navigation/types";


type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
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

      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder="Ingresa tu correo"
        type="email"
      />
      <CustomInput
        onChangeText={setPassword}
        value={password}
        placeholder="Ingresa tu contraseña"
        type="password"
      />
      <CustomButton title="Iniciar Sesión" onPress={handleLogin} />
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
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#206291",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 24,
    textAlign: "center",
  },
});