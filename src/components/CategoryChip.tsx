import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

type CategoryChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryChip({ label, selected, onPress }: CategoryChipProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: selected ? colors.primary : colors.card, borderColor: selected ? colors.primary : colors.border },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, { color: selected ? colors.background : colors.textSecondary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1.5 },
  label: { fontSize: 13, fontWeight: "600" },
});