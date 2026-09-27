// src/screens/Register.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import CategoryChip from "../components/CategoryChip";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;
type Rol = "usuario" | "abogado";

export default function Register({ navigation }: Props) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState<Rol>("usuario");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email.includes("@")) {
      setRegisterError("Ingresa un correo válido.");
      return;
    }
    if (password.length < 4) {
      setRegisterError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    setRegisterError(null);
    setLoading(true);

    try {
      await register(email, password, rol);
      // Sin confirmación de correo, la sesión queda activa de inmediato.
      navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
    } catch (err: any) {
      setRegisterError(err.message ?? "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require("../../assets/images/temis.png")} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>Crear cuenta</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Únete a la consulta legal simplificada</Text>

      <View style={[styles.divider, { backgroundColor: colors.accent }]} />

      <CustomInput onChangeText={setEmail} value={email} placeholder="Correo electrónico" type="email" containerStyle={styles.inputContainer} />
      <CustomInput onChangeText={setPassword} value={password} placeholder="Contraseña" type="password" containerStyle={styles.inputContainer} />

      <Text style={[styles.roleLabel, { color: colors.textSecondary }]}>¿Cómo describirías tu perfil?</Text>
      <View style={styles.roleRow}>
        <CategoryChip label="Usuario común" selected={rol === "usuario"} onPress={() => setRol("usuario")} />
        <CategoryChip label="Persona de derecho" selected={rol === "abogado"} onPress={() => setRol("abogado")} />
      </View>

      {registerError && <Text style={styles.errorText}>{registerError}</Text>}

      <CustomButton title={loading ? "Registrando..." : "Registrarse"} onPress={handleRegister} style={styles.mainButton} />
      <CustomButton title="Volver al login" variant="tertiary" onPress={() => navigation.navigate("Login")} style={styles.tertiaryButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 28, paddingTop: 50 },
  logo: { width: 110, height: 110, marginBottom: 6 },
  title: { fontSize: 28, fontWeight: "bold", letterSpacing: 0.5 },
  subtitle: { fontSize: 13, marginTop: 2, marginBottom: 16, textAlign: "center", fontStyle: "italic" },
  divider: { width: 60, height: 3, borderRadius: 2, marginBottom: 20 },
  inputContainer: { paddingVertical: 16, paddingHorizontal: 22, width: "100%", borderRadius: 14 },
  roleLabel: { fontSize: 13, alignSelf: "flex-start", marginTop: 8, marginBottom: 10 },
  roleRow: { flexDirection: "row", marginBottom: 16, alignSelf: "flex-start" },
  errorText: { color: "#B03A2E", fontSize: 13, marginBottom: 10, textAlign: "center" },
  mainButton: { width: "100%", paddingVertical: 16, borderRadius: 12, marginTop: 6 },
  tertiaryButton: { width: "100%", marginTop: 4 },
});