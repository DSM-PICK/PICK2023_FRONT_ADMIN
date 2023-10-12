export type CategoryType =
  | "ALL"
  | "PICNIC"
  | "ATTENDANCE"
  | "CHANGE_STUDENT"
  | "CHANGE_DIRECTOR"
  | "WEEKEND_MEAL"
  | "ETC";

export interface ReportBugRequest {
  reason?: string;
  category: CategoryType;
  image_urls?: string;
}
