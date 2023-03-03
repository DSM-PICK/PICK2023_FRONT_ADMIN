import styled from "@emotion/styled";
import ButtonComponent from "../common/button/ButtonComponent";
import { Colors } from "@semicolondsm/ui/dist/components/Button/types";
const AfterSchool = () => {
  const StudentAdd = {
    "margin-top": "122px",
    "font-weight": "400px",
    "font-size": "16px",
    "line-height": "24px",
    "margin-left": "725px",
   "color": "#DBD7E0",
  };


  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>방과후 자습</Title>
          <LayerText>2층 창조실</LayerText>
          <ButtonComponent
            fill="ghost"
            size={["147px;", "48px"]}
            customStyle={StudentAdd}
          >
            인원 추가하기
          </ButtonComponent>
        </TitleContainer>
        <ListContainer>
          <ListBox/>
        </ListContainer>
      </Wrapper>
    </>
  );
};

const ListBox = () => {
  const Delete={
    "margin-top":"12px",
    "margin-left":"268px",
    "font-weight": "500px",
    "font-size": "16px",
  }


  const List = [
    {
      학번: 2120,
      이름: "추혜연",
    },
    {
      학번: 2419,
      이름: "하혜령",
    },
    {
      학번: 2106,
      이름: "김의찬",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
    {
      학번: 2218,
      이름: "정대현",
    },
  ];

  const StudentDelete = {
    "margin-top": "12px",
    "font-weight": "500px",
    "font-size": "16px",
    "line-height": "24px",
    "margin-left": "138px",
    "color":"#FFFFFF"
  };
  
  return (
    <>
    {List.map((props) => (
          <BoxWrapper>
      <Student>{props.학번} {props.이름}</Student>
        <ButtonComponent customStyle={StudentDelete} fill="purple" size={["72px", "36px"]}>
          삭제
        </ButtonComponent>
      </BoxWrapper>
          ))}
      
    </>
  );
};
const Wrapper = styled.div`
  padding-left: 150px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 24px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

const LayerText = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
`;

const ListContainer = styled.div`
  width: 1220px;
  height: 780px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 44px 38px;
  box-sizing: border-box;
  margin-top: 20px;
  row-gap: 32px;
  column-gap: 28px;
  display: grid;
  grid-template-columns: repeat(3, 360px);
  
`;
const BoxWrapper = styled.div`
  width: 360px;
  height: 60px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;

  
`;
const Student = styled.div`
font-weight: 500;
font-size: 20px;
line-height: 28px;
margin-left: 24px;
margin-top: 16px;
`;

export default AfterSchool;
