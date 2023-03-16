import styled from "@emotion/styled";

interface headBarProps {
  title: string;
  children: JSX.Element;
}
const HeadBar = ({ title, children }: headBarProps) => {
  return (
    <HeaderContainer>
      <HeaderText>{title}</HeaderText>
      {children}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 0px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderText = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
`;

export default HeadBar;
