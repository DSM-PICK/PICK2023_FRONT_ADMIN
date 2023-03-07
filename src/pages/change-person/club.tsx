import styled from "@emotion/styled";
import DropDown from "@/components/common/dropDown";
import { useState } from "react";
import { ItemType } from "../../models/common/index";
import Member from "@/components/club/member";
import ClubDropDown from "@/components/club/clubDropDown";

const ClubPerson = () => {
  const name = "세미나실 4-1";
  const [layerResult, setLayerResult] = useState<ItemType>({
    option: "layer",
    id: "Title",
  });
  const [classResult, setClassResult] = useState<ItemType>({
    option: "class",
    id: "Title",
  });

  const memberList = [
    {
      num: "1115",
      name: "이정호",
      isLeader: true,
    },
    {
      num: "1115",
      name: "이정호",
      isLeader: false,
    },
    {
      num: "1115",
      name: "이정호",
      isLeader: false,
    },
  ];

  return (
    <Wrapper>
      <Header>
        <div>
          {/*  */}
          <Title>{"정"}</Title>
          <SubTitle>{name}(장연순선생님 담당)</SubTitle>
        </div>
        <div>
          <ClubDropDown
            setLayerResult={setLayerResult}
            setClassResult={setClassResult}
          />
        </div>
      </Header>
      <Container>
        {memberList.map((list) => (
          <Member {...list} />
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 900px;
  height: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 616px;
    main {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
const Header = styled.div`
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    display: flex;
    align-items: end;
  }
  > div:nth-child(2) {
    gap: 10px;
  }
`;
const Title = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 700;
  margin-right: 16px;
`;
const SubTitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: 500;
  margin-bottom: 5px;
`;
const Container = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;
  padding: 30px 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(45px, auto));
  grid-gap: 16px;
`;

export default ClubPerson;
