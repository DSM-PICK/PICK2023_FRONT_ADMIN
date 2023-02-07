import { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Logo from "../../assets/Logo.svg";
import { useRouter } from "next/router";
import Item from "./Item";
import {
  check,
  list,
  people,
  teacher,
  out,
} from "../../assets/navigation/index";

const nameToInfo = [
  {
    name: "외출/이동 수락",
    link: "activity-accept",
    Icon: check,
    dropdown: false,
  },
  {
    name: "외출자 목록",
    link: "outing-list",
    Icon: out,
    dropdown: false,
  },
  {
    name: "출결 상태",
    link: "attendance",
    Icon: list,
    dropdown: false,
  },
  {
    name: "인원 변경",
    link: "change-person",
    Icon: people,
    dropdown: true,
  },
  {
    name: "자습 감독 선생님 변경",
    link: "change-teacher",
    Icon: teacher,
    dropdown: false,
  },
];

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState<number>();
  const router = useRouter();

  const onClickItem = (idx: number) => {
    setActiveItem(idx);
  };

  const onClickLogo = () => {
    router.push("/");
    setActiveItem(0);
  };

  return (
    <>
      <SidebarWrapper>
        <TitleContainer>
          <Image onClick={onClickLogo} src={Logo} alt="logo" />
          <h1>OOO 선생님</h1>
        </TitleContainer>
        <ItemContainer>
          {nameToInfo.map((item, idx) => {
            const { Icon, link, name, dropdown } = item;
            return (
              <Item
                key={name}
                isState={(idx + 1) * 6 === activeItem}
                onClick={() => onClickItem((idx + 1) * 6)}
                name={name}
                Icon={<Icon color={(idx + 1) * 6 === activeItem} />}
                link={link}
                dropdown={dropdown}
              />
            );
          })}
        </ItemContainer>
      </SidebarWrapper>
      {children}
    </>
  );
};

const SidebarWrapper = styled.div`
  width: 400px;
  height: 100vh;
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

export default SidebarLayout;
