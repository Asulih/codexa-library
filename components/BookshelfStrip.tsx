import React from "react";
import Svg, { Rect } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  primary?: string;
  ink?: string;
  paper?: string;
};

export default function BookshelfStrip({
  width = 360,
  height = 70,
  primary = "#ecb939",
  ink = "#372e29",
  paper = "#fffaf0",
}: Props) {
  const h = height;
  return (
    <Svg width={width} height={height} viewBox={`0 0 360 ${h}`}>
      {/* planche */}
      <Rect x="0" y={h - 10} width="360" height="10" rx="5" fill={ink} opacity={0.9} />

      {/* livres (rectangles simples, ça rend étonnamment bien en bas d’écran) */}
      <Rect x="14" y="14" width="30" height={h - 24} rx="7" fill={primary} />
      <Rect x="48" y="20" width="22" height={h - 30} rx="7" fill={ink} opacity={0.95} />
      <Rect x="74" y="10" width="34" height={h - 20} rx="7" fill={paper} opacity={0.95} />
      <Rect x="112" y="18" width="26" height={h - 28} rx="7" fill={ink} opacity={0.85} />
      <Rect x="142" y="8" width="40" height={h - 18} rx="7" fill={primary} opacity={0.8} />
      <Rect x="186" y="22" width="18" height={h - 32} rx="7" fill={paper} opacity={0.9} />
      <Rect x="208" y="12" width="34" height={h - 22} rx="7" fill={ink} opacity={0.95} />
      <Rect x="246" y="18" width="26" height={h - 28} rx="7" fill={primary} opacity={0.85} />
      <Rect x="276" y="10" width="34" height={h - 20} rx="7" fill={paper} opacity={0.95} />
      <Rect x="314" y="20" width="28" height={h - 30} rx="7" fill={ink} opacity={0.9} />
    </Svg>
  );
}
