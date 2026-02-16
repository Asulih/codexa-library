import { Divider, Spacer } from '@/components/ui';
import AppText from '@/components/ui/AppText';
import { useTheme } from '@/providers/ThemeProvider';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFiltersStore } from '@/store/useFiltersStore';
import RadioButtonGroup from '@/components/ui/RadioButtonGroup';
import SegmentControl, { type Segment } from '@/components/ui/SegmentControl';
import { StatusFilterList } from '@/components/books/StatusFilterList';
import { statuses } from '@/models/status';
import TagAutocompleteInput from '@/components/ui/TagAutoComplete';
import { tags } from '@/models/tag';
import TagFilterChip from '@/components/ui/TagFilterChip';
import type { DisplayMode } from "@/store/useFiltersStore";

const FiltersPage = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const { focus } = useLocalSearchParams<{ focus?: string }>();

  const scrollRef = useRef<ScrollView>(null);
  const tagsYRef = useRef(0);

  const query = useFiltersStore((s) => s.query);
  
  const setQuery = useFiltersStore((s) => s.setQuery);
  const selectedStatusId = useFiltersStore((s) => s.selectedStatusId);
  const selectedTagIds = useFiltersStore((s) => s.selectedTagIds);
  const removeTagId = useFiltersStore((s) => s.removeTagId);
  const selectedSortId = useFiltersStore((s) => s.selectedSortId);
  const setSelectedSortId = useFiltersStore((s) => s.setSelectedSortId);

  const setSelectedStatusId = useFiltersStore((s) => s.setSelectedStatusId);
  const selectedDisplayId = useFiltersStore((s) => s.selectedDisplayId);
  const setDisplayMode = useFiltersStore((s) => s.setDisplayMode);

  const resetFilters = useFiltersStore((s) => s.resetFilters);

  const sortOptions = [
    { label: 'Titre (A→Z)', value: 'title_asc' },
    { label: 'Titre (Z→A)', value: 'title_desc' },
    { label: 'Date (↑)', value: 'date_asc' },
    { label: 'Date (↓)', value: 'date_desc' },
  ];

  const displayOptions: Segment<DisplayMode>[] = [
    { label: "Couverture", icon: "grid-outline", value: "cover" },
    { label: "Liste", icon: "list-outline", value: "list" },
  ];

  useEffect(() => {
    if (focus === 'tags') {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: tagsYRef.current, animated: true });
      })
    }
  }, [focus])


  return (
    <View style={[styles.container]}>
      <Animated.View style={styles.header} entering={FadeInDown.delay(100)}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => {resetFilters()}}>
          <MaterialCommunityIcons name="filter-remove" size={24} />
        </TouchableOpacity>
        <AppText weight="bold" style={{ fontSize: 18, color: theme.text }}>Filters</AppText>
        <TouchableOpacity style={styles.closeBtn} onPress={() => {router.dismiss()}}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </Animated.View>
      
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode='none'
      >
        <Animated.View entering={FadeInDown.delay(200)}>
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

        <Animated.View entering={FadeInDown.delay(300)}>
          <Divider label='Affichage' />
          <View>
            <SegmentControl 
              segments={displayOptions}
              selectedValue={selectedDisplayId}
              onValueChange={setDisplayMode}
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)}>
          <Divider label='Status' />
          <View style={{ paddingBottom: 16 }}>
            <StatusFilterList
              pagePadding={0}
              statuses={statuses}
              selectedStatusId={selectedStatusId}
              onSelectStatusId={setSelectedStatusId}
            />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400)}
          onLayout={(e) => {
            tagsYRef.current = e.nativeEvent.layout.y;
          }}
        >
          <Divider label='Étiquettes' />
          <View>
            <TagAutocompleteInput 
              tags={tags}
              selectedTags={selectedTagIds}
              placeholder='Ajouter une étiquette'
            />
            { selectedTagIds.length > 0 && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 8 }}>
              {selectedTagIds.map((tagId) => {
                const tag = tags.find(t => t.id === tagId);
                return (
                  <TagFilterChip
                    key={tagId}
                    label={tag?.name || tagId}
                    onRemove={() => removeTagId(tagId)}
                  />
                );
              })}
            </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  )
}

export default FiltersPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  resetBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
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