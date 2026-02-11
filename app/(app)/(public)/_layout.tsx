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
      <Stack.Screen name='other-options' options={{
        headerShown: false,
        presentation: 'formSheet',
        title: '',
        headerShadowVisible: false,
        sheetAllowedDetents: [0.6],
        sheetCornerRadius: 16,
        }} />
    </Stack>
  )
}

export default PublicLayout