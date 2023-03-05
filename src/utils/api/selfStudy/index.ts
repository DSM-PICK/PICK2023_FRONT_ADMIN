import instance from "@/utils/axios";
import {
  GetClassList,
  TodaySelfStudyTeacherDto,
  AttendanceStatudList,
  TodaySelfStudyTeacher,
} from "@/models/selfStudy/response";
import {
  GetAttendanceStatusRequestDto,
  AttandanceStatusChangeRequestDto,
} from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacherWhether = async () => {
  const todaySelfStudyTeacherWhether =
    await instance.get<TodaySelfStudyTeacher>(`/admin/state`);
  return todaySelfStudyTeacherWhether;
};

export const getTodaySelfStudyTeacher = async () => {
  const todaySelfStudyTeacher = await instance.get<TodaySelfStudyTeacherDto>(
    `/self-study/today`
  );
  return todaySelfStudyTeacher;
};

export const getChargeClass = async () => {
  const chargeClass = await instance.get<GetClassList>(`/teachers/responsible`);
  return chargeClass;
};

export const getAttendanceStatusList = async (
  request: GetAttendanceStatusRequestDto
) => {
  const attendanceStatusList = await instance.get<AttendanceStatudList>(
    `/teachers/students/${request.classRoom}?type=${request.type}`
  );
  return attendanceStatusList;
};

export const attandanceStatusChange = async (
  request: AttandanceStatusChangeRequestDto
) => {
  await instance.post(`/teachers/status`, request);
};
