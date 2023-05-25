import { ItemType } from "@/models/common";

export const layerDropDownItem = [
  {
    option: "2층",
    id: 2,
  },
  {
    option: "3층",
    id: 3,
  },
  {
    option: "4층",
    id: 4,
  },
];
export const classDropDownItem = [
  {
    option: "정",
    id: "정",
  },
];

export const grades: ItemType[] = [
  { id: 1, option: "1학년" },
  { id: 2, option: "2학년" },
  { id: 3, option: "3학년" },
];

export const classes: ItemType[] = [
  { id: 1, option: "1반" },
  { id: 2, option: "2반" },
  { id: 3, option: "3반" },
  { id: 4, option: "4반" },
];

export const apply: ItemType[] = [
  { id: "true", option: "신청" },
  { id: "false", option: "미신청" },
];
