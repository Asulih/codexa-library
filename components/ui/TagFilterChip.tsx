// components/ui/FilterChip.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { useTheme } from '@/providers/ThemeProvider';

type TagFilterChipProps = {
  label: string;
  onRemove: () => void;
};

const TagFilterChip = ({ label, onRemove }: TagFilterChipProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: theme.surfaceA,
          borderColor: theme.borderSoft,
        },
      ]}
      onPress={onRemove}
    >
      <AppText style={[styles.label, { color: theme.text }]}>
        {label}
      </AppText>
      <View style={styles.removeIcon}>
        <AppText style={{ color: theme.muted, fontSize: 12 }}>×</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  removeIcon: {
    marginLeft: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

export default TagFilterChip;