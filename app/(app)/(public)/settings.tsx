import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Screen, CodexaCard } from "@/components/ui";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@/providers/ThemeProvider";
import AppText from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation('settings');

  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={[styles.title, { color: theme.text }]}>{t('settings:settings')}</AppText>

        <CodexaCard style={{ marginTop: 14 }}>
          <AppText style={[styles.sectionTitle, { color: theme.text }]}>{t('settings:appearence')}</AppText>
          <AppText style={[styles.sectionSub, { color: theme.muted }]}>
            {t('settings:chooseTheme')} Codexa.
          </AppText>

          <View style={{ marginTop: 12 }}>
            <ThemeSwitcher />
          </View>
        </CodexaCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  title: { fontSize: 34, fontWeight: "900", letterSpacing: -0.6 },
  sectionTitle: { fontSize: 16, fontWeight: "900" },
  sectionSub: { marginTop: 6, fontSize: 14, lineHeight: 18 },
});
