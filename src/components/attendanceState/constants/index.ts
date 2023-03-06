import { ItemType } from "@/models/common";

export const floorDropDownItem: ItemType[] = [
  { option: "2층", id: 2 },
  { option: "3층", id: 3 },
  { option: "4층", id: 4 },
];

export const classDropDownItem: ItemType[] = [
  { option: "세미나실 4-1", id: 2 },
  { option: "세미나실 4-2", id: 3 },
  { option: "세미나실 4-3", id: 4 },
];

export const attendanceDropDownItem: ItemType[] = [
  { option: "출석", id: "ATTENDANCE" },
  { option: "무단", id: "DISALLOWED " },
];

export const studentInfo = [
  {
    student_id: "UUID",
    student_number: "1201",
    student_name: "강용수",
    type_list: [
      "ATTENDANCE",
      "ATTENDANCE",
      "ATTENDANCE",
      "ATTENDANCE",
      "ATTENDANCE",
    ],
  },
  {
    student_id: "UUID",
    student_number: "2106",
    student_name: "김의찬",
    type_list: ["ATTENDANCE", "ATTENDANCE", "MOVEMENT", "MOVEMENT", "MOVEMENT"],
  },
  {
    student_id: "UUID",
    student_number: "2119",
    student_name: "조상현",
    type_list: [
      "DISALLOWED",
      "DISALLOWED",
      "DISALLOWED",
      "DISALLOWED",
      "DISALLOWED",
    ],
  },
  {
    student_id: "UUID",
    student_number: "2120",
    student_name: "추혜연",
    type_list: [
      "FIELD_TRIP",
      "FIELD_TRIP",
      "FIELD_TRIP",
      "FIELD_TRIP",
      "FIELD_TRIP",
    ],
  },
  {
    student_id: "UUID",
    student_number: "2213",
    student_name: "이경수",
    type_list: [
      "MOVEMENT",
      "MOVEMENT",
      "ATTENDANCE",
      "ATTENDANCE",
      "ATTENDANCE",
    ],
  },
  {
    student_id: "UUID",
    student_number: "2118",
    student_name: "정대현",
    type_list: [
      "ATTENDANCE",
      "ATTENDANCE",
      "ATTENDANCE",
      "ATTENDANCE",
      "ATTENDANCE",
    ],
  },
  {
    student_id: "UUID",
    student_number: "2313",
    student_name: "전세현",
    type_list: ["PICNIC", "PICNIC", "ATTENDANCE", "ATTENDANCE", "ATTENDANCE"],
  },
  {
    student_id: "UUID",
    student_number: "2419",
    student_name: "하혜령",
    type_list: [
      "ATTENDANCE",
      "ATTENDANCE",
      "MOVEMENT",
      "ATTENDANCE",
      "ATTENDANCE",
    ],
  },
  {
    student_id: "UUID",
    student_number: "1312",
    student_name: "안윤지",
    type_list: ["ATTENDANCE", "ATTENDANCE", "PICNIC", "PICNIC", "PICNIC"],
  },
];
