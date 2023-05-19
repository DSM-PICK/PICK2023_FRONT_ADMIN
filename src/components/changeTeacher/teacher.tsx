import { media } from "@/utils/functions/media";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import ChangeTeacherModal from "./modal";

interface Props {
  name: string;
  date: {
    month: number;
    day: number;
  };
  floor: number;
  teachers: string[];
  refetch: () => void;
  disable?: boolean;
}

const TeacherBlock = ({
  name,
  date,
  floor,
  teachers,
  refetch,
  disable = false,
}: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      {toggle && (
        <ChangeTeacherModal
          date={date}
          floor={floor}
          setToggle={setToggle}
          teacher={name}
          refetch={refetch}
        />
      )}
      <Wrapper disable={disable} onClick={() => setToggle(true)}>
        <Bar />
        <p>{name}</p>
      </Wrapper>
    </>
  );
};

export default TeacherBlock;

const Wrapper = styled.div<{ disable: boolean }>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  flex-shrink: 1;
  position: relative;
  width: calc(100% - 26px);
  height: 30%;
  font-weight: 400;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.gray800};
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 4px rgba(33, 33, 33, 0.1);
  border-radius: 4px;
  opacity: ${(props) => props.disable && 0.4};
  font-size: 12px;
  ${media(1700)} {
    font-size: 14px;
  }
  ${media(2000)} {
    font-size: 17px;
  }
  > p {
    margin-left: 15px;
    ::after {
      content: none;
    }
    ${media(1500)} {
      ::after {
        content: " 선생님";
      }
    }
  }
`;

const Bar = styled.div`
  position: absolute;
  top: 5px;
  left: 8px;
  height: calc(100% - 10px);
  width: 1.5%;
  ${media(1700)} {
    font-size: 14px;
  }
  ${media(2000)} {
    font-size: 17px;
  }
  background-color: ${({ theme }) => theme.colors.purple500};
  border-radius: 50px;
`;

const Input = styled.input``;
