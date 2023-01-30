import styled from "@emotion/styled";

const Navigation = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <LOGO />
        <h1>OOO 선생님</h1>
      </TitleContainer>
      <ItemContainer>
        <ItemWrapper>
          <Img />
          <ItemName>외출/이동 수락</ItemName>
        </ItemWrapper>
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;
  min-height: 100%;
  max-height: 100%;
  padding: 124px 45px 260px 46px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const LOGO = styled.div`
  width: 244px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 120px;

  > h1 {
    margin-top: 24px;
    font-weight: 700;
    font-size: 40px;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const ItemWrapper = styled.div`
  display: flex;
`;

const Img = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const ItemName = styled.p`
  font-weight: 500;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};
`;

export default Navigation;
