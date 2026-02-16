import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export const STATUS_ALL_ID = "status#all" as const;
export const STATUS_IDS = {
  ALL: "status#all",
  TO_READ: "status#1",
  IN_PROGRESS: "status#2",
  READ: "status#3",
  WHISHLIST: "status#4",
  ABANDONED: "status#5",
} as const;
export type StatusId = typeof STATUS_ALL_ID | `status#${number}`;
export const DEFAULT_STATUS_ID: StatusId = STATUS_IDS.READ;

export interface Status {
  id: StatusId;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  order: number;
}

export const statuses: Status[] = [
  {
    id: 'status#all',
    name: 'all',
    icon: 'view-grid',
    color: "#ecb939",
    order: -1
  },
  {
    id: 'status#1',
    name: 'to read',
    icon: 'book',
    color: "#ecb939",
    order: 0
  },
  {
    id: 'status#2',
    name: 'in progress',
    icon: 'book-open-page-variant',
    color: "#c76136",
    order: 1
  },
  {
    id: 'status#3',
    name: 'read',
    icon: 'check-circle',
    color: "#588b6e",
    order: 2
  },
  {
    id: 'status#4',
    name: 'whishlist',
    icon: 'book-clock',
    color: "#726255",
    order: 3
  },
  {
    id: 'status#5',
    name: 'abandoned',
    icon: 'book-cancel',
    color: "#783e34",
    order: 4
  },
];