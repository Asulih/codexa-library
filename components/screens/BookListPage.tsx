import { Fonts } from '@/constants/theme'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppText from '../ui/AppText'
import { TagList } from '../TagList'
import BooksSearchBar from '../BooksSearchBar'
import BookList from '../BookList'
import BooksTagChips from '../BooksTagChips'
import { books } from '@/models/book';
import { Tag, tags } from '@/models/tag';
import { useMemo, useState } from 'react'

const BookListPage = () => {
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);
  
  const [tag, setTag] = useState<string>("all");
  const [query, setQuery] = useState("");

  const bookList = [...books, ...books, ...books, ...books];

  const tagsWithCount = useMemo(() => {
    const byId = new Map<string, { tag: Tag, count: number}>()
    bookList.forEach((b) => {
      b.tags.forEach((t) =>  {
        const existing = byId.get(t.id);
        if (existing) {
          existing.count += 1;
        } else {
          byId.set(t.id, { tag: t, count: 1});
        }
      })
    });
    return Array.from(byId.values())
      .map(({ tag, count }) => ({ ...tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [bookList]);


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    }
  });

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 60, paddingHorizontal: 20 }}>
        <AppText weight='extrabold' style={styles.pageTitle}>Mes livres</AppText>
        <View style={{ marginBottom: 20 }}>
          <BooksSearchBar value={query} onChange={setQuery} />
        </View>
        <Animated.ScrollView>
          <BooksTagChips
            value={tag}
            onChange={setTag}
            totalCount={bookList.length}
            tags={tagsWithCount}
          />
        </Animated.ScrollView>
        <Animated.ScrollView showsVerticalScrollIndicator={false}>
          <BookList />
        </Animated.ScrollView>
      </View>
    </View>
  )
}

export default BookListPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 30,
    marginBottom: 16,
  },
})