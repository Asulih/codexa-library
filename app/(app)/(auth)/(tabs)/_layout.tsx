import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarLabelStyle: {
        fontSize: 9,
        fontWeight: '600'
      }
    }}>
      <Tabs.Screen name="books" options={{
        title: 'My books',
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? "book-open-page-variant" : "book-open-page-variant-outline"}
            color={color}
            size={size}
          />
        )
      }} />
      <Tabs.Screen name="discovery" options={{
        title: 'Discovery',
        tabBarIcon: ({color, size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? "share-variant" : "share-variant-outline"}
            color={color}
            size={size}
          />
        )
      }} />
      <Tabs.Screen name="search" options={{
        title: 'Search',
        tabBarIcon: ({color, size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? "book-search" : "book-search-outline"}
            color={color}
            size={size}
          />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? "account" : "account-outline"}
            color={color}
            size={size}
          />
        )
      }} />
    </Tabs>
  )
}

export default TabLayout