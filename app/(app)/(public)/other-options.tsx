import useUserStore from '@/hooks/use-userstore'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const OtherOptionsPage = () => {
  const router = useRouter();
  const { setIsGuest } = useUserStore();

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  return (
    <View>
      <Text>OtherOptionsPage</Text>
    </View>
  )
}

export default OtherOptionsPage

const styles = StyleSheet.create({

})