import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  Platform,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Screen } from "@/components/ui";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

import { books } from "@/models/book";
import { statuses } from "@/models/status";
import { Tag } from "@/models/tag";
import { Book } from "@/models/book";

const { width } = Dimensions.get("window");

function useColumns() {
  return width >= 420 ? 3 : 2;
}

export default function BooksScreen() {
  const { theme } = useTheme();
  const columns = useColumns();

  const pagePadding = 20;
  const gap = 14;
  const containerWidth = width - pagePadding * 2;
  const cardWidth = Math.floor(
    (containerWidth - gap * (columns - 1)) / columns
  );

  const [query, setQuery] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState<string>("all");
  const [selectedTagId, setSelectedTagId] = useState<string>("all");

  // -----------------------------
  // TAGS WITH COUNT
  // -----------------------------
  const tagsWithCount = useMemo(() => {
    // const tagAndCount = new Map<string, number>();

    // for (const book of books) {
    //   for (const tagId of book.tagIds ?? []) {
    //     tagAndCount.set(tagId, (tagAndCount.get(tagId) ?? 0) + 1);
    //   }
    // }

    // const tagsWithCount = TagWithCount[] = [];
    return Array.from(map.values())
      .map(({ tag, count }) => ({ ...tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [books]);

  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const filteredBooks = useMemo(() => {
    let list = books;

    if (selectedStatusId !== "all") {
      list = list.filter((b) => b.status.id === selectedStatusId);
    }

    if (selectedTagId !== "all") {
      list = list.filter((b) =>
        b.tags.some((t) => t.id === selectedTagId)
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((b) => {
        const authorString = b.authors?.join(" ") ?? "";
        return (
          b.title.toLowerCase().includes(q) ||
          authorString.toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [query, selectedStatusId, selectedTagId]);

  return (
    <Screen>
      {/* HEADER */}
      <View style={[styles.header, { paddingHorizontal: pagePadding }]}>
        <AppText weight="extrabold" style={{ fontSize: 28, color: theme.text }}>
          Mes livres
        </AppText>
      </View>

      {/* SEARCH */}
      <View style={{ paddingHorizontal: pagePadding, marginTop: 12 }}>
        <View style={[styles.searchWrap, { borderColor: theme.borderSoft }]}>
          <BlurView
            intensity={theme.mode === "dark" ? 18 : 14}
            tint={theme.mode}
            style={StyleSheet.absoluteFill}
          />
          <Feather
            name="search"
            size={18}
            color={theme.muted}
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Titre ou auteur..."
            placeholderTextColor={theme.muted}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
      </View>

      {/* STATUS FILTER */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: pagePadding,
            marginTop: 14,
            gap: 10,
          }}
          data={[{ id: "all", name: "Tous" }, ...statuses]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const active = selectedStatusId === item.id;
            return (
              <FilterChip
                label={item.name}
                active={active}
                onPress={() => setSelectedStatusId(item.id)}
              />
            );
          }}
        />
      </View>

      {/* TAG FILTER */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: pagePadding,
            marginTop: 10,
            gap: 10,
          }}
          data={[{ id: "all", name: "Tous", count: books.length }, ...tagsWithCount]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const active = selectedTagId === item.id;
            return (
              <FilterChip
                label={
                  item.id === "all"
                    ? "Tags : Tous"
                    : `${item.name} · ${item.count}`
                }
                active={active}
                onPress={() => setSelectedTagId(item.id)}
              />
            );
          }}
        />
      </View>

      {/* GRID */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        key={columns}
        contentContainerStyle={{
          paddingHorizontal: pagePadding,
          paddingTop: 18,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{ gap }}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        renderItem={({ item }) => (
          <BookCard book={item} width={cardWidth} />
        )}
      />
    </Screen>
  );
}

/* ------------------------------------------------------------ */
/* ------------------------ COMPONENTS ------------------------- */
/* ------------------------------------------------------------ */

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderColor: theme.borderSoft,
          backgroundColor: active
            ? theme.mode === "dark"
              ? "rgba(236,185,57,0.2)"
              : "rgba(236,185,57,0.25)"
            : "transparent",
        },
        pressed && { opacity: 0.9 },
      ]}
    >
      <AppText
        weight="semibold"
        style={{
          fontSize: 13,
          color: active ? theme.text : theme.muted,
        }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

function BookCard({ book, width }: { book: Book; width: number }) {
  const { theme } = useTheme();
  const coverHeight = Math.round(width * 1.4);

  return (
    <View style={{ width }}>
      <View
        style={[
          styles.cover,
          {
            height: coverHeight,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <Image
          source={book.cover}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />

        {/* STATUS BADGE */}
        <View style={[styles.badge, { borderColor: theme.borderSoft }]}>
          <BlurView
            intensity={15}
            tint={theme.mode}
            style={StyleSheet.absoluteFill}
          />
          <AppText
            weight="semibold"
            style={{ fontSize: 12, color: theme.text }}
          >
            {book.status.name}
          </AppText>
        </View>
      </View>

      <View style={{ marginTop: 8 }}>
        <AppText
          weight="extrabold"
          numberOfLines={1}
          style={{ color: theme.text }}
        >
          {book.title}
        </AppText>
        <AppText
          numberOfLines={1}
          style={{ color: theme.muted, fontSize: 13 }}
        >
          {book.authors?.join(", ")}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 18 : 22,
  },
  searchWrap: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  chip: {
    height: 34,
    borderRadius: 999,
    paddingHorizontal: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: Platform.OS === "android" ? 3 : 0,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
