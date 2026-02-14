// components/ui/RadioButtonGroup.tsx
import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import RadioButton from './RadioButton'; // votre composant radio button custom
import { useTheme } from '@/providers/ThemeProvider';

type Option = {
  label: string;
  value: string;
};

type RadioButtonGroupProps = {
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  columns?: number; // nombre de colonnes (défaut: 1)
  gap?: number; // espace entre les boutons
};

const RadioButtonGroup = ({
  options,
  selectedValue,
  onValueChange,
  columns = 1,
  gap = 8,
}: RadioButtonGroupProps) => {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = useMemo(() => {
    const padding = 32; // padding du conteneur
    const availableWidth = screenWidth - padding;
    return (availableWidth - (columns - 1) * gap) / columns;
  }, [screenWidth, columns, gap]);

  return (
    <View style={[styles.container, { gap }]}>
      {options.map((option) => (
        <View
          key={option.value}
          style={[
            styles.item,
            {
              width: itemWidth,
              backgroundColor: theme.surfaceA,
              borderColor: theme.borderSoft,
            },
          ]}
        >
          <RadioButton
            label={option.label}
            value={option.value}
            selected={selectedValue === option.value}
            onSelect={onValueChange}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 8,
    paddingBottom: 16,
  },
  item: {
    borderRadius: 40,
    borderWidth: 1,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default RadioButtonGroup;