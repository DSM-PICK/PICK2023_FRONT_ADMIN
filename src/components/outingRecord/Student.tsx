import styled from "@emotion/styled";

interface StudentProps {
  studentNumber: number;
  studentName: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

const Student = ({
  studentNumber,
  studentName,
  date,
  startTime,
  endTime,
  reason,
}: StudentProps) => {
  return (
    <Container>
      <Title>
        <StudentName>
          {studentNumber} {studentName}
        </StudentName>
        <Date>
          {date} {startTime}~{endTime}
        </Date>
      </Title>
      <Reason>{reason}</Reason>
    </Container>
  );
};

const Container = styled.div`
  width: 310px;
  height: 100px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StudentName = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 20px;
  font-weight: 500;
  line-height: 1.75rem;
`;

const Date = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Reason = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray800};
`;

export default Student;
