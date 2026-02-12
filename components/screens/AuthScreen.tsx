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
import AppText from "../ui/AppText";

export default function AuthScreen() {
  const { theme } = useTheme();
  const t = typography(theme);
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
          <AppText brand style={t.h1}>
            Code<Text style={{ color: theme.primary }}>xa</Text>
          </AppText>

          <AppText style={[t.muted, styles.subtitle, { color: theme.muted }]}>
            Votre bibliothèque, parfaitement rangée.
          </AppText>
        </View>

        <View style={styles.actions}>
          <Link href={'/(app)/(public)/create-account'} asChild>
            <CodexaButton title="Inscription par email" variant="primary" />
          </Link>

          <Divider label="Ou" />

          <CodexaSocialButton provider="google" onPress={() => Alert.alert("TODO", "Google")} />
          <CodexaSocialButton provider="facebook" onPress={() => Alert.alert("TODO", "Facebook")} />

          <Pressable style={({ pressed }) => [styles.loginRow, pressed && { opacity: 0.85 }]} onPress={continueAsGuest}>
            <AppText style={[t.caption, { color: theme.muted }]}>J'ai déjà un compte </AppText>
            <AppText style={[t.link, { color: theme.primary }]}>Connexion</AppText>
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
