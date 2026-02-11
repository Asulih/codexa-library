import { useThemeColor } from '@/hooks/use-theme-color';
import { Stack } from 'expo-router'

const PublicLayout = () => {
  const backgroundColor = useThemeColor('background');
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false,
        contentStyle: { backgroundColor }
        }} />
      <Stack.Screen name='create-account' options={{
        headerShown: false,
        presentation: 'formSheet',
        title: '',
        headerShadowVisible: false,
        sheetAllowedDetents: [0.45],
        sheetCornerRadius: 16,
        }} />
    </Stack>
  )
}

export default PublicLayout