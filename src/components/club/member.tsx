import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { MoreIcon, Leader } from "@/assets/club";
import Modal from "../common/modal";
import DropDown from "../common/dropDown";
import Menu from "./menu";
import { ItemType } from "@/models/common";
import { layerDropDownItem, classDropDownItem } from "./DropDownItem";
import ClubDropDown from "./clubDropDown";

interface MemberProps {
  num: string;
  name: string;
  isLeader: boolean;
}

const Member = ({ num, name, isLeader }: MemberProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openModalLeader, setOpenModalLeader] = useState<boolean>(false);
  const [openModalChangeClub, setOpenModalChangeClub] =
    useState<boolean>(false);
  const [layerResult, setLayerResult] = useState<ItemType>({
    option: "layer",
    id: "Title",
  });
  const [classResult, setClassResult] = useState<ItemType>({
    option: "class",
    id: "Title",
  });

  const setLeader = () => {
    setOpenModalLeader(true);
    onClick();
  };
  const changeClub = () => {
    setOpenModalChangeClub(true);
    onClick();
  };

  const onClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
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
      {openModalLeader && (
        <Modal
          setOpenModal={setOpenModalLeader}
          isDanger={false}
          btnText="변경하기"
          callBack={() => {}}
          subText={`변경하기를 선택하면 정의 동아리장이\n${"2106 김의찬"}에서 ${
            num + " " + name
          }(으)로 변경됩니다.`}
          mainText={`${"정"}의 동아리장을\n${
            num + " " + name
          }(으)로 바꾸시겠습니까?`}
        />
      )}
      {openModalChangeClub && (
        <Modal
          mainText={`${num + " " + name}의\n 변경 이후 동아리를 선택해주세요.`}
          isDanger={false}
          btnText="변경하기"
          callBack={() => {}}
          setOpenModal={setOpenModalChangeClub}
        >
          <DropDownBox>
            <ClubDropDown
              setLayerResult={setLayerResult}
              setClassResult={setClassResult}
            />
          </DropDownBox>
        </Modal>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.white};
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

const DropDownBox = styled.div`
  margin-bottom: 48px;
`;

export default Member;
