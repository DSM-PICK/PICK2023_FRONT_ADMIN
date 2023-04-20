import { ItemType } from "@/models/common";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DropDown from "../common/Dropdown";
import { attendanceDropDownItem } from "./constants";
import { attandanceStatusChange } from "@/utils/api/selfStudy";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-hot-toast";

interface StudentProps {
  studentNumber: string;
  studentName: string;
  attendanceList: string[];
  studentId: string;
  isFriday: boolean;
}

const Student = ({
  studentNumber,
  studentName,
  attendanceList,
  studentId,
  isFriday,
}: StudentProps) => {
  const [sixthAttendanceDropDownResult, setSixthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [seventhAttendanceDropDownResult, setSeventhAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [eighthAttendanceDropDownResult, setEighthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [ninethAttendanceDropDownResult, setNinethAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [tenthAttendanceDropDownResult, setTenthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });

  const weekdayArr = [
    setEighthAttendanceDropDownResult,
    setNinethAttendanceDropDownResult,
    setTenthAttendanceDropDownResult,
  ];

  const fridayArr = [
    setSixthAttendanceDropDownResult,
    setSeventhAttendanceDropDownResult,
    setEighthAttendanceDropDownResult,
    setNinethAttendanceDropDownResult,
    setTenthAttendanceDropDownResult,
  ];

  const dropDownArr = isFriday ? fridayArr : weekdayArr;

  const convertAttendanceType = (type: string) => {
    switch (type) {
      case "DISALLOWED":
        return "무단";
      case "LEAVE":
        return "조퇴";
      case "HOME":
        return "귀가";
      case "FIELD_TRIP":
        return "현체";
      case "PICNIC":
        return "외출";
      case "MOVEMENT":
        return "이동";
      case "ATTENDANCE":
        return "출석";
      case "EMPLOYMENT":
        return "취업";
    }
  };
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(attandanceStatusChange, {
    onError: handleError,
    onSettled: () => {
      queryClient.invalidateQueries("attendance");
    },
    onSuccess: () => {
      toast.success("상태가 변경되었습니다.", { duration: 1000 });
    },
  });
  function updateAttendance(
    period: number,
    status: string | number,
    studentId: string
  ) {
    if (status === "TITLE") return;
    mutate({
      period: period,
      user_id: studentId,
      status: status,
    });
  }

  useEffect(() => {
    updateAttendance(6, sixthAttendanceDropDownResult.id, studentId);
  }, [sixthAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance(7, seventhAttendanceDropDownResult.id, studentId);
  }, [seventhAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance(8, eighthAttendanceDropDownResult.id, studentId);
  }, [eighthAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance(9, ninethAttendanceDropDownResult.id, studentId);
  }, [ninethAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance(10, tenthAttendanceDropDownResult.id, studentId);
  }, [tenthAttendanceDropDownResult]);

  return (
    <StudentContainer isFriday={isFriday}>
      <StudentBox isFriday={isFriday}>
        {studentNumber} {studentName}
      </StudentBox>
      {dropDownArr.map((result, idx) => {
        const status = convertAttendanceType(attendanceList[idx]);
        return (
          <DropDown
            key={idx}
            title={status}
            dropDownItem={attendanceDropDownItem}
            setResult={result}
            isFriday={isFriday}
          />
        );
      })}
    </StudentContainer>
  );
};

const StudentContainer = styled.div<{ isFriday: boolean }>`
  display: grid;
  gap: 20px;
  grid-template-columns: ${({ isFriday }) =>
    isFriday ? "140px 1fr 1fr 1fr 1fr 1fr" : "200px 1fr 1fr 1fr"};
`;

const StudentBox = styled.div<{ isFriday: boolean }>`
  height: 48px;
  background: white;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Student;
