import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Platform, StyleSheet, Switch, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { RootStackParamList } from "../navigation/types";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const navigation = useNavigation<NavProp>();
  const { user, logout } = useAuth();
  const { theme, colors, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await logout();
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (err: any) {
      console.log("Error al cerrar sesión:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require("../../assets/images/temis.png")} style={styles.avatar} resizeMode="contain" />
      <Text style={[styles.name, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>
        {user?.role === "abogado" ? "Persona de derecho" : "Usuario de LexHN"}
      </Text>
      <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email || "Sin sesión"}</Text>

      <View style={[styles.divider, { backgroundColor: colors.accent }]} />

      <View style={styles.themeRow}>
        <Text style={[styles.themeLabel, { color: colors.text }]}>Modo oscuro</Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: "#C9C2B4", true: colors.primary }}
          thumbColor={colors.background}
        />
      </View>

      <CustomButton title={loading ? "Cerrando..." : "Cerrar sesión"} onPress={handleLogout} variant="secondary" style={styles.logoutButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  avatar: { width: 100, height: 100, marginBottom: 14 },
  name: { fontSize: 19, fontWeight: "bold" },
  email: { fontSize: 13, marginTop: 4, marginBottom: 10 },
  divider: { width: 60, height: 3, borderRadius: 2, marginVertical: 20 },
  themeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 200, marginBottom: 20 },
  themeLabel: { fontSize: 14, fontWeight: "600" },
  logoutButton: { width: 180 },
});