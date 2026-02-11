import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

const CreateAccountButton = () => {
  const textColor = useThemeColor('text');
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={[styles.buttonText, { color: textColor }]}>Inscription par email</Text>
    </TouchableOpacity>
  )
}

export default CreateAccountButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});