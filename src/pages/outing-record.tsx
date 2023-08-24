import DropDown from "@/components/common/Dropdown";
import PageContainer from "@/components/common/PageContainer";
import Student from "@/components/outingRecord/Student";
import { classes, grades, monthDropDownItem } from "@/constants/DropDownItem";
import { ItemType } from "@/models/common";
import { getMyClass } from "@/utils/api/common";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const OutingRecord = () => {
  const { data: myClassData } = useQuery("myClass", getMyClass);
  const month = new Date().getMonth();

  const [gradeResult, setGradeResult] = useState<ItemType>(grades[0]);
  const [classResult, setClassResult] = useState<ItemType>(classes[0]);
  const [monthResult, setMonthResult] = useState<ItemType>(
    monthDropDownItem[month - 2]
  );

  useEffect(() => {
    if (myClassData) {
      setGradeResult({
        option: `${myClassData?.grade}학년`,
        id: myClassData?.grade as number,
      });
      setClassResult({
        option: `${myClassData?.class_num}반`,
        id: myClassData?.class_num as number,
      });
    }
  }, [myClassData]);

  const filter = (
    <>
    <ExelBtn>엑셀 출력하기</ExelBtn>
    <DropDown
      title={gradeResult?.option}
      dropDownItem={grades}
      setResult={setGradeResult}
    />
    <DropDown
      title={classResult?.option}
      dropDownItem={classes}
      setResult={setClassResult}
    />
    <DropDown
      title={monthResult?.option}
      dropDownItem={monthDropDownItem}
      setResult={setMonthResult}
    />
</>
)

  return (
    <PageContainer title="외출자 기록" filter={filter}>
      <Wrapper>
        <Student
          studentNumber={2309}
          studentName="안윤지"
          date="07.10"
          startTime="16:30"
          endTime="20:30"
          reason="머리가 아파서 병원 가고 싶습니다"
        />
        <Student
          studentNumber={2309}
          studentName="안윤지"
          date="07.10"
          startTime="16:30"
          endTime="20:30"
          reason="머리가 아파서 병원 가고 싶습니다"
        />
        <Student
          studentNumber={2309}
          studentName="안윤지"
          date="07.10"
          startTime="16:30"
          endTime="20:30"
          reason="머리가 아파서 병원 가고 싶습니다"
        />
        <Student
          studentNumber={2309}
          studentName="안윤지"
          date="07.10"
          startTime="16:30"
          endTime="20:30"
          reason="머리가 아파서 병원 가고 싶습니다"
        />
      </Wrapper>
    </PageContainer>
  );
};

const ExelBtn = styled.button`
  width: 147px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.purple400};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.purple400};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
`;

export default OutingRecord;
