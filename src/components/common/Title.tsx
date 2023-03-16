import styled from "@emotion/styled";

interface Props {
  title: string;
  subTitle?: string;
}

const Title = ({ title, subTitle }: Props) => {
  return (
    <TitleBox>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </TitleBox>
  );
};

Title.displayName = "TitleBox";

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

export default Title;
