// components/ui/AppTextInput.tsx
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AppText from './AppText';
import { useTheme } from '@/providers/ThemeProvider';

type AppTextInputProps = {
  value: string;
  label?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  editable?: boolean;
  error?: string;
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  clearable?: boolean;
  style?: any;
  inputStyle?: any;
  containerStyle?: any;
};

const AppTextInput = ({
  value,
  label,
  onChangeText,
  placeholder = '',
  placeholderTextColor,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = true,
  editable = true,
  error,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  clearable = false,
  style,
  inputStyle,
  containerStyle,
}: AppTextInputProps) => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText style={[styles.label, { color: theme.text }]}>
          {label}
        </AppText>
      )}
      {leftIcon && (
        <TouchableOpacity
          style={styles.icon}
          onPress={onLeftIconPress}
          disabled={!onLeftIconPress}
        >
          <MaterialCommunityIcons
            name={leftIcon}
            size={20}
            color={theme.muted}
          />
        </TouchableOpacity>
      )}

      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            backgroundColor: theme.surfaceA,
            borderColor: error ? theme.error : isFocused ? theme.primary : theme.borderSoft,
            color: theme.text,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || theme.muted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={editable}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectionColor={theme.primary}
      />

      {(clearable && value) && (
        <TouchableOpacity
          style={styles.icon}
          onPress={handleClear}
        >
          <MaterialCommunityIcons
            name="close"
            size={20}
            color={theme.muted}
          />
        </TouchableOpacity>
      )}

      {rightIcon && (
        <TouchableOpacity
          style={styles.icon}
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
        >
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={theme.muted}
          />
        </TouchableOpacity>
      )}
      {error && (
        <AppText style={[styles.error, { color: theme.error }]}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14, fontWeight: 'bold',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  icon: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 16,
  }
});

export default AppTextInput;