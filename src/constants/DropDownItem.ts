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
  { id: "APPLY", option: "신청" },
  { id: "NOT_APPLY", option: "미신청" },
];

export const monthDropDownItem: ItemType[] = [
  { id: 3, option: "3월" },
  { id: 4, option: "4월" },
  { id: 5, option: "5월" },
  { id: 6, option: "6월" },
  { id: 7, option: "7월" },
  { id: 8, option: "8월" },
  { id: 9, option: "9월" },
  { id: 10, option: "10월" },
  { id: 11, option: "11월" },
  { id: 12, option: "12월" },
  { id: 1, option: "1월" },
];

export const moveLayerDropDownItem: ItemType[] = [
  {
    option: "1층",
    id: 1,
  },
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
  {
    option: "5층",
    id: 5,
  },
];

const nowYear: number = new Date().getFullYear();

export const yearDropDownItem: ItemType[] = [
  {
    option: `${nowYear}년`,
    id: nowYear,
  },
  {
    option: `${nowYear - 1}년`,
    id: nowYear - 1,
  },
  {
    option: `${nowYear - 2}년`,
    id: nowYear - 2,
  },
];

export const BugTypeItem: ItemType[] = [
  { id: "ALL", option: "전체" },
  { id: "PICNIC", option: "외출 관리" },
  { id: "ATTENDANCE", option: "출결상태 관리" },
  { id: "CHANGE_STUDENT", option: "인원 변경" },
  { id: "CHANGE_DIRECTOR", option: "자습 감독 변경" },
  { id: "WEEKEND_MEAL", option: "주말급식" },
  { id: "ETC", option: "기타" },
];
