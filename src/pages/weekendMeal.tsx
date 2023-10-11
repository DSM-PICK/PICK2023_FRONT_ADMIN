import styled from "@emotion/styled";
import DropDown from "@/components/common/Dropdown";
import {
  grades,
  classes,
  yearDropDownItem,
  monthDropDownItem,
} from "@/constants/DropDownItem";
import { useEffect, useState } from "react";
import { ItemType } from "@/models/common";
import PageContainer from "@/components/common/PageContainer";
import StudentContainer from "@/components/weekendMeal/StudentContainer";
import { useApiError } from "@/hooks/useApiError";
import {
  getIsTeacherCheck,
  getWeekendMealStudentListExcel,
} from "@/utils/api/weekendMeal";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import {
  checkTeacher,
  getWeekendMealStudentList,
} from "@/utils/api/weekendMeal";
import fileSaver from "file-saver";
import CheckBox from "@/components/common/CheckBox";

const WeekendMeal = () => {
  const nowMonth: number = new Date().getMonth();

  const [year, setYear] = useState<ItemType>({
    option: "2023년",
    id: 2023,
  });
  const [month, setMonth] = useState<ItemType>({
    option: `${nowMonth + 2}월`,
    id: nowMonth + 2,
  });
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
      fileSaver.saveAs(blob, `11월 전교생 주말 급식 신청 여부`);
      toast.success("엑셀이 출력되었습니다.", { duration: 2000 });
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

  const [isTeacherCheck, setIsTeacherCheck] = useState<boolean>(false);

  const { data: isTeacherCheckData } = useQuery(
    [gradeNum, classNum],
    () =>
      getIsTeacherCheck({
        gradeNum: gradeNum.id as number,
        classNum: classNum.id as number,
      }),
    {
      onSuccess: () => {
        setIsTeacherCheck(isTeacherCheckData?.data.check);
      },
    }
  );

  useEffect(() => {
    setIsTeacherCheck(isTeacherCheckData?.data.check);
  }, [isTeacherCheckData]);

  const { mutate: teacherCheck } = useMutation(
    "",
    () =>
      checkTeacher({
        gradeNum: gradeNum.id as number,
        classNum: classNum.id as number,
        isCheck: !isTeacherCheck,
      }),
    {
      onSuccess: () => {
        if (!isTeacherCheck) {
          toast.success("주말 급식 신청을 마감하였습니다.", {
            duration: 2000,
          });
        } else {
          toast.success("주말 급식 신청을 마감 취소하였습니다.", {
            duration: 2000,
          });
        }
        setIsTeacherCheck(!isTeacherCheck);
      },
      onError: () => {
        handleError;
      },
    }
  );

  const filter: JSX.Element = (
    <DropDownContainer>
      {/* 년 */}
      <DropDown
        title={year.option}
        dropDownItem={yearDropDownItem}
        setResult={setYear}
      />
      {/* 월 */}
      <DropDown
        title={month.option}
        dropDownItem={monthDropDownItem}
        setResult={setMonth}
      />
      {/* 학년 */}
      <DropDown
        title={gradeNum.option}
        dropDownItem={grades}
        setResult={setGradeNum}
      />
      {/* 반 */}
      <DropDown
        title={classNum.option}
        dropDownItem={classes}
        setResult={setClassNum}
      />
      <Btn onClick={() => teacherCheck()}>
        제출 마감
        <CheckBox isChecked={isTeacherCheck} />
      </Btn>
      <Btn onClick={() => getExcel()}>엑셀 출력하기</Btn>
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
          subTitle="미응답자의 상태를 수정할 수 있습니다"
          students={studentList?.data.non_response_students}
        />
      </Wrapper>
    </PageContainer>
  );
};

const DropDownContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Btn = styled.button`
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

export default WeekendMeal;
