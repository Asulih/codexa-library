// components/ui/RadioButton.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';
import { useTheme } from '@/providers/ThemeProvider';

type RadioButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
};

const RadioButton = ({ label, value, selected, onSelect }: RadioButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect(value)}
    >
      <View style={[styles.radio, {
        borderColor: selected ? theme.primary : 'rgba(0,0,0,0.2)',
        backgroundColor: selected ? theme.primary : 'transparent',
      }]} />
      <AppText style={[styles.label, { color: theme.text }]}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#007AFF', // ou theme.primary
    borderColor: '#007AFF',
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RadioButton;