import styled from "@emotion/styled";
import { weekendMealStudentType } from "@/models/common";
import Student from "./Student";

interface Props {
  title: string;
  subTitle: string;
  students?: weekendMealStudentType[];
}

const StudentContainer = ({ title, subTitle, students }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      {students ? (
        students?.map((student, idx) => <Student key={idx} student={student} />)
      ) : (
        <span>{title} 학생이 없습니다.</span>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 72vh;
  overflow-y: scroll;
  padding-bottom: 20px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 700;
  font-size: 25px;
  line-height: 40px;
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

export default StudentContainer;
