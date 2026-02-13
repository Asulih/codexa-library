import React from "react";
import { View, Text, StyleSheet, Pressable, Alert, Image } from "react-native";
import { Screen, CodexaButton, Divider, typography } from "@/components/ui";
import HeaderShowcase from "@/components/HeaderShowcase";
import { useTheme } from "@/providers/ThemeProvider";
import CodexaSocialButton from "@/components/ui/CodexaSocialButton";
import ThemeMiniToggle from "@/components/ThemeMiniToggle";
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useUserStore from "@/hooks/use-userstore";
import AppText from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

export default function AuthScreen() {
  const { t } = useTranslation(['auth', 'common']);
  const { theme } = useTheme();
  const typo = typography(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setIsGuest } = useUserStore();

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  return (
    <Screen>
      <View style={{ height: insets.top }}>
        <View style={{
          position: "absolute",
          top: insets.top + 8,
          right: 20,
        }}>
          <ThemeMiniToggle variant='icon' onOpenSettings={() => router.push("/settings")} />
        </View>
      </View>

      <HeaderShowcase height={300} />

      <View style={styles.body}>
        <View style={styles.brand}>
          <Image source={require('@/assets/images/codexaLogo.png')} style={styles.brandLogo} />
          <AppText brand style={typo.h1}>
            Code<Text style={{ color: theme.primary }}>xa</Text>
          </AppText>

          <AppText style={[typo.muted, styles.subtitle, { color: theme.muted }]}>
            {t('common:slogan')}
          </AppText>
        </View>

        <View style={styles.actions}>
          <Link href={'/(app)/(public)/create-account'} asChild>
            <CodexaButton title={t("auth:signinByEmail")} variant="primary" />
          </Link>

          <Divider label={t('common:or')} />

          <CodexaSocialButton provider="google" onPress={() => Alert.alert("TODO", "Google")} />
          <CodexaSocialButton provider="facebook" onPress={() => Alert.alert("TODO", "Facebook")} />

          <Pressable style={({ pressed }) => [styles.loginRow, pressed && { opacity: 0.85 }]} onPress={continueAsGuest}>
            <AppText style={[typo.caption, { color: theme.muted }]}>{t('auth:alreadyHasAccount')} </AppText>
            <AppText style={[typo.link, { color: theme.primary }]}>{t('auth:login')}</AppText>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
  brand: { alignItems: "center", marginTop: 4 },
  brandLogo: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
  },
  appName: { fontSize: 44, fontWeight: "900", letterSpacing: -0.8, marginTop: 10 },
  subtitle: { marginTop: 6, fontSize: 15 },
  actions: { marginTop: 20, gap: 12 },
  loginRow: { alignSelf: "center", flexDirection: "row", marginTop: 2, padding: 8 },
});
