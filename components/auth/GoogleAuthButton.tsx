import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const GoogleAuthButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons name='logo-google' size={18} color={'#fff'} />
      <Text style={styles.buttonText}>Continue with Google</Text>
    </TouchableOpacity>
  )
}

export default GoogleAuthButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285F4',
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