import React from "react";
import { Screen } from "@/components/ui";
import AppText from "@/components/ui/AppText";
import { useLocalSearchParams } from "expo-router";

export default function BookDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <AppText weight="extrabold" style={{ fontSize: 22 }}>
        Book: {id}
      </AppText>
    </Screen>
  );
}
