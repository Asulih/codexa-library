// components/ui/CodexaSocialButton.tsx
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { typography } from "./Typo";
import AppText from "./AppText";

type Provider = "google" | "facebook";

type Props = {
  provider: Provider;
  onPress?: () => void;
  style?: ViewStyle;
};

const PROVIDER_META: Record<
  Provider,
  { title: string; iconName: React.ComponentProps<typeof FontAwesome>["name"] }
> = {
  google: { title: "Continuer avec Google", iconName: "google" },
  facebook: { title: "Continuer avec Facebook", iconName: "facebook" },
};

export default function CodexaSocialButton({ provider, onPress, style }: Props) {
  const { theme } = useTheme();
  const t = typography(theme);

  const meta = PROVIDER_META[provider];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          borderColor: theme.borderSoft,
          backgroundColor: "transparent",
        },
        pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      {/* Left icon */}
      <View style={styles.left}>
        <FontAwesome name={meta.iconName} size={18} color={theme.muted} />
      </View>

      {/* Centered label */}
      <AppText weight="extrabold" style={[t.button, styles.text, { color: theme.text }]} numberOfLines={1}>
        {meta.title}
      </AppText>

      {/* Right spacer to keep label centered */}
      <View style={styles.right} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 14,
  },
  left: { width: 28, alignItems: "center", justifyContent: "center" },
  right: { width: 28 },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
});
