// components/ui/SegmentControl.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SegmentButton from './SegmentButton';
import { useTheme } from '@/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

type SegmentControlProps = {
  segments: { label: string; icon: keyof typeof Ionicons.glyphMap, value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

const SegmentControl = ({ segments, selectedValue, onValueChange }: SegmentControlProps) => {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 32 - (segments.length - 1) * 4) / segments.length; // 32 = padding, 4 = gap

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceA, borderColor: theme.borderSoft }]}>
      {segments.map((segment, index) => (
        <SegmentButton
          key={segment.value}
          label={segment.label}
          icon={segment.icon}
          value={segment.value}
          selected={selectedValue === segment.value}
          onSelect={onValueChange}
          width={itemWidth}
          isFirst={index === 0}
          isLast={index === segments.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default SegmentControl;