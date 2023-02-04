import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  link: string;
  Icon: string;
  name: string;
  dropdown: boolean;
}

const Item = ({ name, link, Icon, dropdown }: ItemProps) => {
  return (
    <Link style={{ textDecoration: "none" }} href={`/${link}`}>
      <ItemWrapper>
        <Image src={Icon} alt="" />
        <ItemName>{name}</ItemName>
      </ItemWrapper>
    </Link>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  cursor: pointer;
  width: 360px;
  height: 76px;
  padding: 24px;

  > img {
    margin-right: 20px;
  }
`;

const ItemName = styled.p`
  font-weight: 500;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};
`;

export default Item;
