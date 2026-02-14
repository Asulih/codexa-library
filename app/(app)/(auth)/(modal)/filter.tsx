import useUserStore from '@/hooks/use-userstore';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FiltersPage = () => {
  const insets = useSafeAreaInsets();
  const { setIsGuest } = useUserStore();

  return (
    <View style={{ flex: 1, marginTop: insets.top }}>
      <Text>Filters page</Text>
    </View>
  )
}

export default FiltersPage

const styles = StyleSheet.create({})