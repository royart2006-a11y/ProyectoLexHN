import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CategoryChipProps = {
  label: string;
  selected: boolean;   // el padre decide si ESTE chip específico está activo
  onPress: () => void;
};

export default function CategoryChip({ label, selected, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

// src/components/CategoryChip.tsx
const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: "#C9C2B4",
  },
  chipSelected: {
    backgroundColor: "#0B2545",
    borderColor: "#0B2545",
  },
  label: {
    fontSize: 13,
    color: "#5C6B7A",
  },
  labelSelected: {
    color: "#F4EFE6",
    fontWeight: "bold",
  },
});