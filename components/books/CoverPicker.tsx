import React from "react";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import type { ImageSourcePropType } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  value?: ImageSourcePropType;
  onChange: (next?: ImageSourcePropType) => void;
};

export default function CoverPicker({ value, onChange }: Props) {
  const { theme } = useTheme();

  async function pickFromLibrary() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission", "Accès à la galerie requis pour choisir une photo.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.9,
    });

    if (result.canceled) return;
    const uri = result.assets?.[0]?.uri;
    if (!uri) return;

    onChange({ uri });
  }

  async function takeWithCamera() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission", "Accès à la caméra requis pour prendre une photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.9,
    });

    if (result.canceled) return;
    const uri = result.assets?.[0]?.uri;
    if (!uri) return;

    onChange({ uri });
  }

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
      <AppText weight="semibold" style={{ color: theme.text, marginBottom: 10 }}>
        Couverture
      </AppText>

      <View style={styles.row}>
        <View
          style={[
            styles.coverBox,
            { borderColor: theme.borderSoft, backgroundColor: theme.surfaceB, shadowColor: theme.shadowColor },
          ]}
        >
          {value ? (
            <Image source={value} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <MaterialCommunityIcons name="image" size={26} color={theme.muted} />
              <AppText style={{ color: theme.chipMuted, fontSize: 12, marginTop: 6 }}>Aucune image</AppText>
            </View>
          )}
        </View>

        <View style={{ flex: 1, gap: 10 }}>
          <ActionButton icon="images" label="Galerie" onPress={pickFromLibrary} />
          <ActionButton icon="camera" label="Caméra" onPress={takeWithCamera} />
          {value && <ActionButton icon="trash" label="Retirer" onPress={() => onChange(undefined)} />}
        </View>
      </View>
    </View>
  );

  function ActionButton({
    icon,
    label,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
  }) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.actionBtn,
          {
            borderColor: theme.borderSoft,
            backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.65)",
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Ionicons name={icon} size={18} color={theme.muted} />
        <AppText style={{ color: theme.text, marginLeft: 8, fontSize: 13 }} weight="semibold">
          {label}
        </AppText>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  coverBox: {
    width: 110,
    aspectRatio: 2 / 3,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  actionBtn: {
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
