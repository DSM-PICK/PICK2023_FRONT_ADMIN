import { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Logo from "../../assets/Logo.svg";
import { useRouter } from "next/router";
import Item from "./Item";
import { useQuery } from "react-query";
import { getTodaySelfStudyTeacherWhether } from "@/utils/api/selfStudy/index";
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
    link: "outlist",
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
    link: "",
    Icon: people,
    dropdown: true,
  },
  {
    name: "자습 감독 선생님 변경",
    link: "changeTeacher",
    Icon: teacher,
    dropdown: false,
  },
];

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState<number>();
  const router = useRouter();

  const { data: state } = useQuery("state", () =>
    getTodaySelfStudyTeacherWhether()
  );

  const onClickItem = (idx: number) => {
    setActiveItem(idx);
  };

  const onClickLogo = () => {
    router.push("/main");
    setActiveItem(0);
  };

  return (
    <LayoutWrapper>
      <SidebarWrapper id="sidebar">
        <TitleContainer>
          <Image onClick={onClickLogo} src={Logo} alt="logo" />
          <h1>{state?.data.name} 선생님</h1>
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
                onMouseEnter={() => onClickItem((idx + 1) * 6)}
                onMouseLeave={() => onClickItem(idx - 1)}
                Icon={<Icon color={(idx + 1) * 6 === activeItem} />}
                link={link}
                dropdown={dropdown}
              />
            );
          })}
        </ItemContainer>
      </SidebarWrapper>
      <Spacer id="space" />
      {children}
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Spacer = styled.div`
  width: 300px;
`;

const SidebarWrapper = styled.div`
  width: 300px;
  height: 100vh;
  padding: 100px 20px 20px;
  overflow-y: scroll;
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  > img {
    width: 150px;
    cursor: pointer;
  }
  > h1 {
    margin-top: 24px;
    font-weight: 700;
    font-size: 20px;
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
