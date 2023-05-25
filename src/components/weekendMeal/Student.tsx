import { ItemType, weekendMealStudentType } from "@/models/common";
import DropDown from "../common/Dropdown";
import { useState } from "react";
import styled from "@emotion/styled";
import { apply } from "@/constants/DropDownItem";

const Student = ({ student }: { student: weekendMealStudentType }) => {
  const [isApply, setIsApply] = useState<ItemType>({
    option: "미응답",
    id: "",
  });

  return (
    <Container key={student.number}>
      <span>
        {student.number} {student.name}
      </span>
      {student.status === "NORESPONSE" ? (
        <DropDown title="미응답" dropDownItem={apply} setResult={setIsApply} />
      ) : (
        <WhetherToApply status={student.status}>
          {student.status === "APPLY" ? "신청" : "미신청"}
        </WhetherToApply>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > span {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const WhetherToApply = styled.div<{
  status: string;
}>`
  width: 120px;
  height: 40px;
  border-radius: 12px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.purple400};
  background-color: ${(props) =>
    props.status === "APPLY"
      ? props.theme.colors.purple400
      : props.theme.colors.white};
  color: ${(props) =>
    props.status === "APPLY"
      ? props.theme.colors.white
      : props.theme.colors.purple400};
`;

export default Student;