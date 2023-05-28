import { weekendMealStudentType } from "../common";

export interface WeekendMealStudentListResponseDto {
  response_students: weekendMealStudentType[];
  non_response_students: weekendMealStudentType[];
}
