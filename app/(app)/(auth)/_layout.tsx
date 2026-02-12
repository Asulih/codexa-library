import { Stack } from 'expo-router';

const AuthLayout = () => {
  
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
      {/* <Stack.Screen
        name="(modal)/filter"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.7],
          title: '',
          sheetCornerRadius: 16,
          contentStyle: {backgroundColor: '#fff'}
        }}
      /> */}
    </Stack>
  )
}

export default AuthLayout