import styled from "@emotion/styled";
import Link from "next/link";
import DropDownItem from "./DropDownItem";
import Image from "next/image";
interface ItemProps {
  Icon: JSX.Element;
  name: string;
  link: string;
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
  width: 100%;
  height: 60px;
  padding: 16px 24px;
  gap: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};

  :hover {
    background-color: ${({ theme }) => theme.colors.purple400};

    > p {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const IconWrapper = styled(Image)`
  width: 18px;
`;

const ItemName = styled.p<{ dropdown: boolean }>`
  margin-right: ${({ dropdown }) => dropdown && "145px"};
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;

export default Item;
