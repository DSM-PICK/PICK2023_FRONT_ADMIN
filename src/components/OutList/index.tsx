import Outing from "./outing";
import styled from "@emotion/styled";

const OutList = () => {
  const List = [
    {
      학번: 2120,
      이름: "추혜연",
      시간: "17:30",
    },
    {
      학번: 2419,
      이름: "하혜령",
      시간: "17:30",
    },
    {
      학번: 2106,
      이름: "김의찬",
      시간: "18:00",
    },
    {
      학번: 2218,
      이름: "정대현",
      시간: "18:00",
    },
  ];
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  return (
    <Container>
      <Heading>
        <Title>외출자 목록</Title>
        <DateText>{year + "-" + month + "-" + day}</DateText>
      </Heading>
      <ListBox>
        {List.map((list) => {
          return <Outing 외출자={list} />;
        })}
      </ListBox>
    </Container>
  );
};

const Container = styled.div`
  width: max-content;
  margin: 0 auto;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Heading = styled.div`
  display: flex;
  align-items: end;
  gap: 24px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 700;
`;

const DateText = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
`;

const ListBox = styled.div`
  max-width: 1220px;
  min-height: 65vh;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 50px 38px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 360px);
  grid-template-rows: repeat(auto-fill, 60px);
  column-gap: 32px;
  row-gap: 28px;
  @media screen and (max-width: 1143px) {
    width: 828px;
    grid-template-columns: repeat(2, 360px);
  }
  @media screen and (max-width: 751px) {
    width: 436px;
    grid-template-columns: repeat(1, 360px);
  }
`;

const Test = styled.div`
  background-color: #ff0000;
  border: 1px solid #000000;
  width: 360px;
  height: 60px;
  grid-column: auto;
`;
//<Outing 외출자={List[0]} />

export default OutList;
