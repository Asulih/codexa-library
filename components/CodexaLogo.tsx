import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";

type Props = {
  size?: number;
  primary?: string; // doré
  ink?: string;     // brun/noir
};

export default function CodexaLogo({
  size = 160,
  primary = "#ecb939",
  ink = "#372e29",
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 256 256">
      {/* Base / étagère */}
      <Rect x="52" y="210" width="152" height="10" rx="5" fill={ink} opacity={0.9} />

      {/* Livre vertical + marque-page en C (stylisé) */}
      <G>
        {/* tranche du livre */}
        <Rect x="78" y="66" width="52" height="144" rx="14" fill={ink} />
        <Rect x="86" y="74" width="36" height="128" rx="10" fill="#fffaf0" opacity={0.95} />

        {/* marque-page doré (forme de C) */}
        <Path
          d="M156 78
             C122 78 118 108 118 128
             C118 148 122 178 156 178
             C176 178 186 168 186 154
             C186 152 184 150 182 150
             C180 150 178 152 178 154
             C178 164 170 170 156 170
             C128 170 126 146 126 128
             C126 110 128 86 156 86
             C170 86 178 92 178 102
             C178 104 180 106 182 106
             C184 106 186 104 186 102
             C186 88 176 78 156 78Z"
          fill={primary}
        />

        {/* petit livre horizontal */}
        <Rect x="128" y="170" width="92" height="30" rx="12" fill={ink} opacity={0.95} />
        <Rect x="136" y="176" width="76" height="18" rx="9" fill="#fffaf0" opacity={0.95} />
        <Rect x="136" y="190" width="76" height="4" rx="2" fill={primary} opacity={0.9} />
      </G>
    </Svg>
  );
}
