import { Divider, Spacer } from '@/components/ui';
import AppText from '@/components/ui/AppText';
import { useTheme } from '@/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMemo, useState } from 'react';
import { useFiltersStore } from '@/store/useFiltersStore';
import RadioButtonGroup from '@/components/ui/RadioButtonGroup';
import SegmentControl from '@/components/ui/SegmentControl';
import { StatusFilterList } from '@/components/books/StatusFilterList';
import { statuses } from '@/models/status';

const FiltersPage = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const query = useFiltersStore((s) => s.query);
  
  const setQuery = useFiltersStore((s) => s.setQuery);
  const selectedStatusId = useFiltersStore((s) => s.selectedStatusId);
  const selectedTagId = useFiltersStore((s) => s.selectedTagId);
  const selectedSortId = useFiltersStore((s) => s.selectedSortId);
  const setSelectedSortId = useFiltersStore((s) => s.setSelectedSortId);

  const setSelectedStatusId = useFiltersStore((s) => s.setSelectedStatusId);
  const setSelectedTagId = useFiltersStore((s) => s.setSelectedTagId);
  const selectedDisplayId = useFiltersStore((s) => s.selectedDisplayId);
  const setSelectedDisplayId = useFiltersStore((s) => s.setSelectedDisplayId);

  const sortOptions = [
    { label: 'Titre (A→Z)', value: 'title_asc' },
    { label: 'Titre (Z→A)', value: 'title_desc' },
    { label: 'Date (↑)', value: 'date_asc' },
    { label: 'Date (↓)', value: 'date_desc' },
  ];

  const displayOptions = [
    { label: 'Couverture', icon: 'grid' as keyof typeof Ionicons.glyphMap, value: 'cover' },
    { label: 'Détail', icon: 'list' as keyof typeof Ionicons.glyphMap, value: 'detail' },
  ];


  return (
    <View style={[styles.container]}>
      <Animated.View style={styles.header}>
        <AppText weight="bold" style={{ fontSize: 18, color: theme.text }}>Filters</AppText>
        <TouchableOpacity style={styles.closeBtn} onPress={() => {router.dismiss()}}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View>
        <Divider label='Tri' />
        <View>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={selectedSortId}
            onValueChange={setSelectedSortId}
            columns={2} // ← 2 colonnes sur mobile
            gap={12}
          />
        </View>
      </Animated.View>

      <Animated.View>
        <Divider label='Affichage' />
        <View>
          <SegmentControl 
            segments={displayOptions}
            selectedValue={selectedDisplayId}
            onValueChange={setSelectedDisplayId}
          />
        </View>
      </Animated.View>

      <Animated.View>
        <Divider label='Status' />
        <View>
          <StatusFilterList
            pagePadding={0}
            statuses={statuses}
            selectedStatusId={selectedStatusId}
            onSelectStatusId={setSelectedStatusId}
          />
        </View>
      </Animated.View>

      <Animated.View>
        <Divider label='Étiquettes' />
        <View>
          <StatusFilterList
            pagePadding={0}
            statuses={statuses}
            selectedStatusId={selectedStatusId}
            onSelectStatusId={setSelectedStatusId}
          />
        </View>
      </Animated.View>
    </View>
  )
}

export default FiltersPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  closeBtn: {
    padding: 4,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})