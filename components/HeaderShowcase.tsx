import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useTheme } from "@/providers/ThemeProvider";
import { AnimatedColumn, type AnimatedItem } from "@/components/ui";

const { width } = Dimensions.get("window");

const INNER_PAD = 16;
const COL_GAP = 12;
const TILE_H = 86;
const GAP = 12;

const TILE_W = Math.floor((width - 40 - INNER_PAD * 2 - COL_GAP * 2) / 3);

export default function HeaderShowcase({ height = 250 }: { height?: number }) {
  const { theme } = useTheme();

  const items: AnimatedItem[] = [
    { id: "1", title: "Lecture", icon: "book-open" },
    { id: "2", title: "Wishlist", icon: "bookmark" },
    { id: "3", title: "Notes", icon: "edit-3" },
    { id: "4", title: "Favoris", icon: "heart" },
    { id: "5", title: "Partage", icon: "share-2" },
    { id: "6", title: "Tags", icon: "tag" },
  ];

  return (
    <View style={{ alignItems: "center", justifyContent: "flex-end", height }}>
      {/* Shadow wrapper */}
      <View style={[styles.headerShadow, { shadowColor: theme.shadowColor }]}>
        {/* Clip view */}
        <View style={[styles.headerClip, Platform.OS === "android" ? styles.androidCompose : null]}>
          <LinearGradient
            colors={[theme.surfaceA, theme.surfaceB]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerInner}
          >
            <BlurView intensity={theme.mode === "dark" ? 22 : 16} tint={theme.mode} style={StyleSheet.absoluteFill} />

            {/* Incrustation subtile */}
            <LinearGradient
              colors={
                theme.mode === "dark"
                  ? ["rgba(0,0,0,0.16)", "rgba(0,0,0,0.00)", "rgba(0,0,0,0.16)"]
                  : ["rgba(0,0,0,0.06)", "rgba(0,0,0,0.00)", "rgba(0,0,0,0.06)"]
              }
              locations={[0, 0.5, 1]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />

            {/* Columns */}
            <View style={styles.cols}>
              <AnimatedColumn
                items={items}
                tileWidth={TILE_W}
                tileHeight={TILE_H}
                gap={GAP}
                direction="down"
                duration={18000}
                dim
              />
              <AnimatedColumn
                items={items}
                tileWidth={TILE_W}
                tileHeight={TILE_H}
                gap={GAP}
                direction="up"
                duration={13000}
              />
              <AnimatedColumn
                items={items}
                tileWidth={TILE_W}
                tileHeight={TILE_H}
                gap={GAP}
                direction="down"
                duration={19500}
                dim
              />
            </View>

            {/* Focus fades */}
            <LinearGradient
              colors={[
                theme.mode === "dark" ? "rgba(20,17,15,0.45)" : "rgba(251,245,230,0.35)",
                "rgba(0,0,0,0)",
              ]}
              style={[styles.fade, { top: 0, height: 44 }]}
              pointerEvents="none"
            />
            <LinearGradient
              colors={[
                "rgba(0,0,0,0)",
                theme.mode === "dark" ? "rgba(20,17,15,0.60)" : "rgba(251,245,230,0.50)",
              ]}
              style={[styles.fade, { bottom: 0, height: 90 }]}
              pointerEvents="none"
            />

            {/* Bottom blend to screen bg */}
            <LinearGradient
              colors={["rgba(0,0,0,0)", theme.bg0]}
              style={styles.bottomBlend}
              pointerEvents="none"
            />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    width: width - 40,
    height: 250,
    borderRadius: 34,
    backgroundColor: "transparent",
    shadowOpacity: 0.18,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 18 },
    elevation: Platform.OS === "android" ? 6 : 0,
  },
  headerClip: {
    flex: 1,
    borderRadius: 34,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.01)",
  },
  androidCompose: {
    // renderToHardwareTextureAndroid: true,
    // needsOffscreenAlphaCompositing: true,
  },
  headerInner: {
    flex: 1,
    paddingHorizontal: INNER_PAD,
    paddingVertical: 16,
  },
  cols: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: COL_GAP,
  },
  fade: { position: "absolute", left: 0, right: 0 },
  bottomBlend: { position: "absolute", left: 0, right: 0, bottom: 0, height: 70 },
});
