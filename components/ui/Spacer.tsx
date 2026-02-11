import React from "react";
import { View } from "react-native";

export default function Spacer({
  h,
  w,
}: {
  h?: number; // height
  w?: number; // width
}) {
  return <View style={{ height: h ?? 0, width: w ?? 0 }} />;
}
