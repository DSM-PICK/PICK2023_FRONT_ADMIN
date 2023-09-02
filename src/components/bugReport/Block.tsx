import styled from "@emotion/styled";

interface BlockProps {
  title: string;
  children: JSX.Element;
}

const Block = ({ title, children }: BlockProps) => {
  return (
    <Container>
      <p>{title}</p>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > p {
    font-size: 24px;
    line-height: 36px;
    color: ${({ theme }) => theme.colors.gray900};
    font-weight: 500;
  }
`;

export default Block;
