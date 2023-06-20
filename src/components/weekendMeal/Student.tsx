import { ItemType, weekendMealStudentType } from "@/models/common";
import DropDown from "../common/Dropdown";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { apply } from "@/constants/DropDownItem";
import { useMutation } from "react-query";
import { changeStudentWeekendMealStatus } from "@/utils/api/weekendMeal";
import { toast } from "react-hot-toast";
import { useApiError } from "@/hooks/useApiError";

const Student = ({ student }: { student: weekendMealStudentType }) => {
  const [isApply, setIsApply] = useState<ItemType>({
    option: "미응답",
    id: "",
  });

  const { handleError } = useApiError();
  const { mutate: changeStudentStatus } = useMutation(
    "changeStudentStatus",
    () =>
      changeStudentWeekendMealStatus({
        studentId: student.id,
        status: isApply.id as string,
      }),
    {
      onSuccess: () => {
        toast.success(
          `${student.name}학생이 ${isApply.option}으로 변경되었습니다. `,
          {
            duration: 2000,
          }
        );
      },
      onError: handleError,
    }
  );

  useEffect(() => {
    if (isApply.option !== "미응답") {
      changeStudentStatus();
    }
  }, [isApply]);

  return (
    <Container key={student.number}>
      <span>
        {student.number} {student.name}
      </span>
      {student.status === "NON_RESPONSE" ? (
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
