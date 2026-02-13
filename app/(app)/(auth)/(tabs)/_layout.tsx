import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

const TabLayout = () => {
  const { t } = useTranslation(['books', 'profile']);
  return (
    <Tabs screenOptions={{
      tabBarLabelStyle: {
        fontWeight: '600'
      }
    }}>
      <Tabs.Screen name="books" options={{
        title: t('books:mybooks'),
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
        title: t('profile:discovery'),
        tabBarIcon: ({color, size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? "share-variant" : "share-variant-outline"}
            color={color}
            size={size}
          />
        )
      }} />
      <Tabs.Screen name="search" options={{
        title: t('profile:search'),
        tabBarIcon: ({color, size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? "book-search" : "book-search-outline"}
            color={color}
            size={size}
          />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: t('profile:profile'),
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