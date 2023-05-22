import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { MoreIcon, Leader } from "@/assets/club";
import Modal from "../common/Modal";
import DropDown from "../common/Dropdown";
import Menu from "./menu";
import { ItemType } from "@/models/common";
import { layerDropDownItem } from "@/constants/DropDownItem";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getLayerClassList,
  clubChangePatch,
  clubKingPatch,
} from "@/utils/api/selfStudy";
import { todayDate } from "@/utils/functions/todayDate";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-hot-toast";

interface Props {
  head_club_id: string;
  club_name: string;
  student_id: string;
  head_status: boolean;
  student_number: string;
  student_name: string;
  refetch: () => void;
}

const Member = ({
  student_id,
  head_club_id,
  student_name,
  student_number,
  head_status,
  club_name,
  refetch,
}: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openModalLeader, setOpenModalLeader] = useState<boolean>(false);
  const [openModalChangeClub, setOpenModalChangeClub] =
    useState<boolean>(false);
  const [layerResult, setLayerResult] = useState<ItemType>({
    option: "2층",
    id: 2,
  });
  const [classResult, setClassResult] = useState<ItemType>({
    option: "반",
    id: "",
  });

  const date = todayDate();
  const { handleError } = useApiError();

  let layerData = Number(layerResult.id);
  const { data: classList } = useQuery(
    ["classList", layerData],
    () => getLayerClassList(layerData, "FRI_CLUB"),
    {
      onError: handleError,
      cacheTime: 0,
    }
  );

  const classObj = classList?.classroom_list.map((item) => {
    return { option: item.description, id: item.type_id };
  });

  const queryClient = useQueryClient();
  let change_club_id = classResult.id as string;
  const { mutate: changeClubStudent } = useMutation(
    "changeClub",
    () => clubChangePatch(change_club_id, student_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clubList");
        toast.success("동아리가 변경되었습니다.", { duration: 1000 });
      },
      onError: handleError,
    }
  );

  const { mutate: clubHeadPatch } = useMutation(
    "kingChange",
    () => clubKingPatch(head_club_id, student_id),
    {
      onSuccess: () => {
        refetch();
        toast.success("동아리 부장이 바뀌었습니다.", { duration: 1000 });
      },
      onError: handleError,
    }
  );

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
            {student_number} {student_name}
          </p>
          {head_status && <LeaderImg src={Leader} alt="leader" width={18} />}
        </User>
        <MoreBtn onClick={onClick}>
          <Image src={MoreIcon} alt="more" height={15} width={4} />
        </MoreBtn>
        {openMenu && (
          <Menu
            clubClick={changeClub}
            leaderClick={setLeader}
            setMenu={onClick}
            isLeader={head_status}
          />
        )}
      </Container>
      {openModalLeader && (
        <Modal
          setOpenModal={setOpenModalLeader}
          isDanger={false}
          btnText="변경하기"
          callBack={() => {
            clubHeadPatch();
          }}
          subText={`변경하기를 선택하면 ${club_name}의 동아리장이\n ${
            student_number + " " + student_name
          }(으)로 변경됩니다.`}
          mainText={`${club_name}의 동아리장을\n${
            student_number + " " + student_name
          }(으)로 바꾸시겠습니까?`}
        />
      )}
      {openModalChangeClub && (
        <Modal
          mainText={`${
            student_number + " " + student_name
          }의\n 변경 이후 동아리를 선택해주세요.`}
          isDanger={false}
          btnText="변경하기"
          callBack={changeClubStudent}
          setOpenModal={setOpenModalChangeClub}
        >
          <DropDownBox>
            <DropDown
              title="2층"
              dropDownItem={layerDropDownItem}
              setResult={setLayerResult}
            />
            <DropDown
              title="동아리"
              dropDownItem={classObj!}
              setResult={setClassResult}
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
