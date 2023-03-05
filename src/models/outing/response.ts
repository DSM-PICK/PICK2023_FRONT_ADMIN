export interface OutingApplyListType {
  student_id: string;
  student_number: number;
  student_name: string;
  start_time: string;
  end_time: string;
  reason: string;
}

export interface OutingApplyList {
  outing: OutingApplyListType[];
}

export interface OutingStudentListType {
  student_id: string;
  student_number: number;
  student_name: string;
  end_time: string;
}

export interface OutingStudentList {
  outing: OutingApplyListType[];
}
