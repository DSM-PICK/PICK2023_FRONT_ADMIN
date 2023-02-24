import styled from "@emotion/styled";
import Link from "next/link";
import DropDownItem from "./DropDownItem";

interface ItemProps {
  link: string;
  Icon: JSX.Element;
  name: string;
  dropdown: boolean;
  isState: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const Item = ({
  name,
  link,
  Icon,
  dropdown,
  isState,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ItemProps) => {
  return (
    <>
      {dropdown ? (
        <DropDownItem
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          Icon={Icon}
          name={name}
          link={link}
          dropdown={dropdown}
          isState={isState}
        />
      ) : (
        <Link style={{ textDecoration: "none" }} href={`/${link}`}>
          <ItemWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {Icon}
            <ItemName dropdown={dropdown}>{name}</ItemName>
          </ItemWrapper>
        </Link>
      )}
    </>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 360px;
  height: 76px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};

  :hover {
    background-color: ${({ theme }) => theme.colors.purple400};

    > p {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .icon {
    margin-right: 20px;
  }
`;

const ItemName = styled.p<{ dropdown: boolean }>`
  margin-right: ${({ dropdown }) => dropdown && "145px"};
  font-weight: 500;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};
`;

export default Item;
