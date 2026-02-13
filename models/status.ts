import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export interface Status {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  order: number;
}

export const statuses: Status[] = [
  {
    id: 'status#1',
    name: 'whishlist',
    icon: 'book-clock',
    order: 0
  },
  {
    id: 'status#2',
    name: 'to read',
    icon: 'book',
    order: 1
  },
  {
    id: 'status#3',
    name: 'in progress',
    icon: 'book-open-page-variant',
    order: 2
  },
  {
    id: 'status#4',
    name: 'read',
    icon: 'check-circle',
    order: 3
  },
  {
    id: 'status#5',
    name: 'abandoned',
    icon: 'book-cancel',
    order: 4
  },
];