const StatusMap = new Map<string, string>([
  ["DISALLOWED", "무단"],
  ["LEAVE", "조퇴"],
  ["HOME", "귀가"],
  ["FIELD_TRIP", "현체"],
  ["FIELD_TRIP_START", "현체 시작"],
  ["EMPLOYMENT", "취업"],
  ["EMPLOYMENT_START", "취업 시작"],
  ["PICNIC", "외출"],
  ["MOVEMENT", "교실이동"],
  ["AWAIT", "대기"],
  ["PICNIC_REJECT", "외출 거절"],
  ["ATTENDANCE", "출석"],
  ["NOT_COMEBACK", "미복귀"],
  ["DROPOUT", "자퇴"],
]);

export const transStatus = (key: string): string => {
  return String(StatusMap.get(key));
};
