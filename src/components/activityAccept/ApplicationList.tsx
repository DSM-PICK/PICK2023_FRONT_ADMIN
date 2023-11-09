import ButtonBox from "@/components/activityAccept/ButtonBox";
import OutingList from "./OutingList";
import { useState } from "react";
import { useQuery } from "react-query";
import { getOutingApplyList } from "@/utils/api/outing";
import { getDateType } from "@/utils/api/common";
import { todayDate } from "@/utils/functions/todayDate";
import { useApiError } from "@/hooks/useApiError";
import { ItemType } from "@/models/common";
import styled from "@emotion/styled";
import HeadBar from "./HeadBar";
import ActivityBtn from "./ActivityBtn";

interface ApplicationListProps {
  gradeResult: ItemType;
  classResult: ItemType;
  layerResult: ItemType;
  setIsOpenOutingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApplicationList = ({
  gradeResult,
  classResult,
  layerResult,
  setIsOpenOutingModal,
}: ApplicationListProps) => {
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const [outingStudentId, setOutingStudentId] = useState<string[]>([]);

  const { handleError } = useApiError();

  const handleOpenOutingModal = () => {
    setIsOpenOutingModal(true);
  };

  const { data: todayType } = useQuery(
    "todayType",
    () => getDateType(todayDate()),
    {
      onError: handleError,
    }
  );

  const { data: applyList } = useQuery(
    ["applyList", gradeResult.id, classResult.id, layerResult.id],
    () =>
      getOutingApplyList({
        grade: gradeResult.id as number,
        classNum: classResult.id as number,
        floor: layerResult.id as number,
        type: (todayType?.type as string) || "SELF_STUDY",
      }),
    {
      cacheTime: 0,
    }
  );

  return (
    <div>
      <HeadBar title="외출 신청 목록">
        <ActivityBtn onClick={handleOpenOutingModal}>
          새로운 외출증 발급
        </ActivityBtn>
      </HeadBar>
      <OutingBox>
        <OutingList
          outing={applyList?.outing || []}
          outingSelectList={outingSelectList}
          outingStudentId={outingStudentId}
          setOutingSelectList={setOutingSelectList}
          setOutingStudentId={setOutingStudentId}
        />
      </OutingBox>
      <ButtonBox
        outingStudentId={outingStudentId}
        outingSelectList={outingSelectList}
      />
    </div>
  );
};

const OutingBox = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  overflow-y: scroll;
`;

export default ApplicationList;
