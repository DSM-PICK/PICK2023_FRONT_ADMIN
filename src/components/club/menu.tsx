import styled from "@emotion/styled";

interface MenuProps {
  clubClick: () => void;
  leaderClick: () => void;
  setMenu: () => void;
  isLeader: boolean;
}

const Menu = ({ clubClick, leaderClick, setMenu, isLeader }: MenuProps) => {
  return (
    <>
      <Container>
        <ItemBox onClick={clubClick}>동아리 변경</ItemBox>
        {!isLeader && <ItemBox onClick={leaderClick}>동아리장 위임</ItemBox>}
      </Container>
      <Background onClick={setMenu} />
    </>
  );
};

const Container = styled.div`
  position: absolute;
  width: 120px;
  background-color: ${({ theme }) => theme.colors.white};
  right: 15px;
  top: 37px;
  border-radius: 8px;
  box-shadow: 0px 1px 4px 2px rgba(33, 33, 33, 0.15);
  z-index: 1;
`;
const ItemBox = styled.div`
  width: 100%;
  height: 37.5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  cursor: pointer;
  border-radius: 8px;
  z-index: 2;
`;
const Background = styled.div`
  position: absolute;
  background-color: transparent;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export default Menu;
