import React, { useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import AppText from "./AppText";

export type AnimatedItem = {
  id: string;
  title: string;
  icon: keyof typeof Feather.glyphMap;
};

type Props = {
  items: AnimatedItem[];
  tileWidth: number;
  tileHeight: number;
  gap: number;
  direction: "up" | "down";
  duration: number;
  dim?: boolean;
};

export default function AnimatedColumn({
  items,
  tileWidth,
  tileHeight,
  gap,
  direction,
  duration,
  dim = false,
}: Props) {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(0)).current;

  // 3x pour rendre le reset invisible
  const loop = useMemo(() => [...items, ...items, ...items], [items]);
  const cycle = items.length * (tileHeight + gap);

  useEffect(() => {
    const start = direction === "down" ? -cycle : 0;
    const end = direction === "down" ? 0 : -cycle;

    translateY.setValue(start);

    const anim = Animated.loop(
      Animated.timing(translateY, {
        toValue: end,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    );

    anim.start();
    return () => anim.stop();
  }, [cycle, direction, duration, translateY]);

  return (
    <View style={{ width: tileWidth, overflow: "hidden", opacity: dim ? 0.72 : 1 }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {loop.map((it, idx) => (
          <View
            key={`${it.id}-${idx}`}
            style={[
              styles.tile,
              {
                width: tileWidth,
                height: tileHeight,
                backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.50)",
              },
            ]}
          >
            <Feather name={it.icon} size={18} color={theme.primary} style={{ marginBottom: 6 }} />
            <AppText weight="extrabold" style={[styles.title, { color: theme.chipText }]} numberOfLines={1}>
              {it.title}
            </AppText>
            <AppText italic style={[styles.sub, { color: theme.chipMuted }]} numberOfLines={1}>
              Organisez
            </AppText>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    justifyContent: "center",
  },
  title: { fontSize: 14 },
  sub: { fontSize: 12, marginTop: 2 },
});
