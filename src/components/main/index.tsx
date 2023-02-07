import styled from "@emotion/styled";
import { Attendance, Outing, OutingList } from "@/assets/main";
import Image from "next/image";
import { Button } from "@semicolondsm/ui";

const Main = () => {
  return (
    <Wrapper>
      <Date>1월 24일 금요일</Date>
      <TitleContainer>
        <Title>장연순선생님은</Title>
        <LayerText>2층</LayerText>
        <Title>자습감독입니다.</Title>
      </TitleContainer>
      <MainWrapper>
        <MainTitle>오늘의 자습감독</MainTitle>
        <MainContainer>
          <MainText>2층 장연순선생님</MainText>
          <MainText>3층 신요셉선생님</MainText>
          <MainText>4층 고진영선생님</MainText>
        </MainContainer>
      </MainWrapper>
      <BtnWrapper>
        <OutingBtn>
          <TextContainer>
          <MainText>현재 외출 신청 학생은<br/>총 </MainText>
            <MainLayer>10명</MainLayer>
            <MainText>입니다.<br/></MainText>    
          </TextContainer>
         <Image src={Attendance} alt="" />
          <TextBtn fullWidth>외출 수락하러 가기</TextBtn>
        </OutingBtn>
        <AttendanceBtn>
        <TextContainer>
          <MainText>현재 2층에서 이동한<br/>학생 수는</MainText>
            <MainLayer>24명</MainLayer>
            <MainText>입니다.<br/></MainText>  
            </TextContainer>
          <Image src={Outing} alt="" />
          <TextBtn fullWidth>출결 상태 확인하기</TextBtn>
        </AttendanceBtn>
        <OutingListBtn>
        <TextContainer>
          <MainText>현재 외출 중인 학생은<br/>총</MainText>
            <MainLayer>4명</MainLayer>
            <MainText>입니다.<br/></MainText> 
            </TextContainer> 
          <Image src={OutingList} alt="" />
          <TextBtn fullWidth>외출자 목록보기</TextBtn>
        </OutingListBtn>
      </BtnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 149px 0 551px;
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
color: #9650FA;
`
const TextContainer=styled.div`
  padding-bottom: 36px;
`
export default Main;
