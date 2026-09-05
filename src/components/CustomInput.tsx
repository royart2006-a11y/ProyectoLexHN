import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type CustomInputProps = {
  onChangeText: (text: string) => void; // función que el PADRE controla; nosotros solo la disparamos
  value: string;                         // el texto actual viene del padre (input controlado)
  placeholder: string;
  type?: "default" | "password" | "email" | "number";
};

export default function CustomInput({ onChangeText, value, placeholder, type = "default" }: CustomInputProps) {
  // Estado LOCAL: solo le importa a este componente, no al padre.
  // Empieza oculto si el input es de tipo password.
  const [isSecureText, setIsSecureText] = useState(type === "password");
  const isPasswordField = type === "password";

  // Ícono condicionado por tipo: patrón de "if/else" con operadores ternarios encadenados
  const iconName: (typeof MaterialIcons)["name"] | undefined =
    type === "password" ? "lock" : type === "email" ? "alternate-email" : undefined;

  // Teclado condicionado: el celular muestra un teclado distinto según el tipo de dato esperado
  const keyboardType: KeyboardTypeOptions =
    type === "email" ? "email-address" : type === "number" ? "number-pad" : "default";

  // Función de validación: se recalcula en cada render, reaccionando al 'value' actual
  const getError = () => {
    if (!value) return null; // no mostramos error mientras el campo está vacío (mejor UX)
    if (type === "email" && !value.includes("@")) return "Correo inválido";
    if (type === "password" && value.length < 4) return "La contraseña es débil";
    return null;
  };

  const error = getError();

  return (
    <View style={styles.wrapper}>
      {/* El array de estilos aplica inputError SOLO si error es verdadero (comportamiento condicionado) */}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {iconName && <MaterialIcons name={iconName as any} size={22} />}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={isSecureText}
          autoCapitalize={type === "email" ? "none" : "sentences"}
        />
        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
            {/* El ícono del ojo cambia según si el texto está oculto o visible */}
            <Ionicons name={isSecureText ? "eye" : "eye-off"} size={22} />
          </TouchableOpacity>
        )}
      </View>
      {/* El mensaje de error solo se renderiza si existe (&& es un if corto en JSX) */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 10 },
  inputContainer: {
    backgroundColor: "lightgray",
    flexDirection: "row",        // ícono + input + ícono de ojo en fila horizontal
    alignItems: "center",         // centrados verticalmente entre sí
    justifyContent: "space-between",
    borderRadius: 9,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: { width: "70%" },
  inputError: { borderColor: "red", borderWidth: 2 }, // se combina con inputContainer cuando hay error
  errorText: { color: "red", fontSize: 13, marginTop: 5, marginLeft: 7 },
});