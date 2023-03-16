import styled from "@emotion/styled";

interface Props {
  title: string;
  subTitle?: string;
  filter?: JSX.Element;
  children: JSX.Element;
}

const PageContainer = ({ title, subTitle, children, filter }: Props) => {
  return (
    <PageBox>
      <Header>
        <TitleBox>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </TitleBox>
        <FilterBox>{filter}</FilterBox>
      </Header>
      <Container>{children}</Container>
    </PageBox>
  );
};

const PageBox = styled.div`
  margin: auto;
`;

const TitleBox = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: end;
  gap: 24px;
  > h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 0px;
  }
  > p {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  margin-top: 20px;
  width: 70vw;
  height: 76vh;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  border: solid ${({ theme }) => theme.colors.gray50};
  border-width: 32px 28px;
`;

const FilterBox = styled.div`
  display: flex;
  gap: 12px;
`;

export default PageContainer;
