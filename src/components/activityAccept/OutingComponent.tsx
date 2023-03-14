import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

interface OutingProps {
  student_id: string;
  student_number: string;
  student_name: string;
  start_time: string;
  end_time: string;
  reason: string;
}

const OutingComponent = (props: OutingProps) => {
  const {
    reason,
    end_time,
    start_time,
    student_id,
    student_name,
    student_number,
  } = props;
  const [isReason, setIsReason] = useState<boolean>(false);

  let start = start_time.slice(0, 5);
  let end = end_time.slice(0, 5);

  return (
    <>
      <Container
        onClick={() => {
          setIsReason(!isReason);
        }}
        isReason={isReason}
      >
        <NameText>
          {student_number} {student_name}
        </NameText>
        <TimeText>
          {start}~{end}
        </TimeText>
        <ReasonText isReason={isReason}>{reason}</ReasonText>
      </Container>
    </>
  );
};
const Container = styled.div<{ isReason: boolean }>`
  width: 215px;
  min-height: 42px;
  ${({ theme, isReason }) =>
    css`
      background-color: ${isReason
        ? theme.colors.purple50
        : theme.colors.gray50};
      height: ${isReason ? "auto" : "40px"};
    `}
  border-radius: 12px;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, minmax(20px, auto));
  row-gap: 8px;
`;
const NameText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
`;
const TimeText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray600};
  text-align: end;
`;
const ReasonText = styled.p<{ isReason: boolean }>`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.black};
  display: ${({ isReason }) => (isReason ? "block" : "none")};
  grid-column: 1 / 3;
  grid-row: auto;
`;

export default OutingComponent;
