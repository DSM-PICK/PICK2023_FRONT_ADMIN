import styled from "@emotion/styled";
import DropDown from "@/components/common/Dropdown";
import { grades, classes } from "@/constants/DropDownItem";
import { useState } from "react";
import { ItemType } from "@/models/common";
import PageContainer from "@/components/common/PageContainer";
import StudentContainer from "@/components/weekendMeal/StudentContainer";
import { useApiError } from "@/hooks/useApiError";
import { getWeekendMealStudentListExcel } from "@/utils/api/weekendMeal";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import {
  checkTeacher,
  getWeekendMealStudentList,
} from "@/utils/api/weekendMeal";
import fileSaver from "file-saver";

const WeekendMeal = () => {
  const [gradeNum, setGradeNum] = useState<ItemType>({
    option: "1학년",
    id: 1,
  });
  const [classNum, setClassNum] = useState<ItemType>({
    option: "1반",
    id: 1,
  });

  const { handleError } = useApiError();

  const { mutate: getExcel } = useMutation(getWeekendMealStudentListExcel, {
    onSuccess: (res) => {
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const month = new Date().getMonth();
      fileSaver.saveAs(blob, `${month}월 전교생 주말 급식 신청 여부`);
      toast.success("엑셀이 출력되었습니다.", { duration: 1000 });
    },
    onError: handleError,
  });

  const { data: studentList } = useQuery(
    ["", gradeNum, classNum],
    () =>
      getWeekendMealStudentList({
        gradeNum: gradeNum.id as number,
        classNum: classNum.id as number,
      }),
    {
      onError: handleError,
      cacheTime: 0,
    }
  );

  const [isCheck, setIsCheck] = useState<boolean>(studentList?.data.is_check);
  const { mutate: teacherCheck } = useMutation(
    "",
    () =>
      checkTeacher({
        gradeNum: gradeNum.id as number,
        classNum: classNum.id as number,
        isCheck: !isCheck,
      }),
    {
      onSuccess: () => {
        toast.success("주말 급식 신청 현황을 확인하였습니다.", {
          duration: 1000,
        });
        setIsCheck(!isCheck);
      },
      onError: () => {
        handleError;
      },
    }
  );

  const filter: JSX.Element = (
    <DropDownContainer>
      <DropDown
        title={gradeNum.option}
        dropDownItem={grades}
        setResult={setGradeNum}
      />
      <DropDown
        title={classNum.option}
        dropDownItem={classes}
        setResult={setClassNum}
      />
      <Btn onClick={() => teacherCheck()} isCheck={isCheck}>
        담임 확인하기
      </Btn>
      <ExcelBtn onClick={() => getExcel()}>엑셀 출력하기</ExcelBtn>
    </DropDownContainer>
  );

  return (
    <PageContainer title="주말 급식" filter={filter}>
      <Wrapper>
        <StudentContainer
          title="응답자"
          subTitle="응답자의 상태는 수정할 수 없습니다"
          students={studentList?.data.response_students}
        />
        <StudentContainer
          title="미응답자"
          subTitle="매달 5일 전까지 상태를 수정할 수 있습니다"
          students={studentList?.data.non_response_students}
        />
      </Wrapper>
    </PageContainer>
  );
};

const DropDownContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ExcelBtn = styled.button`
  padding: 0 10px;
  min-width: 147px;
  height: 48px;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.purple400};
  border: 1px solid ${({ theme }) => theme.colors.purple400};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const Btn = styled.button<{ isCheck: boolean }>`
  padding: 0 10px;
  min-width: 147px;
  height: 48px;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) =>
    props.isCheck ? props.theme.colors.purple400 : props.theme.colors.gray300};
  border: 1px solid
    ${(props) =>
      props.isCheck
        ? props.theme.colors.purple400
        : props.theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.purple400};
    border: 1px solid ${({ theme }) => theme.colors.purple400};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

export default WeekendMeal;
