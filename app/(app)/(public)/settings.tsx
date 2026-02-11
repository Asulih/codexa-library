import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Screen, CodexaCard } from "@/components/ui";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@/providers/ThemeProvider";

export default function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Réglages</Text>

        <CodexaCard style={{ marginTop: 14 }}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Apparence</Text>
          <Text style={[styles.sectionSub, { color: theme.muted }]}>
            Choisissez le thème de Codexa.
          </Text>

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
