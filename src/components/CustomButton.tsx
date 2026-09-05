import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
};

export default function CustomButton({ title, onPress, variant = "primary" }: CustomButtonProps) {
  // getStyles genera un objeto de estilos DISTINTO según el variant recibido.
  // Se recalcula en cada render, así que si el variant cambia, el botón se repinta.
  const styles = getStyles(variant);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

// Función separada (no un hook) porque no necesita estado ni ciclo de vida,
// solo transforma un input (variant) en un output (estilos) de forma pura.
const getStyles = (variant: "primary" | "secondary" | "tertiary") =>
  StyleSheet.create({
    button: {
      backgroundColor:
        variant === "primary" ? "#206291" : variant === "secondary" ? "#c5def0" : "#fff",
      borderRadius: 5,
      width: 150,
      padding: 12,
      marginBottom: 5,
      alignItems: "center",
    },
    buttonTitle: {
      color: variant === "primary" ? "white" : "black",
    },
  });