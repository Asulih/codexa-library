import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const BooksLayout = () => {
  const { theme } = useTheme();
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: theme.bg0 } }}>
      <Stack.Screen name='index' options={{
        title: 'My books',
        headerLargeTitleEnabled: true,
        headerTransparent: true
      }}/>
    </Stack>
  )
}

export default BooksLayout

const styles = StyleSheet.create({})