// components/ui/TagSuggestionItem.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { useTheme } from '@/providers/ThemeProvider';

type TagSuggestionItemProps = {
  tag: { id: string; name: string };
  onSelect: () => void;
};

const TagSuggestionItem = ({ tag, onSelect }: TagSuggestionItemProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: theme.surfaceA,
          borderColor: theme.borderSoft,
        },
      ]}
      onPressIn={onSelect}
    >
      <AppText style={[styles.label, { color: theme.text }]}>
        {tag.name}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  label: {
    fontSize: 16,
  },
});

export default TagSuggestionItem;