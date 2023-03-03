import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { MoreIcon, Leader } from "@/assets/club";
import Menu from "./menu";

interface MemberProps {
  data: {
    num: string;
    name: string;
    isLeader: boolean;
  };
}

const Member = ({ data }: MemberProps) => {
  const { num, name, isLeader } = data;
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const setLeader = () => {
    onClick();
  };
  const changeClub = () => {
    onClick();
  };

  const onClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Container>
      <User>
        <p>
          {num} {name}
        </p>
        {isLeader && <LeaderImg src={Leader} alt="leader" width={18} />}
      </User>
      <MoreBtn onClick={onClick}>
        <Image src={MoreIcon} alt="more" height={15} width={4} />
      </MoreBtn>
      {openMenu && (
        <Menu
          clubClick={changeClub}
          leaderClick={setLeader}
          setMenu={onClick}
          isLeader={isLeader}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${({theme})=>theme.colors.white};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  position: relative;
`;
const User = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray900};
  margin-left: 10px;
  display: flex;
  white-space: nowrap;
`;
const LeaderImg = styled(Image)`
  margin-left: 10px;
`;
const MoreBtn = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Member;
