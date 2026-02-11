import { Fonts } from '@/constants/theme'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CategoryList } from '../CategoryList'
import RestaurantHeader from '../RestaurantHeader'
import RestaurantList from '../RestaurantList'

const RestaurantListPage = () => {
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    }
  });

  return (
    <View style={styles.container}>

      <RestaurantHeader title='Restaurants' scrollOffset={scrollOffset} />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 60 }}
      >
        <Text style={styles.pageTitle}>Restaurants</Text>
        <CategoryList />
        <Text style={styles.AllRestaurnantTitle}>All restaurants</Text>
        <RestaurantList />
      </Animated.ScrollView>
    </View>
  )
}

export default RestaurantListPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  AllRestaurnantTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  }
})