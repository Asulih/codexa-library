// Natives
import { useColorScheme } from "react-native";

// Constants
import { Colors } from "../constants/theme";

/**
 * 
 * @param colorProp - A property used to get the right color in theme
 * @returns 
 */
export function useThemeColor(colorProp) {
  const theme = useColorScheme() ?? 'light';
  
  if (colorProp) {
    return Colors[theme][colorProp];
  }
  return Colors[theme];
}