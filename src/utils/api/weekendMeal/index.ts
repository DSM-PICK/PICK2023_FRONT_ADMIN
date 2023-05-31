import { WeekendMealStudentListRequestDto } from "@/models/weekendMeal/request";
import instance from "@/utils/axios";

export const getWeekendMealStudentList = async (
  request: WeekendMealStudentListRequestDto
) => {
  const weekendMealStudentList = await instance.get(
    `/applications/admin/weekend-meal/?grade=${request.gradeNum}&classNum=${request.classNum}`
  );
  return weekendMealStudentList;
};

export const checkTeacher = async (
  request: WeekendMealStudentListRequestDto
) => {
  return instance.post(
    `/applications/weekend-meal/teacher?grade=${request.gradeNum}&classNum=${request.classNum}`
  );
};

export const getWeekendMealStudentListExcel = async () => {
  return instance.get("/admin/weekend-meal/all/excel", {
    responseType: "blob",
  });
};
