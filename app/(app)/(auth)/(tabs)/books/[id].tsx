import React from "react";
import { Screen } from "@/components/ui";
import AppText from "@/components/ui/AppText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBooksStore } from "@/store/useBooksStore";

export default function BookDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const book = useBooksStore(
    (state) => state.books.find((b) => b.id === id)
  );
  console.log('book > ', book);

  return (
    <Screen>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left-bold" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.image}>
            <Image style={styles.cover} source={ book?.cover } />
          </View>
          <AppText weight="extrabold" style={{ fontSize: 22 }}>
            Book: {id}
          </AppText>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  backBtn: {},
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
  },
  image: {
    height: 300,
    width: '100%',
    alignItems: 'center',
  },
  cover: {
    height: '100%',
    width: "50%",
  },
});