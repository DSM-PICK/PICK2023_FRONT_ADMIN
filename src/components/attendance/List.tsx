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
  const initialAttendanceDropDownResult = {
    option: "기본값",
    id: "DEFAULT",
  };

  const [sixthAttendanceDropDownResult, setSixthAttendanceDropDownResult] =
    useState<ItemType>(initialAttendanceDropDownResult);
  const [seventhAttendanceDropDownResult, setSeventhAttendanceDropDownResult] =
    useState<ItemType>(initialAttendanceDropDownResult);
  const [eighthAttendanceDropDownResult, setEighthAttendanceDropDownResult] =
    useState<ItemType>(initialAttendanceDropDownResult);
  const [ninethAttendanceDropDownResult, setNinethAttendanceDropDownResult] =
    useState<ItemType>(initialAttendanceDropDownResult);
  const [tenthAttendanceDropDownResult, setTenthAttendanceDropDownResult] =
    useState<ItemType>(initialAttendanceDropDownResult);

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
      case "AWAIT":
        return "출석";
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

  function updateAttendance({
    period,
    status,
    studentId,
  }: {
    period: number;
    status: string | number;
    studentId: string;
  }) {
    if (status === "DEFAULT") return;
    mutate({
      period,
      user_id: studentId,
      status,
    });
  }

  useEffect(() => {
    updateAttendance({
      period: 6,
      status: sixthAttendanceDropDownResult.id,
      studentId,
    });
  }, [sixthAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance({
      period: 7,
      status: seventhAttendanceDropDownResult.id,
      studentId,
    });
  }, [seventhAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance({
      period: 8,
      status: eighthAttendanceDropDownResult.id,
      studentId,
    });
  }, [eighthAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance({
      period: 9,
      status: ninethAttendanceDropDownResult.id,
      studentId,
    });
  }, [ninethAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance({
      period: 10,
      status: tenthAttendanceDropDownResult.id,
      studentId,
    });
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
