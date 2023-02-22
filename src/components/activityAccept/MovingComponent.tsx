import styled from "@emotion/styled";
import { arrow } from "@/assets/ActivityAccept";
import Image from "next/image";

interface MovingProps {
  data: {
    num: number;
    name: string;
    from: string;
    to: string;
  };
}

const MovingComponent = ({ data }: MovingProps) => {
  const { num, name, from, to } = data;
  return (
    <Container>
      <User>
        <p>{num + " " + name}</p>
      </User>
      <Class>
        <ClassName>{from}</ClassName>
        <Image src={arrow} alt="->" />
        <ClassName>{to}</ClassName>
      </Class>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
const User = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  width: 132px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Class = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  width: 234px;
  height: 48px;
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
