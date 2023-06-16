import {
  WeekendMealStudentListRequestDto,
  CheckTeacherRequestDto,
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
  return instance.post(
    `/applications/admin/weekend-meal/teacher/check?grade=${request.gradeNum}&classNum=${request.classNum}`,
    {
      is_check: request.isCheck,
    }
  );
};

export const getWeekendMealStudentListExcel = async () => {
  return instance.get("/admin/weekend-meal/all/excel", {
    responseType: "blob",
  });
};
