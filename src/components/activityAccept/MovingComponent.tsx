import styled from "@emotion/styled";
import { arrow } from "@/assets/ActivityAccept";
import Image from "next/image";

interface MovingProps {
  data: {
    student_number: number;
    student_name: string;
    before: string;
    after: string;
  };
}

const MovingComponent = ({ data }: MovingProps) => {
  const { student_number, student_name, before, after } = data;
  return (
    <Container>
      <User>
        <p>{student_number + " " + student_name}</p>
      </User>
      <Class>
        <ClassName>{before}</ClassName>
        <Image src={arrow} alt="->" />
        <ClassName>{after}</ClassName>
      </Class>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;
const User = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  width: 132px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Class = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  width: 234px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ClassName = styled.p`
  flex: 1;
  text-align: center;
`;

export default MovingComponent;
