import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native'

const ProfileLayout = () => {
  const { t } = useTranslation('profile');
  const { theme } = useTheme();
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: theme.bg0 } }}>
      <Stack.Screen name='index' options={{
        title: t('profile:profile'),
        headerTransparent: true
      }}/>
    </Stack>
  )
}

export default ProfileLayout

const styles = StyleSheet.create({})