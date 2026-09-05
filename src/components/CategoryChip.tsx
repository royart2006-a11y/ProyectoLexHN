// src/components/CategoryChip.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CategoryChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryChip({ label, selected, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  chipSelected: {
    backgroundColor: "#206291",
    borderColor: "#206291",
  },
  label: {
    fontSize: 13,
    color: "#333",
  },
  labelSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});