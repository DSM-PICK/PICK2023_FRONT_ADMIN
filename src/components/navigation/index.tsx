import { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Logo from "../../assets/Logo.svg";
import { useRouter } from "next/router";
import Item from "./Item";
import {
  check,
  activeCheck,
  list,
  activeList,
  people,
  activePeople,
  teacher,
  activeTeacher,
  out,
  activeOut,
} from "../../assets/navigation/index";

/* link는 후에 page 추가 할때마다 채워넣기 */
const nameToInfo = [
  {
    name: "외출/이동 수락",
    link: "",
    Icon: check,
    activeIcon: activeCheck,
    dropdown: false,
  },
  {
    name: "외출자 목록",
    link: "",
    Icon: out,
    activeIcon: activeOut,
    dropdown: false,
  },
  {
    name: "출결 상태",
    link: "",
    Icon: list,
    activeIcon: activeList,
    dropdown: false,
  },
  {
    name: "인원 변경",
    link: "",
    Icon: people,
    activeIcon: activePeople,
    dropdown: true,
  },
  {
    name: "자습 감독 선생님 변경",
    link: "",
    Icon: teacher,
    activeIcon: activeTeacher,
    dropdown: false,
  },
];

const Navigation = () => {
  const [activeItem, setActiveItem] = useState<number>();
  const router = useRouter();

  const onClickItem = (idx: number) => {
    setActiveItem(idx);
  };

  const onClickLogo = () => {
    router.push("/");
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Image onClick={onClickLogo} src={Logo} alt="logo" />
        <h1>OOO 선생님</h1>
      </TitleContainer>
      <ItemContainer>
        {nameToInfo.map((item, idx) => {
          const { Icon, link, name, dropdown, activeIcon } = item;
          return (
            <Item
              key={name}
              isState={(idx + 1) * 10 === activeItem}
              onClick={() => onClickItem((idx + 1) * 10)}
              name={name}
              Icon={Icon}
              activeIcon={activeIcon}
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;

  > img {
    cursor: pointer;
  }

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
