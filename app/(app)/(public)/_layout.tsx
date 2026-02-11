import { Stack } from 'expo-router'

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false,
        contentStyle: { backgroundColor: '#f5edca' }
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