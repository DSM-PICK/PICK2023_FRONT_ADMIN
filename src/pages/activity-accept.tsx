import styled from "@emotion/styled";
import LayerToggle from "../components/activityAccept/ToggleFloor";
import { useState } from "react";
import ButtonComponent from "@/components/common/button/ButtonComponent";
import { css } from "@emotion/react";
import OutingComponent from "../components/activityAccept/OutingComponent";
import MovingComponent from "../components/activityAccept/MovingComponent";
import DropDown from "@/components/common/dropDown";
import { ItemType } from "@/models/common";
import {
  gradeDropDownItem,
  classDropDownItem,
} from "@/components/activityAccept/DropDownItem";
import { todayDate } from "@/utils/todayDate";

interface headBarProps {
  title: string;
  children: JSX.Element;
}
const HeadBar = ({ title, children }: headBarProps) => {
  return (
    <HeaderContainer>
      <HeaderText>{title}</HeaderText>
      {children}
    </HeaderContainer>
  );
};

interface ActivityBtnProps {
  children: string;
  onClick?: () => void;
}

const ActivityBtn = ({ children, onClick }: ActivityBtnProps) => {
<<<<<<< HEAD
  const headerBarBtnStyle = {
    "font-size": "12px",
    "font-weight": "300",
    "line-height": "20px",
    padding: "0 2vh",
  };
=======
  const headerBarBtnStyle = css`
    font-size: 14px;;
    font-weight: 400;
    line-height: 20px;
    padding: 0 2vh;
  `
>>>>>>> main
  return (
    <ButtonComponent
      onClick={onClick}
      size={["", "32px"]}
      customStyle={headerBarBtnStyle}
      fill="purple"
    >
      {children}
    </ButtonComponent>
  );
};

const data = [
  {
    key: 1,
    num: 2302,
    name: "강용수",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    key: 2,
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    key: 3,
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    key: 4,
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
];
const even = data.filter((number) => number.key % 2 === 0);
const odd = data.filter((number) => number.key % 2 === 1);

const move_list = [
  {
    student_number: 2218,
    student_name: "정대현",
    before: "2 - 2",
    after: "세미나실 2-1",
  },
  {
    student_number: 2218,
    student_name: "정대현",
    before: "2 - 2",
    after: "세미나실 2-1",
  },
];

const ActivityAccept = () => {
  const [isLayerToggle, setIsLayerToggle] = useState<boolean>(true);
  const [gradeResult, setGradeResult] = useState<ItemType>({
    option: "grade",
    id: "title",
  });
  const [classResult, setClassResult] = useState<ItemType>({
    option: "class",
    id: "title",
  });

  const acceptBtnStyle = {
    "font-size": "13px",
    "font-weight": "300",
  };

  return (
    <Wrapper>
      <Header>
        <div>
          <Title>외출/이동 수락</Title>
          <SubTitle>{todayDate()}</SubTitle>
        </div>
        <div>
          <LayerToggle
            action={isLayerToggle}
            leftClick={() => {
              setIsLayerToggle(false);
            }}
            rightClick={() => {
              setIsLayerToggle(true);
            }}
          />
          <DropDown
            setResult={setGradeResult}
            dropDownItem={gradeDropDownItem}
            title="lyaer"
          />
          <DropDown
            setResult={setClassResult}
            dropDownItem={classDropDownItem}
            title="class"
          />
        </div>
      </Header>
      <Container>
        <ActivityWrapper width="480px">
          <HeadBar title="외출 신청 목록">
            <ActivityBtn>새로운 외출증 발급</ActivityBtn>
          </HeadBar>
          <OutingBox>
            <OutingList>
              {odd.map((data) => (
                <OutingComponent data={data} />
              ))}
            </OutingList>
            <OutingList>
              {even.map((data) => (
                <OutingComponent data={data} />
              ))}
            </OutingList>
          </OutingBox>
          <AcceptBtns>
            <ButtonComponent
              customStyle={acceptBtnStyle}
              size={[95, 40]}
              fill="ghost"
              onClick={() => {}}
            >
              거절하기
            </ButtonComponent>
            <ButtonComponent
              customStyle={acceptBtnStyle}
              size={[95, 40]}
              fill="purple"
              onClick={() => {}}
            >
              수락하기
            </ButtonComponent>
          </AcceptBtns>
        </ActivityWrapper>
        <ActivityWrapper width="340px">
          <HeadBar title="이동한 학생">
            <ActivityBtn>이동 제한</ActivityBtn>
          </HeadBar>
          <MovingBox>
            {move_list.map((data) => (
              <MovingComponent data={data} />
            ))}
          </MovingBox>
        </ActivityWrapper>
      </Container>
    </Wrapper>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  width: 900px;
  height: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    display: flex;
    align-items: end;
    gap: 16px;
  }
`;
const Title = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 700;
`;
const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
`;
const Container = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px;
`;
const ActivityWrapper = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  height: 100%;
  width: ${({ width }) => width};
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderText = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
`;
const OutingBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  overflow-y: scroll;
`;
const OutingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-x: scroll;
`;
const AcceptBtns = styled.div`
  display: flex;
  gap: 12px;
  justify-content: end;
`;
const MovingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default ActivityAccept;
