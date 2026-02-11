import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const FacebookAuthButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons name='logo-facebook' size={20} color={'#fff'} />
      <Text style={styles.buttonText}>Connexion</Text>
    </TouchableOpacity>
  )
}

export default FacebookAuthButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b5998',
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