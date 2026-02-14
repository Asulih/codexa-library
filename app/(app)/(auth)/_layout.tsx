import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="(modal)/location"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.7],
          title: '',
          sheetCornerRadius: 16,
        }}
      /> */}
      <Stack.Screen
        name="(modal)/filter"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.7],
          title: '',
          sheetCornerRadius: 16,
          contentStyle: { backgroundColor: theme.bg0 }
        }}
      />
    </Stack>
  )
}

export default AuthLayout