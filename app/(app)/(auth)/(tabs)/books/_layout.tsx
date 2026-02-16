import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const BooksLayout = () => {
  const { theme } = useTheme();
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: theme.bg0 } }}>
      <Stack.Screen name='index' options={{ headerShown: false }}/>
      <Stack.Screen name='[id]' options={{ headerShown: false }}/>
      <Stack.Screen name='add-book' options={{ headerShown: false }}/>
    </Stack>
  )
}

export default BooksLayout

const styles = StyleSheet.create({})