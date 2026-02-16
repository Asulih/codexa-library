import React, { memo } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;

  actionLabel?: string;
  actionIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onActionPress?: () => void;
  actionDisabled?: boolean;
} & React.ComponentProps<typeof TextInput>;

function BookFormFieldBase({
  label,
  hint,
  error,
  required,
  actionLabel,
  actionIcon,
  onActionPress,
  actionDisabled,
  style,
  ...props
}: Props) {
  const { theme } = useTheme();
  const multiline = !!props.multiline;

  const showAction = !!actionLabel && !!onActionPress;

  return (
    <View>
      <View style={styles.labelRow}>
        <AppText weight="semibold" style={{ color: theme.text, fontSize: 13 }}>
          {label}
          {required ? <AppText style={{ color: theme.primary }}> *</AppText> : null}
        </AppText>

        {showAction ? (
          <Pressable
            onPress={onActionPress}
            disabled={actionDisabled}
            hitSlop={10}
            style={({ pressed }) => [
              styles.actionPill,
              {
                borderColor: theme.borderSoft,
                backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.65)",
                opacity: actionDisabled ? 0.45 : pressed ? 0.9 : 1,
              },
            ]}
          >
            {actionIcon ? (
              <MaterialCommunityIcons name={actionIcon} size={16} color={theme.primary} style={{ marginRight: 6 }} />
            ) : null}
            <AppText weight="semibold" style={{ color: theme.primary, fontSize: 12.5 }}>
              {actionLabel}
            </AppText>
          </Pressable>
        ) : null}
      </View>

      <TextInput
        {...props}
        multiline={multiline}
        style={[
          styles.input,
          {
            backgroundColor: theme.surfaceA,
            borderColor: error ? theme.errorBorder : theme.borderSoft,
            color: theme.text,
            shadowColor: theme.shadowColor,
            height: multiline ? 120 : 46,
            textAlignVertical: multiline ? "top" : "center",
          },
          style,
        ]}
        placeholderTextColor={theme.muted}
      />

      {error ? (
        <View style={[styles.helperRow, { backgroundColor: theme.errorBg, borderColor: theme.errorBorder }]}>
          <AppText style={{ color: theme.error, fontSize: 12 }}>{error}</AppText>
        </View>
      ) : hint ? (
        <AppText style={{ color: theme.chipMuted, fontSize: 12, marginTop: 6 }}>{hint}</AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 6,
  },
  actionPill: {
    height: 28,
    borderRadius: 999,
    paddingHorizontal: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  helperRow: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

export default memo(BookFormFieldBase);
