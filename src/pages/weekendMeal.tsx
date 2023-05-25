import styled from "@emotion/styled";
import DropDown from "@/components/common/Dropdown";
import { grades, classes } from "@/constants/DropDownItem";
import { useState } from "react";
import { ItemType, weekendMealStudentType } from "@/models/common";
import PageContainer from "@/components/common/PageContainer";
import StudentContainer from "@/components/weekendMeal/StudentContainer";

const WeekendMeal = () => {
  const [gradeNum, setGradeNum] = useState<ItemType>({
    option: "1학년",
    id: 1,
  });
  const [classNum, setClassNum] = useState<ItemType>({
    option: "1반",
    id: 1,
  });

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
      <ExcelBtn>엑셀 출력하기</ExcelBtn>
    </DropDownContainer>
  );

  const resStudent: weekendMealStudentType[] = [
    //응답자
    { userId: "sdfdf", number: 2106, name: "김의찬", status: "NOTAPPLY" },
    { userId: "sdfdf", number: 2109, name: "김태원", status: "APPLY" },
    { userId: "sdfdf", number: 2110, name: "문정민", status: "NOTAPPLY" },
  ];

  const noResStudent: weekendMealStudentType[] = [
    //미응답자
    { userId: "sdfdf", number: 2116, name: "이상운", status: "NORESPONSE" },
    { userId: "sdfdf", number: 2117, name: "이준서", status: "NORESPONSE" },
    { userId: "sdfdf", number: 2118, name: "임세현", status: "NORESPONSE" },
  ];

  return (
    <PageContainer title="주말 급식" filter={filter}>
      <Wrapper>
        <StudentContainer
          title="응답자"
          subTitle="응답자의 상태는 수정할 수 없습니다"
          students={resStudent}
        />
        <StudentContainer
          title="미응답자"
          subTitle="매달 5일 전까지 상태를 수정할 수 있습니다"
          students={noResStudent}
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
  width: 147px;
  height: 48px;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.purple400};
  border: 1px solid ${({ theme }) => theme.colors.purple400};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

export default WeekendMeal;
