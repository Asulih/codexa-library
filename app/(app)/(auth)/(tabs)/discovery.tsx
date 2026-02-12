import useUserStore from '@/hooks/use-userstore';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DiscoveryPage = () => {
  const insets = useSafeAreaInsets();
  const { setIsGuest } = useUserStore();

  return (
    <View style={{ flex: 1, marginTop: insets.top }}>
      <Text>My inside page</Text>
      <Button title='Go login' onPress={() => setIsGuest(false)} />
    </View>
  )
}

export default DiscoveryPage

const styles = StyleSheet.create({})