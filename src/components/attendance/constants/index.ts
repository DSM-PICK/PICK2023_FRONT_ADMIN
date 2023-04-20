import { ItemType } from "@/models/common";

export const floorDropDownItem: ItemType[] = [
  { option: "2층", id: 2 },
  { option: "3층", id: 3 },
  { option: "4층", id: 4 },
];

export const attendanceDropDownItem: ItemType[] = [
  { option: "출석", id: "ATTENDANCE" },
  { option: "무단", id: "DISALLOWED" },
  { option: "귀가", id: "HOME" },
  { option: "취업", id: "EMPLOYMENT" },
  { option: "현체", id: "FIELD_TRIP" },
  { option: "조퇴", id: "LEAVE" },
];
