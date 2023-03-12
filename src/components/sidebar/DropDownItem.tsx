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
  { plusLink: "/change-person/club", value: "동아리" },
  { plusLink: "/change-person/class", value: "반" },
  { plusLink: "/change-person/afterSchool", value: "방과후" },
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
              <Link
                key={item.plusLink}
                style={{ textDecoration: "none" }}
                href={`${link + item.plusLink}`}
              >
                <ListOptionBox>
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
  padding: 16px 24px;
  border-radius: ${({ isState }) => (isState ? "12px 12px 0 0" : "12px")};
  gap: 16px;
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
  font-weight: 500;
  font-size: 16px;
  color: ${({ isState, theme }) =>
    isState ? theme.colors.white : theme.colors.black};
`;

const VectorImgContainer = styled.div<{ isFold: boolean }>`
  position: absolute;
  right: 24px;

  width: 10px;
  transition: all ease 200ms;
  transform: rotate(${(props) => (props.isFold ? "180" : "0")}deg);
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 99;
  width: 100%;
  border-radius: 0 0 12px 12px;
  background-color: ${({ theme }) => theme.colors.purple400};
  padding: 0 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListOptionBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  > p {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.white};
  }

  :hover {
    font-weight: 700;
  }
`;

export default DropDownItem;
