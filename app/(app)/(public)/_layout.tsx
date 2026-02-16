import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router'

const PublicLayout = () => {
  const { theme } = useTheme();
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.bg0 }
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