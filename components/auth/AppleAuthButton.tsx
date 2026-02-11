import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const AppleAuthButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons name='logo-apple' size={18} color={'#fff'} />
      <Text style={styles.buttonText}>Sign in with Apple</Text>
    </TouchableOpacity>
  )
}

export default AppleAuthButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 12,
    gap: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});