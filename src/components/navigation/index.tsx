import { useState } from "react";
import styled from "@emotion/styled";
import Item from "./Item";
import { check, list, people, teacher } from "../../assets/navigation/index";

/* link는 후에 page 추가 할때마다 채워넣기 */
const nameToInfo = [
  {
    name: "외출/이동 수락",
    link: "",
    Icon: check,
    dropdown: false,
  },
  {
    name: "외출자 목록",
    link: "",
    Icon: list,
    dropdown: false,
  },
  { name: "출결 상태", link: "", Icon: list, dropdown: false },
  { name: "인원 변경", link: "", Icon: people, dropdown: true },
  {
    name: "자습 감독 선생님 변경",
    link: "",
    Icon: teacher,
    dropdown: false,
  },
];

const Navigation = () => {
  const [activeItem, setActiveItem] = useState<number>();

  const onClickItem = (idx: number) => {
    setActiveItem(idx);
  };

  return (
    <Wrapper>
      <TitleContainer>
        <LOGO />
        <h1>OOO 선생님</h1>
      </TitleContainer>
      <ItemContainer>
        {nameToInfo.map((item, idx) => {
          const { Icon, link, name, dropdown } = item;
          return (
            <Item
              key={name}
              isState={(idx + 1) * 10 === activeItem}
              onClick={() => onClickItem((idx + 1) * 10)}
              name={name}
              Icon={Icon}
              link={link}
              dropdown={dropdown}
            />
          );
        })}
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;
  height: 100%;
  padding: 124px 20px 260px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const LOGO = styled.div`
  width: 244px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;

  > h1 {
    margin-top: 24px;
    font-weight: 700;
    font-size: 40px;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default Navigation;
