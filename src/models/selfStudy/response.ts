export interface TodaySelfStudyTeacher {
  date: string;
  name: string;
  floor: number[];
}

export interface TodaySelfStudyTeacherDto {
  second_floor: string;
  third_floor: string;
  fourth_floor: string;
}

export interface ChargeClassDto {
  id: string;
  name: string;
  description: string;
}

export interface GetClassList {
  floor: string;
  responsible_classroom_list: ChargeClassDto[];
}

export interface AttendanceStatusListDto {
  student_id: string;
  student_number: string;
  student_name: string;
  type: string;
  classroom_name: string | null;
}

export interface AttendanceStatudList {
  students: AttendanceStatusListDto[];
}

export interface SelfStudyTeacherDto {
  type: string;
  date: string;
  teacher: string[];
}

export interface SelfStudyTeacher {
  self_study_list: SelfStudyTeacherDto[];
}

export interface MainPageStudentNumber {
  picnic: number;
  application: number;
  classroom_movement: number;
}

export interface MoveStudentDto {
  student_number: string;
  student_name: string;
  before: string;
  after: string;
}

export interface FloorClassRoomDto {
  id: string;
  name: string;
  description: string;
}

export interface FloorClassRoomList {
  classroom_list: FloorClassRoomDto[];
}

export interface AfterSchoolUserDto {
  student_id: string;
  student_number: string;
  student_name: string;
}

export interface AfterSchoolUserList {
  after_school_name: string;
  after_school_user_list: AfterSchoolUserDto[];
}

export interface ClubMemberDto {
  student_id: string;
  student_number: string;
  student_name: string;
}

export interface ClubMemberList {
  teacher_name: string;
  classroom_name: string;
  club_name: string;
  club_student_list: ClubMemberDto[];
}
