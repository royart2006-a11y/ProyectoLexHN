import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  style?: StyleProp<ViewStyle>; // permite ajustar tamaño/posición sin tocar el estilo base
};

export default function CustomButton({ title, onPress, variant = "primary", style }: CustomButtonProps) {
  const styles = getStyles(variant);

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") =>
  StyleSheet.create({
    button: {
      backgroundColor:
        variant === "primary" ? "#0B2545" : variant === "secondary" ? "#D9C9A3" : "transparent",
      borderRadius: 6,
      width: 150,
      padding: 12,
      marginBottom: 5,
      alignItems: "center",
    },
    buttonTitle: {
      color: variant === "primary" ? "#F4EFE6" : variant === "secondary" ? "#0B2545" : "#0B2545",
      fontWeight: variant === "tertiary" ? "600" : "bold",
    },
  });