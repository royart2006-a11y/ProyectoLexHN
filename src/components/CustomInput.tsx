import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

type CustomInputProps = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  type?: "default" | "password" | "email" | "number";
  containerStyle?: StyleProp<ViewStyle>;
};

export default function CustomInput({ onChangeText, value, placeholder, type = "default", containerStyle }: CustomInputProps) {
  const { colors } = useTheme();
  const [isSecureText, setIsSecureText] = useState(type === "password");
  const isPasswordField = type === "password";

  const iconName: (typeof MaterialIcons)["name"] | undefined =
    type === "password" ? "lock" : type === "email" ? "alternate-email" : undefined;

  const keyboardType: KeyboardTypeOptions =
    type === "email" ? "email-address" : type === "number" ? "number-pad" : "default";

  const getError = () => {
    if (!value) return null;
    if (type === "email" && !value.includes("@")) return "Correo inválido";
    if (type === "password" && value.length < 4) return "La contraseña es débil";
    return null;
  };

  const error = getError();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
          containerStyle,
          error && styles.inputError,
        ]}
      >
        {iconName && <MaterialIcons name={iconName as any} size={22} color={colors.textSecondary} />}
        <TextInput
          style={[styles.input, { color: colors.text }]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={keyboardType}
          secureTextEntry={isSecureText}
          autoCapitalize={type === "email" ? "none" : "sentences"}
        />
        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
            <Ionicons name={isSecureText ? "eye" : "eye-off"} size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 9,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: { width: "70%" },
  inputError: { borderColor: "#B03A2E", borderWidth: 2 },
  errorText: { color: "#B03A2E", fontSize: 13, marginTop: 5, marginLeft: 7 },
});