import styled from "@emotion/styled";
import DropDown from "../common/Dropdown";
import Button from "../common/Button";
import { KoreanType } from "./changeType";
import { useState } from "react";
import { ItemType } from "@/models/common";

interface Props {
  date: {
    month: number;
    day: number;
  };
  setToggle: (state: boolean) => void;
  mutate: (req: { date: string; type: string }) => void;
  type?: string;
}

type StatusType = "SELF_STUDY" | "CLUB" | "AFTER_SCHOOL" | "";

const ChangeTypeModal = ({ date, setToggle, mutate, type }: Props) => {
  const requestDate: string = `${new Date().getFullYear()}-${date.month
    .toString()
    .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`;
  const isFriDay: boolean = new Date(requestDate).getDay() === 5;

  const Type = [
    {
      id: "AFTER_SCHOOL",
      option: KoreanType.AFTER_SCHOOL,
    },
    {
      id: "CLUB",
      option: KoreanType.CLUB,
    },
    {
      id: "SELF_STUDY",
      option: KoreanType.SELF_STUDY,
    },
  ];
  const [selectedType, setType] = useState<ItemType>({
    id: 0,
    option: type ? KoreanType[type as StatusType] : "",
  });

  const clickConfirmButton = () => {
    mutate({
      date: requestDate,
      type:
        (selectedType.id as string) === "CLUB"
          ? isFriDay
            ? "FRI_CLUB"
            : "TUE_CLUB"
          : (selectedType.id as string),
    });
    setToggle(false);
  };

  return (
    <Wrapper>
      <Box>
        <Title>
          {date.month}월 {date.day}일 유형 설정
        </Title>
        <StyledDropDown
          setResult={setType}
          title={selectedType.option}
          dropDownItem={Type}
        />
        <div id="buttons">
          <Button
            fill="default"
            size={["288px", "52px"]}
            disabled={false}
            onClick={() => {
              setToggle(false);
            }}
          >
            취소
          </Button>
          <Button
            fill={"purple"}
            size={["288px", "52px"]}
            disabled={!selectedType.id}
            onClick={() => clickConfirmButton()}
          >
            설정하기
          </Button>
        </div>
      </Box>
    </Wrapper>
  );
};

export default ChangeTypeModal;

const Wrapper = styled.div`
  cursor: default;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: rgba(33, 33, 33, 0.3);
`;

const Box = styled.div`
  width: 680px;
  height: 380px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 49px 45px 28px 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  position: relative;
  > #buttons {
    width: calc(100% - 90px);
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 28px;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.black};
`;

const StyledDropDown = styled(DropDown)`
  width: 100%;
  > button,
  div {
    width: 100%;
    text-align: start;
  }
`;
