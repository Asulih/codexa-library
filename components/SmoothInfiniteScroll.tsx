import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const items = [
    { id: "1", title: "Lecture", icon: "book-open" },
    { id: "2", title: "Wishlist", icon: "bookmark" },
    { id: "3", title: "Notes", icon: "edit-3" },
    { id: "4", title: "Favoris", icon: "heart" },
    { id: "5", title: "Partage", icon: "share-2" },
    { id: "6", title: "Tags", icon: "tag" },
  ];
const iconDataSets = {
  
  set1: [
    { id: "1", title: "Lecture", icon: "book-open" },
    { id: "2", title: "Wishlist", icon: "bookmark" },
    { id: "3", title: "Notes", icon: "edit-3" },
    { id: "4", title: "Favoris", icon: "heart" },
    { id: "5", title: "Partage", icon: "share-2" },
    { id: "6", title: "Tags", icon: "tag" },
  ],
  set2: [
    { id: "1", title: "Notes", icon: "edit-3" },
    { id: "2", title: "Favoris", icon: "heart" },
    { id: "3", title: "Partage", icon: "share-2" },
    { id: "4", title: "Tags", icon: "tag" },
    { id: "5", title: "Lecture", icon: "book-open" },
    { id: "6", title: "Wishlist", icon: "bookmark" },
  ],
  set3: [
    { id: "1", title: "Partage", icon: "share-2" },
    { id: "2", title: "Tags", icon: "tag" },
    { id: "3", title: "Lecture", icon: "book-open" },
    { id: "4", title: "Wishlist", icon: "bookmark" },
    { id: "5", title: "Notes", icon: "edit-3" },
    { id: "6", title: "Favoris", icon: "heart" },
  ],
};

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20; // pixels per second
const GAP = 10; // gap between items from styles

interface SmoothInfiniteScrollProps {
  scrollDirection?: 'up' | 'down';
  iconSet?: 'set1' | 'set2' | 'set3';
}

const SmoothInfiniteScroll = ({
  scrollDirection = 'down',
  iconSet = 'set1',
}: SmoothInfiniteScrollProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const iconData = iconDataSets[iconSet];
  const items = [...iconData, ...iconData];
  const totalContentHeight = iconData.length * ITEM_HEIGHT;

  // Calculate total wrap height including gaps between items
  // Each item has a gap after it (except conceptually the last, but we're wrapping)
  const totalWrapHeight = totalContentHeight + iconData.length * GAP;

  useEffect(() => {
    cancelAnimation(scrollY);
    // Calculate duration based on SCROLL_SPEED and total distance
    const duration = (totalWrapHeight / SCROLL_SPEED) * 1000; // convert to milliseconds

    if (scrollDirection === 'down') {
      // Start at 0, animate to totalWrapHeight
      scrollY.value = 0;
      scrollY.value = withRepeat(
        withTiming(totalWrapHeight, { duration }),
        -1, // infinite repeats
        false // don't reverse
      );
    } else {
      // Start at totalWrapHeight, animate to 0
      scrollY.value = totalWrapHeight;
      scrollY.value = withRepeat(
        withTiming(0, { duration }),
        -1, // infinite repeats
        false // don't reverse
      );
    }

    return () => {
      cancelAnimation(scrollY);
    }
  }, [scrollDirection, totalWrapHeight]);

  useAnimatedReaction(
    () => scrollY.value,
    (y) => {
      if (scrollDirection === 'down') {
        if (y >= totalWrapHeight) {
          scrollY.value = 0;
          scrollTo(scrollRef, 0, 0, false);
        } else {
          scrollTo(scrollRef, 0, y, false);
        }
      } else {
        if (y <= 0) {
          scrollY.value = totalWrapHeight;
          scrollTo(scrollRef, 0, totalWrapHeight, false);
        } else {
          scrollTo(scrollRef, 0, y, false);
        }
      }
    }
  );

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      ref={scrollRef}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}>
      {items.map((item, idx) => (
        <View key={idx} style={[styles.iconContainer]}>
          <Feather
              name={item.icon as any}
              size={18}
              color='#ecb939'
              style={{ marginBottom: 6 }}
            />
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export default SmoothInfiniteScroll

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 20,
  },
  iconContainer: {
    width: 160,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android shadow
    elevation: 3,
  }
});