import {
  WeekendMealStudentListRequestDto,
  CheckTeacherRequestDto,
  changeStudentWeekendMealStatusRequestDto,
} from "@/models/weekendMeal/request";
import instance from "@/utils/axios";

export const getWeekendMealStudentList = async (
  request: WeekendMealStudentListRequestDto
) => {
  const weekendMealStudentList = await instance.get(
    `/applications/admin/weekend-meal/?grade=${request.gradeNum}&classNum=${request.classNum}`
  );
  return weekendMealStudentList;
};

export const checkTeacher = async (request: CheckTeacherRequestDto) => {
  return instance.post(`/applications/admin/weekend-meal/teacher/check`, {
    is_check: request.isCheck,
    grade: request.gradeNum,
    class_num: request.classNum,
  });
};

export const getWeekendMealStudentListExcel = async () => {
  return instance.get("/applications/admin/weekend-meal/excel", {
    responseType: "blob",
  });
};

export const changeStudentWeekendMealStatus = async (
  request: changeStudentWeekendMealStatusRequestDto
) => {
  return instance.patch("/applications/admin/change/student/status", {
    student_id: request.studentId,
    status: request.status,
  });
};

export const weekendMealPeriodChange = async (allowedPeriod: boolean) => {
  return instance.patch("/applications/admin/change/period", {
    allowed_period: allowedPeriod,
  });
};
