import { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { vector } from "../../assets/navigation/index";
import VectorImg from "@/assets/navigation/vector";

interface ItemProps {
  link: string;
  Icon: JSX.Element;
  name: string;
  dropdown: boolean;
  isState: boolean;
  onClick: () => void;
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
}: ItemProps) => {
  const [isFold, setIsFold] = useState<boolean>(false);
  const router = useRouter();

  const onClickLabel = (url: string) => {
    setIsFold(!isFold);
    router.push(`/${url}`);
  };

  const onClickDropDownItem = (url: string) => {
    router.push(`/${url}`);
  };

  return (
    <label onClick={() => onClickLabel(link)}>
      <Wrapper onClick={onClick} isState={isState}>
        {Icon}
        <ItemName dropdown={dropdown} isState={isState}>
          {name}
        </ItemName>
        <VectorImgContainer isFold={isFold}>
          <VectorImg color={isState} />
        </VectorImgContainer>
        {isFold && (
          <ListWrapper>
            {DropDownValue.map((item) => (
              <ListOptionBox
                key={item.link}
                onClick={() => onClickDropDownItem(item.link)}
              >
                <p>{item.value}</p>
              </ListOptionBox>
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
  width: 360px;
  height: 76px;
  border-radius: 12px;
  background-color: ${({ isState, theme }) =>
    isState && theme.colors.purple400};

  .icon {
    margin-right: 20px;
  }

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
  font-size: 24px;
  color: ${({ isState, theme }) =>
    isState ? theme.colors.white : theme.colors.black};
`;

const VectorImgContainer = styled.div<{ isFold: boolean }>`
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
  height: 56px;
  padding: 16px 229px 16px 75px;

  > p {
    color: ${({ theme }) => theme.colors.white};
  }

  :hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.white};
  }
`;

export default DropDownItem;
