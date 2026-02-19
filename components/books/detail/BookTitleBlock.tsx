import React from "react";
import { View } from "react-native";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

export default function BookTitleBlock({
  title,
  authors,
}: {
  title: string;
  authors?: string[];
}) {
  const { theme } = useTheme();

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <AppText weight="bold" style={{ fontSize: 22, color: theme.text }}>
        {title}
      </AppText>

      {authors?.length ? (
        <AppText style={{ color: theme.muted, marginTop: 6 }}>
          {authors.join(", ")}
        </AppText>
      ) : null}
    </View>
  );
}
