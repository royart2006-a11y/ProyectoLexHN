import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}: CustomButtonProps) {
  const { colors } = useTheme();
  const estaInactivo = disabled || loading;

  const backgroundColor =
    variant === "primary" ? colors.primary : variant === "secondary" ? colors.card : "transparent";
  const borderColor = variant === "secondary" ? colors.primary : "transparent";
  const textColor = variant === "primary" ? colors.background : colors.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, borderWidth: variant === "secondary" ? 1.5 : 0 },
        estaInactivo && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={estaInactivo}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.buttonTitle, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    marginBottom: 5,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonTitle: { fontWeight: "bold", fontSize: 15 },
});