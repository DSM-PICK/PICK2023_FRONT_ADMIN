export interface WeekendMealStudentListRequestDto {
  gradeNum: number;
  classNum: number;
  year: number;
  month: number;
}

export interface CheckTeacherRequestDto {
  gradeNum: number;
  classNum: number;
  isCheck: boolean;
}

export interface changeStudentWeekendMealStatusRequestDto {
  studentId: string;
  status: string;
}

export interface getIsTeacherCheckRequestDto {
  gradeNum: number;
  classNum: number;
}
