import styled from "@emotion/styled";
import { Attendance, Outing, OutingList } from "@/assets/main";
import Image from "next/image";
import { Button } from "@semicolondsm/ui";
import ButtonComponent from "@/common/Button/ButtonComponent";

interface MainProps {
  todayTeacher: string;
  layer: number;
  teacher2: string;
  teacher3: string;
  teacher4: string;
  isDirector: boolean;
}

const Main = ({
  todayTeacher,
  layer,
  teacher2,
  teacher3,
  teacher4,
  isDirector,
}: MainProps) => {
  return (
    <>
      <Date>1월 24일 금요일</Date>
      <TitleContainer>
        <Title>{todayTeacher}선생님은</Title>
        <LayerText>{isDirector ? layer + "층" : ""}</LayerText>
        <Title>{isDirector ? "자습감독입니다." : "자습감독이 아닙니다."}</Title>
      </TitleContainer>
      <MainWrapper>
        <MainTitle>오늘의 자습감독</MainTitle>
        <MainContainer>
          <MainText>2층 {teacher2}선생님</MainText>
          <MainText>3층 {teacher3}선생님</MainText>
          <MainText>4층 {teacher4}선생님</MainText>
        </MainContainer>
      </MainWrapper>
    </>
  );
};

const contant = [
  {
    Text: "현재 외출 신청 학생은",
    Image: Outing,
    Button: "외출 수락하러 가기",
    onclick: () => {},
  },
  {
    Text: "현재 2층에서 이동한 학생은",
    Image: Attendance,
    Button: "출결상태 확인하기",
    onclick: () => {},
  },
  {
    Text: "현재 외출중인 학생은",
    Image: OutingList,
    Button: "외출자 목록보기",
    onclick: () => {},
  },
];

const Btns = () => {
  const BtnsStyles = {
    "margin-top": "58px",
    "font-weight": "500",
    "font-size": "20px",
    "line-height": "28px",
  };
  return (
    <BtnContainer>
      {contant.map((props) => (
        <BtnWrapper>
          <OutingBtn>
            <TextContainer>
              <MainText>
                {props.Text}
                <br />총
              </MainText>
              <MainLayer> 10명</MainLayer>
              <MainText>
                입니다.
                <br />
              </MainText>
            </TextContainer>
            <Image src={props.Image} alt="" />
            <ButtonComponent
              customStyle={BtnsStyles}
              fill="purple"
              size={["304px", "54px"]}
            >
              {props.Button}
            </ButtonComponent>
          </OutingBtn>
        </BtnWrapper>
      ))}
    </BtnContainer>
  );
};

const MainPage = () => {
  return (
    <>
      <Wrapper>
        <Main
          todayTeacher="장연순"
          layer={2}
          teacher2="장연순"
          teacher3="신요셉"
          teacher4="고진영"
          isDirector={true}
        />
        <Btns />
      </Wrapper>
    </>
  );
};

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 149px 0 150px;
  margin-top: 124px;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const Date = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #5c5961;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 40px;
  line-height: 60px;
`;

const LayerText = styled.div`
  font-weight: 500;
  font-size: 40px;
  line-height: 60px;
  color: #9650fa;
  margin-left: 7px;
  margin-right: 7px;
`;
const MainWrapper = styled.div`
  padding: 60px 0 60px 0;
`;
const MainTitle = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: #3f3c42;
`;
const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  justify-content: space-around;
  text-align: center;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  margin-top: 20px;
  padding: 27px 237px 27px 237px;
`;
const MainText = styled.span`
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OutingBtn = styled.div`
  align-items: center;
  text-align: center;
  width: 360px;
  height: 446px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 54px 28px 36px 28px;
`;
const AttendanceBtn = styled.div`
  align-items: center;
  text-align: center;
  width: 360px;
  height: 446px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 54px 28px 36px 28px;
`;
const OutingListBtn = styled.div`
  align-items: center;
  text-align: center;
  width: 360px;
  height: 446px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 54px 28px 36px 28px;
`;
const TextBtn = styled(Button)`
  background: #9650fa;
  height: 52px;
  border-radius: 12px;
  margin-top: 58px;
  > div {
    color: #f9f7fa;
    font-weight: 500;
    font-size: 20px;
  }
`;

const MainLayer = styled.span`
  font-weight: 400;
  font-size: 24px;
  color: #9650fa;
`;
const TextContainer = styled.div`
  padding-bottom: 36px;
`;
export default MainPage;
