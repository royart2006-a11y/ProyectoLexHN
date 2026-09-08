import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";

type CustomInputProps = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  type?: "default" | "password" | "email" | "number";
  containerStyle?: StyleProp<ViewStyle>; // permite personalizar el look en pantallas específicas, sin afectar el resto
};

export default function CustomInput({
  onChangeText,
  value,
  placeholder,
  type = "default",
  containerStyle,
}: CustomInputProps) {
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
      <View style={[styles.inputContainer, containerStyle, error && styles.inputError]}>
        {iconName && <MaterialIcons name={iconName as any} size={22} color="#5C6B7A" />}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#8A97A5"
          keyboardType={keyboardType}
          secureTextEntry={isSecureText}
          autoCapitalize={type === "email" ? "none" : "sentences"}
        />
        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
            <Ionicons name={isSecureText ? "eye" : "eye-off"} size={22} color="#5C6B7A" />
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
    backgroundColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 9,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: { width: "70%" },
  inputError: { borderColor: "#B03A2E", borderWidth: 2 },
  errorText: { color: "#B03A2E", fontSize: 13, marginTop: 5, marginLeft: 7 },
});