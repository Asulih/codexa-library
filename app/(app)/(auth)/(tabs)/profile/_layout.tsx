import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const ProfileLayout = () => {
  const { theme } = useTheme();
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: theme.bg0 } }}>
      <Stack.Screen name='index' options={{
        title: 'Profile',
        headerTransparent: true
      }}/>
    </Stack>
  )
}

export default ProfileLayout

const styles = StyleSheet.create({})