import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import DropDownItem from "./DropDownItem";
interface ItemProps {
  link: string;
  Icon: string;
  name: string;
  dropdown: boolean;
  isState: boolean;
  onClick: () => void;
}

const Item = ({ name, link, Icon, dropdown, isState, onClick }: ItemProps) => {
  return (
    <Link style={{ textDecoration: "none" }} href={`/${link}`}>
      {dropdown ? (
        <DropDownItem
          onClick={onClick}
          Icon={Icon}
          name={name}
          link={link}
          dropdown={dropdown}
          isState={isState}
        />
      ) : (
        <ItemWrapper onClick={onClick} isState={isState}>
          <Image className="icon" src={Icon} alt="logo" />
          <ItemName isState={isState} dropdown={dropdown}>
            {name}
          </ItemName>
        </ItemWrapper>
      )}
    </Link>
  );
};

const ItemWrapper = styled.div<{ isState: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 360px;
  height: 76px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ isState, theme }) =>
    isState && theme.colors.purple400};

  .icon {
    margin-right: 20px;
  }
`;

const ItemName = styled.p<{ dropdown: boolean; isState: boolean }>`
  margin-right: ${({ dropdown }) => dropdown && "145px"};
  font-weight: 500;
  font-size: 24px;
  color: ${({ isState, theme }) =>
    isState ? theme.colors.white : theme.colors.black};
`;

export default Item;
