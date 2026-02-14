// components/ui/SegmentButton.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { useTheme } from '@/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

type SegmentButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  width: number;
  isFirst: boolean;
  isLast: boolean;
};

const SegmentButton = ({ label, icon, value, selected, onSelect, width, isFirst, isLast }: SegmentButtonProps) => {
  const { theme } = useTheme();
  
  const activeBg =
    theme.mode === "dark" ? "rgba(236,185,57,0.18)" : "rgba(236,185,57,0.22)";

  const idleBg =
    theme.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.65)";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width,
          borderColor: selected ? "rgba(236,185,57,0.35)" : theme.borderSoft,
          backgroundColor: selected ? activeBg : idleBg,
          shadowColor: theme.shadowColor,
          borderTopLeftRadius: isFirst ? 20 : 0,
          borderBottomLeftRadius: isFirst ? 20 : 0,
          borderTopRightRadius: isLast ? 20 : 0,
          borderBottomRightRadius: isLast ? 20 : 0,
        },
      ]}
      onPress={() => onSelect(value)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <Ionicons name={icon} size={18} color={selected ? theme.primary : theme.muted} />
        <AppText
          style={[
            styles.label,
            {
              color: selected ? theme.text : theme.muted,
              fontWeight: selected ? 'bold' : 'normal',
            },
          ]}
        >
          {label}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderLeftWidth: 0, // sauf le premier
  },
  label: {
    fontSize: 14,
  },
});

export default SegmentButton;