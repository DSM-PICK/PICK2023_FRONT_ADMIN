import instance from "@/utils/axios";

type PatchClassPersonStatusBody = {
  user_id: string;
  status: string;
}[];

export const patchClassPersonStatus = async (
  user_list: PatchClassPersonStatusBody
) => {
  const response = await instance.patch(`/pick/admin/class`, { user_list });
  return response;
};

interface ClassPersonStatusType {
  teacher_name: string;
  student_list: {
    student_id: string;
    student_number: number;
    student_name: string;
    status: string;
  }[];
}

export const getClassPersonStatus = async (grade: number, classNum: number) => {
  const response = await instance.get<ClassPersonStatusType>(
    `/pick/admin/class/students?grade=${grade}&classNum=${classNum}`
  );
  return response.data;
};

interface addAfterSchoolStudentRequstType {
  after_school_id: string;
  user_id_list: string[];
}

export const addAfterSchoolStudent = async (
  request: addAfterSchoolStudentRequstType
) => {
  await instance.post(`pick/admin/${request.after_school_id}`, {
    user_id_list: request.user_id_list,
  });
};
