import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (loading) return;
    if (!email.includes("@") || password.length === 0) {
      setLoginError("Ingresa tu correo y contraseña.");
      return;
    }
  
    setLoginError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigation.replace("Tabs");
    } catch (err: any) {
  setLoginError("Correo o contraseña incorrectos.");
}
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require("../../assets/images/temis.png")} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>LexHN</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Consulta legal simplificada</Text>

      <View style={[styles.divider, { backgroundColor: colors.accent }]} />

      <CustomInput onChangeText={setEmail} value={email} placeholder="Correo electrónico" type="email" containerStyle={styles.inputContainer} />
      <CustomInput onChangeText={setPassword} value={password} placeholder="Contraseña" type="password" containerStyle={styles.inputContainer} />

      {loginError && <Text style={styles.loginErrorText}>{loginError}</Text>}

      <CustomButton title={loading ? "Ingresando..." : "Iniciar Sesión"} onPress={handleLogin} style={styles.mainButton} />
      <CustomButton title="Crear cuenta" variant="tertiary" onPress={() => navigation.navigate("Register")} style={styles.tertiaryButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 28, paddingTop: 60 },
  logo: { width: 150, height: 150, marginBottom: 8 },
  title: { fontSize: 34, fontWeight: "bold", letterSpacing: 1 },
  subtitle: { fontSize: 14, marginTop: 2, marginBottom: 18, textAlign: "center", fontStyle: "italic" },
  divider: { width: 60, height: 3, borderRadius: 2, marginBottom: 24 },
  inputContainer: { paddingVertical: 16, paddingHorizontal: 22, width: "100%", borderRadius: 14 },
  loginErrorText: { color: "#B03A2E", fontSize: 13, marginBottom: 10, textAlign: "center" },
  mainButton: { width: "100%", paddingVertical: 16, borderRadius: 12, marginTop: 10 },
  tertiaryButton: { width: "100%", marginTop: 4 },
});