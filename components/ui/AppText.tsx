import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";

type FontWeightVariant =
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

type Props = TextProps & {
  weight?: FontWeightVariant;
  italic?: boolean;
  brand?: boolean;
  style?: StyleProp<TextStyle>;
};

const FONT_MAP: Record<FontWeightVariant, {normal: string, italic?: string}> = {
  regular: {
    normal: "Inter_400Regular",
    italic: "Inter_400Regular_Italic",
  },
  medium: {
    normal: "Inter_500Medium",
    italic: "Inter_500Medium_Italic",
  },
  semibold: {
    normal: "Inter_600SemiBold",
    italic: "Inter_600SemiBold_Italic",
  },
  bold: {
    normal: "Inter_700Bold",
    italic: "Inter_700Bold_Italic",
  },
  extrabold: {
    normal: "Inter_800ExtraBold",
    italic: "Inter_800ExtraBold_Italic",
  }
};

export default function AppText({
  weight = "regular",
  italic = false,
  brand = false,
  style,
  ...rest
}: Props) {
  const fontFamily = brand
    ? "CormorantGaramond_700Bold"
    : italic && FONT_MAP[weight].italic
    ? FONT_MAP[weight].italic
    : FONT_MAP[weight].normal;
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily,
        },
        style,
      ]}
    />
  );
}
