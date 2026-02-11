import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/use-theme-color';

interface AuthButtonProps {
  text: string;
  icon?: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
}

const AuthButton = ({text, icon, backgroundColor = '#fff', textColor = '', iconColor = '#000'}: AuthButtonProps) => {
  if (!textColor) textColor = useThemeColor('text');
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]}>
      {icon && <Ionicons name={icon} size={20} color={iconColor} /> }
      <Text style={[styles.buttonText, { color: textColor }]}>{ text }</Text>
    </TouchableOpacity>
  )
}

export default AuthButton

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600'
  }
});