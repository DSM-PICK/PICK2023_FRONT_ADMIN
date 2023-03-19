import styled from "@emotion/styled";

interface Props {
  className: string;
  isFriday: boolean;
}

const Header = ({ className, isFriday }: Props) => {
  const fridayPeriod: string[] = ["6교시", "7교시", "8교시", "9교시", "10교시"];
  const weekdayPeriod: string[] = ["8교시", "9교시", "10교시"];
  const period: string[] = isFriday ? fridayPeriod : weekdayPeriod;

  return (
    <StudentListHeaderContainer isFriday={isFriday}>
      <ClassName>{className || "미선택"}</ClassName>
      {period.map((period, idx) => (
        <PeriodBox key={idx}>{period}</PeriodBox>
      ))}
    </StudentListHeaderContainer>
  );
};

const StudentListHeaderContainer = styled.div<{ isFriday: boolean }>`
  display: grid;
  grid-template-columns: ${({ isFriday }) =>
    isFriday ? "140px 1fr 1fr 1fr 1fr 1fr" : "200px 1fr 1fr 1fr"};
  gap: 20px;
  margin-bottom: 20px;
`;

const ClassName = styled.h2`
  font-weight: 500;
  font-size: 22px;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
`;

const PeriodBox = styled.span`
  height: 48px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;
