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
  ClubkingPatch,
  ClubChange,
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

export const getMainpageStudnetCount = async () => {
  const getManipageCount = await instance.get<MainPageStudentNumber>(
    `/admin/students/count`
  );
  return getManipageCount;
};

export const getMoveStudentList = async (request: MoveStudentRequest) => {
  const moveStudentList = await instance.get<MoveSudentList>(
    `/admin/movement?grade=${request.grade}&classNum=${request.classNum}&floor=${request.floor}&date=${request.date}`
  );
  return moveStudentList;
};

export const getAttendanceCheckList = async (
  request: AttendanceListRequest
) => {
  const attendanceCheckList = await instance.get<AttendanceCheckStudentList>(
    `/admin/attendance/${request.classroom_id}?date=${request.date}`
  );
  return attendanceCheckList;
};

export const getAfterSchoolMemberList = async (after_school_id: string) => {
  const afterSchoolMemberList = await instance.get<AfterSchoolUserList>(
    `/admin/afterSchool/${after_school_id}`
  );
  return afterSchoolMemberList;
};

export const getClubMemberList = async (club_id: string) => {
  const clubMemberList = await instance.get<ClubMemberList>(
    `/admin/club/student?club_id=${club_id}`
  );
  return clubMemberList;
};

export const postIssuanceOuting = async (request: IssuanceOuting) => {
  const issuanceOuting = await instance.post("/admin/picnic", { request });
  return issuanceOuting;
};

export const deleteAfterSchoolMember = async (
  request: AfterSchoolUserDelete
) => {
  const deleteAfterMember = await instance.delete("/admin", { data: request });
  return deleteAfterMember;
};

export const patchSelfStudyTeacher = async (request: SelfStudyTeacherPatch) => {
  const patchSelfStudyTeacher = await instance.patch("/admin/teacher", {
    request,
  });
  return patchSelfStudyTeacher;
};

export const classStudentStatePatch = async (
  request: ClassRoomStudentStatusPatch
) => {
  const classStudentState = await instance.patch("/admin/class", { request });
  return classStudentState;
};

export const clubKingPatch = async (request: ClubkingPatch) => {
  const clubKing = await instance.patch("/admin/head", { request });
  return clubKing;
};

export const clubChangePatch = async (request: ClubChange) => {
  const clubChange = await instance.patch("/admin/club", { request });
  return clubChange;
};

export const floorRestrictionPatch = async () => {
  const floorRestriction = await instance.patch("/admin");
  return floorRestriction;
};

export const getSchoolTeacherList = async () => {
  const schoolTeacherList = await instance.get<SchoolTeacherList>(
    "/users/teachers"
  );
  return schoolTeacherList;
};
