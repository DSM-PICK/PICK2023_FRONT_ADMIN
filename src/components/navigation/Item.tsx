import styled from "@emotion/styled";

const Item = () => {
  return (
    <ItemWrapper>
      <Img />
      <ItemName>외출/이동 수락</ItemName>
    </ItemWrapper>
  );
};

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

export default Item;
