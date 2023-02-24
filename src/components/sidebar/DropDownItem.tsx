import styled from "@emotion/styled";
import VectorImg from "@/assets/navigation/vector";
import Link from "next/link";

interface ItemProps {
  link: string;
  Icon: JSX.Element;
  name: string;
  dropdown: boolean;
  isState: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// link에 해당 url 넣기
const DropDownValue = [
  { link: "a", value: "동아리" },
  { link: "b", value: "반" },
  { link: "c", value: "방과후" },
];

const DropDownItem = ({
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
    <label onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Wrapper onClick={onClick} isState={isState}>
        {Icon}
        <ItemName dropdown={dropdown} isState={isState}>
          {name}
        </ItemName>
        <VectorImgContainer isFold={isState}>
          <VectorImg color={isState} />
        </VectorImgContainer>
        {isState && (
          <ListWrapper>
            {DropDownValue.map((item) => (
              <Link style={{ textDecoration: "none" }} href={`/${link}`}>
                <ListOptionBox key={item.link}>
                  <p>{item.value}</p>
                </ListOptionBox>
              </Link>
            ))}
          </ListWrapper>
        )}
      </Wrapper>
    </label>
  );
};

const Wrapper = styled.div<{ isState: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 60px;
  border-radius: 12px;
  background-color: ${({ isState, theme }) =>
    isState && theme.colors.purple400};

  > label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, isState }) =>
      isState && theme.colors.purple400};
  }
`;

const ItemName = styled.p<{ dropdown: boolean; isState: boolean }>`
  margin-right: ${({ dropdown }) => dropdown && "145px"};
  font-weight: 500;
  font-size: 20px;
  color: ${({ isState, theme }) =>
    isState ? theme.colors.white : theme.colors.black};
`;

const VectorImgContainer = styled.div<{ isFold: boolean }>`
  width: 10px;
  transition: all ease 200ms;
  transform: rotate(${(props) => (props.isFold ? "180" : "0")}deg);
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 99;
  width: 360px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.purple400};
`;

const ListOptionBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 16px 16px;

  > p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.white};
  }

  :hover {
    font-weight: 700;
  }
`;

export default DropDownItem;
