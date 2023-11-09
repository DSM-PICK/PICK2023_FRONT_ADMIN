import instance from "@/utils/axios";
import {
  GetClassList,
  TodaySelfStudyTeacherDto,
  AttendanceStatudList,
  TodaySelfStudyTeacher,
  MainPageStudentNumber,
  MoveSudentList,
  AttendanceCheckStudentList,
  AfterSchoolUserList,
  ClubMemberList,
  SchoolTeacherList,
  FloorClassRoomDto,
  SelfStudyTeacher,
} from "@/models/selfStudy/response";
import {
  GetAttendanceStatusRequestDto,
  AttandanceStatusChangeRequestDto,
  MoveStudentRequest,
  AttendanceListRequest,
  IssuanceOuting,
  AfterSchoolUserDelete,
  SelfStudyTeacherPatch,
  ClassRoomStudentStatusPatch,
} from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacherWhether = async () => {
  const todaySelfStudyTeacherWhether =
    await instance.get<TodaySelfStudyTeacher>(`/pick/admin/state`);
  return todaySelfStudyTeacherWhether.data;
};

export const getTodaySelfStudyTeacher = async () => {
  const todaySelfStudyTeacher = await instance.get<TodaySelfStudyTeacherDto>(
    `/pick/self-study/today`
  );
  return todaySelfStudyTeacher.data;
};

export const getChargeClass = async () => {
  const chargeClass = await instance.get<GetClassList>(
    `/pick/teachers/responsible`
  );
  return chargeClass;
};

export const getAttendanceStatusList = async (
  request: GetAttendanceStatusRequestDto
) => {
  const attendanceStatusList = await instance.get<AttendanceStatudList>(
    `/pick/teachers/students/${request.classRoom}?type=${request.type}`
  );
  return attendanceStatusList;
};

export const attandanceStatusChange = async (
  request: AttandanceStatusChangeRequestDto
) => {
  return await instance.post(`/pick/teachers/status`, request);
};

export const getMainpageStudnetCount = async () => {
  const getManipageCount = await instance.get<MainPageStudentNumber>(
    `/pick/admin/students/count`
  );
  return getManipageCount.data;
};

export const getMoveStudentList = async (request: MoveStudentRequest) => {
  const moveStudentList = await instance.get<MoveSudentList>(
    `/pick/admin/movement?grade=${request.grade}&classNum=${request.classNum}&floor=${request.floor}`
  );
  return moveStudentList.data;
};

export const getAttendanceCheckList = async (
  request: AttendanceListRequest
) => {
  const attendanceCheckList = await instance.get<AttendanceCheckStudentList>(
    `/pick/admin/attendance/${request.classroom_id}?date=${request.date}`
  );
  return attendanceCheckList.data;
};

export const getAfterSchoolMemberList = async (after_school_id: string) => {
  const afterSchoolMemberList = await instance.get<AfterSchoolUserList>(
    `/pick/admin/afterSchool/${after_school_id}`
  );
  return afterSchoolMemberList;
};

export const getClubMemberList = async (club_id: string) => {
  const clubMemberList = await instance.get<ClubMemberList>(
    `/pick/admin/club/${club_id}`
  );
  return clubMemberList.data;
};

export const postIssuanceOuting = async (request: IssuanceOuting) => {
  const issuanceOuting = await instance.post("/pick/admin/picnic", request);
  return issuanceOuting;
};

export const deleteAfterSchoolMember = async (
  request: AfterSchoolUserDelete
) => {
  const deleteAfterMember = await instance.delete("/pick/admin", {
    data: request,
  });
  return deleteAfterMember;
};

export type SelfStudyTeacherType = {
  past: SelfStudyTeacher | undefined;
  present: SelfStudyTeacher;
  future: SelfStudyTeacher | undefined;
};

export const getSelfStudyTeacherList = async (month: number) => {
  if (month < 1 || month > 12) return null;
  const response = await instance.get<SelfStudyTeacher>(
    `/pick/admin/director?month=${month}`
  );

  return response.data;
};

export const patchSelfStudyTeacher = async (request: SelfStudyTeacherPatch) => {
  const patchSelfStudyTeacher = await instance.patch(
    "/pick/admin/teacher",
    request
  );
  return patchSelfStudyTeacher;
};

export const classStudentStatePatch = async (
  request: ClassRoomStudentStatusPatch
) => {
  const classStudentState = await instance.patch("/pick/admin/class", {
    request,
  });
  return classStudentState;
};

export const clubKingPatch = async (club_id: string, student_id: string) => {
  const clubKing = await instance.patch("/pick/admin/head", {
    club_id,
    student_id,
  });
  return clubKing;
};

export const clubChangePatch = async (club_id: string, student_id: string) => {
  const clubChange = await instance.patch("/pick/admin/club", {
    club_id,
    student_id,
  });
  return clubChange;
};

export const floorRestrictionPatch = async () => {
  const floorRestriction = await instance.patch("/pick/admin");
  return floorRestriction;
};

export const getSchoolTeacherList = async () => {
  const schoolTeacherList = await instance.get<SchoolTeacherList>(
    "/pick/users/teachers"
  );
  return schoolTeacherList;
};

export const getLayerClassList = async (
  floor: number | string,
  type: string | undefined
) => {
  const layerClassList = await instance.get<{
    classroom_list: FloorClassRoomDto[];
  }>(`/pick/class-room/?floor=${floor}&type=${type}`);
  return layerClassList.data;
};

export const setDateType = async (request: { date: string; type: string }) => {
  const response = await instance.post(
    `/pick/admin/type?date=${request.date}&type=${request.type}`
  );
  return response;
};

export const patchDateType = async (req: { date: string; type: string }) => {
  const response = await instance.patch(
    `/pick/admin/type?date=${req.date}&type=${req.type}`
  );
  return response;
};

export const addSelfStudyTeacher = async (req: {
  teacher_id: string;
  floor: number;
  date: string;
}) => {
  await instance.post("/pick/admin/director", req);
};
