import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

interface OutingProps {
  data: {
    num: number;
    name: string;
    time: string;
    reason: string;
  };
}

const OutingComponent = (props: OutingProps) => {
  const { num, name, time, reason } = props.data;
  const [isReason, setIsReason] = useState<boolean>(false);

  return (
    <Container
      onClick={() => {
        setIsReason(!isReason);
      }}
      isReason={isReason}
    >
      <NameText>
        {num} {name}
      </NameText>
      <TimeText>{time}</TimeText>
      <ReasonText isReason={isReason}>{reason}</ReasonText>
    </Container>
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
