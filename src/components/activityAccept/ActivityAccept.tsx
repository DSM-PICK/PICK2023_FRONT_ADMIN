import styled from "@emotion/styled";
import LayerToggle from "./ToggleFloor";
import { LayerToggleAtom } from "@/utils/atom";
import { useRecoilState } from "recoil";
import ButtonComponent from "@/common/Button/ButtonComponent";
import { css } from "@emotion/react";
import OutingComponent from "./OutingComponent";

interface headBarProps {
  title: string;
  children: JSX.Element;
}
const HeadBar = ({ title, children }: headBarProps) => {
  const Container = styled.div`
    width: 100%;
    height: 6vh;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.gray50};
    padding: 0 2vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  return (
    <Container>
      <Text color="#1f1e21" size="20px" weight="500" height="28px">
        {title}
      </Text>
      {children}
    </Container>
  );
};

interface ActivityBtnProps {
  children: string;
  onClick?: () => void;
}

const ActivityBtn = ({ children, onClick }: ActivityBtnProps) => {
  const headerBarBtnStyle = {
    "font-size": "14px",
    "font-weight": "400",
    "line-height": "20px",
    padding: "0 2vh",
  };
  return (
    <ButtonComponent
      onClick={onClick}
      size={["", "4vh"]}
      customStyle={headerBarBtnStyle}
      fill="purple"
    >
      {children}
    </ButtonComponent>
  );
};

const data = [
  {
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
  {
    num: 2120,
    name: "추혜연",
    time: "16:30~17:30",
    reason:
      "아무래도 저 코로나 같아요 ㅜㅜ 빨리 검사하고 오겠습니다 φ(゜▽゜*)♪",
  },
];

const ActivityAccept = () => {
  const today = new Date();
  const YYYY = today.getFullYear();
  const MM = ("0" + (today.getMonth() + 1)).slice(-2);
  const DD = ("0" + today.getDate()).slice(-2);

  return (
    <W>
      <Sidebar />
      <Wrapper>
        <Header>
          <Title>
            <MainTitle>외출/이동 수락</MainTitle>
            <SubTitle>
              {YYYY}-{MM}-{DD}
            </SubTitle>
          </Title>
          <Filter>
            <LayerToggle />
          </Filter>
        </Header>
        <Container>
          <ActivityWrapper width={"55%"}>
            <HeadBar title="외출 신청 목록">
              <ActivityBtn>새로운 외출증 발급</ActivityBtn>
            </HeadBar>
            <OutingGrid>
              {data.map((list) => (
                <OutingComponent data={list} />
              ))}
            </OutingGrid>
            <AcceptBtns>
              <ButtonComponent size={[131, 48]} fill="ghost" onClick={() => {}}>
                거절하기
              </ButtonComponent>
              <ButtonComponent
                size={[131, 48]}
                fill="purple"
                onClick={() => {}}
              >
                수락하기
              </ButtonComponent>
            </AcceptBtns>
          </ActivityWrapper>
          <ActivityWrapper width={"35%"}>
            <HeadBar title="이동한 학생">
              <ActivityBtn>이동 제한</ActivityBtn>
            </HeadBar>
          </ActivityWrapper>
        </Container>
      </Wrapper>
    </W>
  );
};

const W = styled.div`
  display: flex;
`;
const Sidebar = styled.div`
  width: 21vw;
  height: 100vh;
  background-color: #f5f5f5;
`;
const Wrapper = styled.div`
  height: 80vh;
  width: 65vw;
  margin: auto auto;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.div`
  display: flex;
  align-items: end;
  gap: 24px;
`;
const MainTitle = styled.p`
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  color: ${({ theme }) => theme.colors.gray900};
`;
const SubTitle = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.gray600};
`;
const Filter = styled.div`
  display: flex;
  gap: 24px;
`;
const Container = styled.main`
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
`;
const ActivityWrapper = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  height: 90%;
  width: ${({ width }) => width};
  padding: 2vh 3vh;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;
const Text = styled.p<{
  color: string;
  size: string;
  weight: string;
  height: string;
}>`
  ${({ color, size, weight, height }) =>
    css`
      font-size: ${size};
      font-weight: ${weight};
      line-height: ${height};
      color: ${color};
    `}
`;
const OutingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(48px, auto));
  row-gap: 16px;
  flex: 1;
`;
const AcceptBtns = styled.div`
  display: flex;
  gap: 12px;
  justify-content: end;
`;

export default ActivityAccept;