// src/screens/Register.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import CategoryChip from "../components/CategoryChip";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

// El rol ya no viene de un tipo propio del AuthContext viejo (TipoUsuario);
// ahora es un string simple que se guarda como metadata en Supabase.
type Rol = "usuario" | "abogado";

export default function Register({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState<Rol>("usuario");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState(false); // true si falta confirmar correo
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email.includes("@")) {
      setRegisterError("Ingresa un correo válido.");
      return;
    }
    if (password.length < 6) {
      setRegisterError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    setRegisterError(null);
    setLoading(true);

  try {
  const haySesion = await register(email, password, rol);
console.log("rol:", rol, "| haySesion:", haySesion);

  if (haySesion) {
    navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
  } else {
    setPendingConfirmation(true); // falta confirmar el correo
  }
} catch (err: any) {
      // Supabase lanza errores con un mensaje legible en err.message
      setRegisterError(err.message ?? "No se pudo completar el registro.");
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
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Únete a la consulta legal simplificada</Text>

      <View style={styles.divider} />

      {pendingConfirmation ? (
        // Estado especial: registro exitoso, pero requiere confirmar correo
        <View style={styles.confirmationBox}>
          <Text style={styles.confirmationTitle}>Revisa tu correo</Text>
          <Text style={styles.confirmationText}>
            Te enviamos un enlace de confirmación a {email}. Confírmalo y luego inicia sesión.
          </Text>
          <CustomButton
            title="Volver al login"
            onPress={() => navigation.navigate("Login")}
            style={styles.mainButton}
          />
        </View>
      ) : (
        <>
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

          <Text style={styles.roleLabel}>¿Cómo describirías tu perfil?</Text>
          <View style={styles.roleRow}>
            <CategoryChip
              label="Usuario común"
              selected={rol === "usuario"}
              onPress={() => setRol("usuario")}
            />
            <CategoryChip
              label="Persona de derecho"
              selected={rol === "abogado"}
              onPress={() => setRol("abogado")}
            />
          </View>

          {registerError && <Text style={styles.errorText}>{registerError}</Text>}

          <CustomButton
            title={loading ? "Registrando..." : "Registrarse"}
            onPress={handleRegister}
            style={styles.mainButton}
          />
          <CustomButton
            title="Volver al login"
            variant="tertiary"
            onPress={() => navigation.navigate("Login")}
            style={styles.tertiaryButton}
          />
        </>
      )}
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
    paddingTop: 50,
  },
  logo: { width: 110, height: 110, marginBottom: 6 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0B2545",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#5C6B7A",
    marginTop: 2,
    marginBottom: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  divider: { width: 60, height: 3, backgroundColor: "#D9C9A3", borderRadius: 2, marginBottom: 20 },
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
  roleLabel: { fontSize: 13, color: "#5C6B7A", alignSelf: "flex-start", marginTop: 8, marginBottom: 10 },
  roleRow: { flexDirection: "row", marginBottom: 16, alignSelf: "flex-start" },
  errorText: { color: "#B03A2E", fontSize: 13, marginBottom: 10, textAlign: "center" },
  mainButton: { width: "100%", paddingVertical: 16, borderRadius: 12, marginTop: 6 },
  tertiaryButton: { width: "100%", marginTop: 4 },
  confirmationBox: { width: "100%", alignItems: "center" },
  confirmationTitle: { fontSize: 18, fontWeight: "bold", color: "#0B2545", marginBottom: 8 },
  confirmationText: { fontSize: 13, color: "#5C6B7A", textAlign: "center", marginBottom: 20 },
});