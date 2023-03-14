export interface StudentStatusDto {
  student_id: string;
  type: string;
}

export interface GetAttendanceStatusRequestDto {
  classRoom: string;
  type: string;
}

export interface AttandanceStatusChangeRequestDto {
  period: number;
  user_id: string;
  status: string;
}

export interface IssuanceOuting {
  user_id_list: string[];
  reason: string;
  start_period: number;
  end_period: number;
}

export interface AfterSchoolUserAdd {
  user_id_list: string[];
}

export interface AfterSchoolUserDelete {
  after_school_id: string;
  student_id: string;
}

export interface MoveStudentRequest {
  grade: number;
  classNum: number;
  floor: number;
}

export interface SelfStudyTeacherPatch {
  teacher_id: string;
  floor: number;
  date: string;
}

interface ClassRoomStudentInfo {
  user_id: string;
  status: string;
}

export interface ClassRoomStudentStatusPatch {
  user_list: ClassRoomStudentInfo[];
}

export interface ClubkingPatch {
  club_id: string;
  student_id: string;
}

export interface ClubChange {
  club_id: string;
  student_id: string;
}

export interface AttendanceListRequest {
  classroom_id: string;
  date: string;
}
