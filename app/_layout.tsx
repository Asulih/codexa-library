import { Merienda_400Regular, Merienda_700Bold, Merienda_900Black } from '@expo-google-fonts/merienda';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from 'expo-font';
import { Slot } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    }
  }
});

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Merienda_400Regular,
    Merienda_700Bold,
    Merienda_900Black
  });

  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );

}
