import styled from "@emotion/styled";
import { arrow } from "@/assets/ActivityAccept";
import Image from "next/image";

interface MovingProps {
  student_number: string;
  student_name: string;
  before: string;
  after: string;
}

const MovingComponent = (data: MovingProps) => {
  const { student_number, student_name, before, after } = data;
  return (
    <Container>
      <User>
        <p>{student_number + " " + student_name}</p>
      </User>
      <Class>
        <p>{before}</p>
        <Image src={arrow} alt="->" />
        <p>{after}</p>
      </Class>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
  font-size: 15px;
`;

const User = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  height: 50px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Class = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  height: 50px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  > p {
    flex: 1;
    text-align: center;
  }
`;

export default MovingComponent;
