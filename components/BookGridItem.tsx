import React from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import AppText from "@/components/ui/AppText";

export type Book = {
  id: string;
  title: string;
  author: string;
  status: "to_read" | "reading" | "read";
  tags: string[];
};

function statusLabel(s: Book["status"]) {
  if (s === "to_read") return "À lire";
  if (s === "reading") return "En cours";
  return "Lu";
}

function statusIcon(s: Book["status"]) {
  if (s === "to_read") return "bookmark";
  if (s === "reading") return "book-open";
  return "check-circle";
}

export default function BookGridItem({
  book,
  width,
  onPress,
}: {
  book: Book;
  width: number;
  onPress?: () => void;
}) {
  const { theme } = useTheme();
  const coverH = Math.round(width * 1.38);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ width }, pressed && { opacity: 0.95, transform: [{ scale: 0.995 }] }]}>
      <View style={[styles.cover, { height: coverH, borderColor: theme.borderSoft, shadowColor: theme.shadowColor }]}>
        <LinearGradient
          colors={
            theme.mode === "dark"
              ? ["rgba(240,199,94,0.12)", "rgba(114,98,85,0.10)", "rgba(0,0,0,0.12)"]
              : ["rgba(240,199,94,0.32)", "rgba(114,98,85,0.16)", "rgba(255,255,255,0.85)"]
          }
          style={StyleSheet.absoluteFill}
        />

        <View style={[styles.spine, { backgroundColor: theme.primary, opacity: theme.mode === "dark" ? 0.55 : 0.75 }]} />

        <View style={styles.coverText}>
          <AppText weight="extrabold" style={{ color: theme.text, fontSize: 13 }} numberOfLines={2}>
            {book.title}
          </AppText>
          <AppText style={{ color: theme.muted, fontSize: 12, marginTop: 6 }} numberOfLines={1}>
            {book.author}
          </AppText>
        </View>

        <View style={[styles.badge, { borderColor: theme.borderSoft }]}>
          <BlurView intensity={theme.mode === "dark" ? 16 : 12} tint={theme.mode} style={StyleSheet.absoluteFill} />
          <View style={styles.badgeInner}>
            <Feather name={statusIcon(book.status) as any} size={13} color={theme.primary} />
            <AppText weight="semibold" style={{ color: theme.text, fontSize: 12, marginLeft: 6 }}>
              {statusLabel(book.status)}
            </AppText>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <AppText weight="extrabold" style={{ color: theme.text, fontSize: 14 }} numberOfLines={1}>
          {book.title}
        </AppText>
        <AppText style={{ color: theme.muted, fontSize: 13, marginTop: 2 }} numberOfLines={1}>
          {book.author}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cover: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  spine: { position: "absolute", left: 0, top: 0, bottom: 0, width: 10 },
  coverText: { flex: 1, padding: 14, justifyContent: "flex-end" },
  badge: {
    position: "absolute",
    left: 12,
    top: 12,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
  },
  badgeInner: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 6 },
});
