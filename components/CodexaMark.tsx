import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export default function CodexaMark({
  size = 72,
  primary = "#ecb939",
  ink = "#372e29",
}: { size?: number; primary?: string; ink?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Livre vertical */}
      <Rect x="14" y="10" width="16" height="44" rx="6" fill={ink} />
      <Rect x="17" y="13" width="10" height="38" rx="4" fill="#fffaf0" opacity="0.95" />

      {/* Livre horizontal */}
      <Rect x="28" y="36" width="28" height="12" rx="5" fill={ink} opacity="0.95" />
      <Rect x="31" y="38" width="22" height="8" rx="4" fill="#fffaf0" opacity="0.95" />

      {/* C (marque-page) */}
      <Path
        d="M44 18
           C36 18 34 24 34 32
           C34 40 36 46 44 46
           C49 46 52 43 52 39
           C52 38 51 37 50 37
           C49 37 48 38 48 39
           C48 41 46 42 44 42
           C39 42 38 37 38 32
           C38 27 39 22 44 22
           C46 22 48 23 48 25
           C48 26 49 27 50 27
           C51 27 52 26 52 25
           C52 21 49 18 44 18Z"
        fill={primary}
      />
    </Svg>
  );
}
