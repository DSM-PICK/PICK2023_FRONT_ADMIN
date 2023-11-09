import { RootState } from "../../store/store";
import { getMoveStudentList } from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import HeadBar from "./HeadBar";
import ActivityBtn from "./ActivityBtn";
import NoData from "../common/Nodata";
import { useState } from "react";
import { useApiError } from "../../hooks/useApiError";
import MovingComponent from "./MovingComponent";
import { ItemType } from "../../models/common";
import Modals from "./ModalContainer";

interface MovedStudentProps {
  gradeResult: ItemType;
  classResult: ItemType;
  layerResult: ItemType;
  isOpenOutingModal: boolean;
  setIsOpenOutingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovedStudent = ({
  gradeResult,
  classResult,
  layerResult,
  isOpenOutingModal,
  setIsOpenOutingModal,
}: MovedStudentProps) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { handleError } = useApiError();

  const { data: moveList } = useQuery(
    ["moveList", gradeResult.id, classResult.id, layerResult.id],
    () =>
      getMoveStudentList({
        grade: gradeResult.id as number,
        classNum: classResult.id as number,
        floor: layerResult.id as number,
      }),
    {
      enabled: !!gradeResult.id || !!layerResult.id,
      onError: handleError,
      cacheTime: 0,
    }
  );

  const floorState = useSelector(
    (state: RootState) => state.counter.initalState.setTeacherState
  );

  return (
    <div>
      <HeadBar title="이동한 학생">
        <ActivityBtn onClick={() => setOpenModal(true)} disabled={!floorState}>
          {floorState ? `${floorState}층 이동 제한` : "이동 제한 X"}
        </ActivityBtn>
      </HeadBar>
      <MovingBox>
        {moveList?.move_list.length ? (
          moveList?.move_list.map((data) => (
            <MovingComponent
              key={data.student_number}
              student_number={data.student_number}
              student_name={data.student_name}
              after={data.after}
              before={data.before}
            />
          ))
        ) : (
          <NoData />
        )}
      </MovingBox>
      <Modals
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
        setIsOpenOutingModal={setIsOpenOutingModal}
        floorState={floorState}
        isOpenOutingModal={isOpenOutingModal}
      />
    </div>
  );
};

const MovingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
`;

export default MovedStudent;
