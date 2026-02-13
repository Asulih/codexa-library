import AppleAuthButton from '@/components/auth/AppleAuthButton';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import { CodexaButton, typography } from '@/components/ui';
import AppText from '@/components/ui/AppText';
import { Colors, Fonts } from '@/constants/theme';
import useUserStore from '@/hooks/use-userstore'
import { useTheme } from '@/providers/ThemeProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TextBase, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated';

const CreateAccountPage = () => {
  const { t } = useTranslation('auth');
  const { theme } = useTheme();
  const typo = typography(theme);
  const router = useRouter();
  const { setIsGuest } = useUserStore();

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg0 }]}>
      <TouchableOpacity
        style={[styles.closeBtn, { backgroundColor: theme.bg0 }]}
        onPress={() => router.dismiss()}>
        <Ionicons name='close' size={24} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Animated.View entering={FadeInDown.delay(100)}>
          <TextInput placeholder={t('auth:username')} style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10 }}/>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200)}>
          <TextInput placeholder={t('auth:email')} style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10 }}/>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(300)}>
          <TextInput placeholder={t('auth:password')} style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10 }}/>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(400)}>
          <TextInput placeholder={t('auth:passwordConfirm')} style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10 }}/>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(500)}>
          <CodexaButton title={t('auth:signin')} variant="primary" />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(400)}>
          <Pressable style={({ pressed }) => [styles.loginRow, pressed && { opacity: 0.85 }]}>
            <AppText style={[typo.caption, { color: theme.muted }]}>{t('auth:alreadyHasAccount')} </AppText>
            <AppText style={[typo.link, { color: theme.primary }]}>{t('auth:login')}</AppText>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  )
}

export default CreateAccountPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  closeBtn: {
    borderRadius: 40,
    padding: 8,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.brandBlack,
    marginVertical: 22,
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
  },
  otherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 12,
    gap: 4
  },
  otherButtonText: {
    fontSize: 18,
    fontWeight: '600'
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 12,
    gap: 4
  },
  facebookButtonText: {
    fontSize: 18,
    fontWeight: '600'
  },
  loginRow: { alignSelf: "center", flexDirection: "row", marginTop: 2, padding: 8 },
})