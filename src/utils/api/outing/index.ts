import instance from "@/utils/axios";
import {
  OutingApplyList,
  OutingStudentList,
} from "../../../models/outing/response";
import { GetOutingApplyListRequestType } from "@/models/outing/request";

export const getOutingApplyList = async (
  request: GetOutingApplyListRequestType
) => {
  const outingRequestList = await instance.get<OutingApplyList>(
    `/teachers/?grade=${request.grade}&classNum=${request.classNum}&floor=&type=${request.type}`
  );
  return outingRequestList.data;
};

export const getOutingStudentList = async () => {
  const outingStudentList = await instance.get<OutingStudentList>(
    `/applications`
  );
  return outingStudentList;
};

export const patchOutingStudentState = async (
  student_id: string,
  end_period: number
) => {
  const outingStudentState = await instance.patch("/teachers", {
    student_id,
    end_period,
  });
  return outingStudentState;
};

export const patchOutingRejectAccept = async (
  type: string,
  user_id_list: string[]
) => {
  const outingRejectAccept = await instance.patch("/teachers/status", {
    type,
    user_id_list,
  });
  return outingRejectAccept;
};
