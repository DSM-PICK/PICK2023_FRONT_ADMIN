import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useQuery, useMutation } from "react-query";
import OutingList from "../components/activityAccept/OutingList";
import MovingComponent from "../components/activityAccept/MovingComponent";
import Modal from "@/components/common/Modal";
import { ItemType } from "@/models/common";
import { useApiError } from "@/hooks/useApiError";
import { todayDate } from "@/utils/functions/todayDate";
import { getOutingApplyList } from "@/utils/api/outing";
import {
  getMoveStudentList,
  floorRestrictionPatch,
} from "@/utils/api/selfStudy";
import { getDateType } from "@/utils/api/common/index";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Button from "@/components/common/Button";
import PageContainer from "@/components/common/PageContainer";
import ButtonBox from "@/components/activityAccept/ButtonBox";
import HeadBar from "@/components/activityAccept/HeadBar";
import Filter from "@/components/activityAccept/Filter";
import { toast } from "react-hot-toast";
import NoData from "@/components/common/Nodata";
import {
  gradeDropDownItem,
  classDropDownItem,
  layerDropDownItem,
} from "@/components/activityAccept/DropDownItem";

interface ActivityBtnProps {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ActivityBtn = ({ children, onClick, disabled }: ActivityBtnProps) => {
  const headerBarBtnStyle = css`
    font-size: 13px;
    font-weight: 400;
    padding: 0px 12px;
    border-radius: 8px;
    margin: 8px 0;
    cursor: pointer;
  `;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size={["", "36px"]}
      customStyle={headerBarBtnStyle}
      fill="purple"
    >
      {children}
    </Button>
  );
};

const ActivityAccept = () => {
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const [outingStudentId, setOutingStudentId] = useState<string[]>([]);
  const [gradeResult, setGradeResult] = useState<ItemType>(
    gradeDropDownItem[0]
  );
  const [classResult, setClassResult] = useState<ItemType>(
    classDropDownItem[0]
  );
  const [layerResult, setLayerResult] = useState<ItemType>(
    layerDropDownItem[0]
  );

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [pageLock, setPageLock] = useState<boolean>(false);

  let grade_id = gradeResult.id as number;
  let class_id = classResult.id as number;
  let layer_id = layerResult.id as number;

  const { handleError } = useApiError();

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
        grade: grade_id,
        classNum: class_id,
        floor: layer_id,
        type: (todayType?.data.type as string) || "SELF_STUDY",
      }),
    {
      cacheTime: 0,
    }
  );

  const { data: moveList } = useQuery(
    ["moveList", gradeResult.id, classResult.id, layerResult.id],
    () =>
      getMoveStudentList({
        grade: grade_id,
        classNum: class_id,
        floor: layer_id,
      }),
    {
      cacheTime: 0,
    }
  );

  const floorState = useSelector(
    (state: RootState) => state.counter.initalState.setTeacherState
  );

  let isClick = outingSelectList.length > 0;

  const filter: JSX.Element = (
    <Filter
      gradeResult={gradeResult}
      classResult={classResult}
      layerResult={layerResult}
      setClassResult={setClassResult}
      setGradeResult={setGradeResult}
      setLayerResult={setLayerResult}
    />
  );

  const { mutate } = useMutation("floor", () => floorRestrictionPatch(), {
    onError: handleError,
    onSuccess: () => {
      toast.success("층 이동이 제한되었습니다.", { duration: 1000 });
    },
  });

  return (
    <>
      {
        // 앱 쪽에서 신청 쪽 추가 되면 삭제
        pageLock ? (
          <PageContainer
            title="외출/이동 수락"
            subTitle={todayDate()}
            filter={filter}
          >
            <Container>
              <div>
                <HeadBar title="외출 신청 목록">
                  <ActivityBtn>새로운 외출증 발급</ActivityBtn>
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
                  isActive={isClick}
                  outingStudentId={outingStudentId}
                />
              </div>
              <div>
                <HeadBar title="이동한 학생">
                  <ActivityBtn
                    onClick={() => setOpenModal(true)}
                    disabled={floorState ? false : true}
                  >
                    {floorState ? `${floorState}층 이동 제한` : "이동 제한 X"}
                  </ActivityBtn>
                </HeadBar>
                {isOpenModal && (
                  <Modal
                    setOpenModal={setOpenModal}
                    isDanger={true}
                    btnText="제한하기"
                    mainText={`오늘 ${floorState}층의 모든 이동을
              제한하시겠습니까?`}
                    subText={`제한하기를 선택하면 오늘(${todayDate()})
                  방과후 시간동안 학생들의 교실 이동은 불가능합니다.`}
                    callBack={() => {
                      mutate();
                    }}
                  />
                )}
                <MovingBox>
                  {moveList?.data && moveList?.data.move_list.length ? (
                    moveList?.data.move_list.map((data) => (
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
              </div>
            </Container>
          </PageContainer>
        ) : (
          <OutingLockContainer>
            <p>
              어플리케이션에 외출 기능이 추가되면 사용이 가능한 페이지입니다.
            </p>
          </OutingLockContainer>
        )
      }
    </>
  );
};

const Container = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1.5fr 1fr;
  height: 100%;
  > div {
    height: 68vh !important;
    width: 100%;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    height: 100%;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: hidden;
  }
`;

const OutingBox = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  overflow-y: scroll;
`;

const MovingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: scroll;
`;

// 앱 쪽에서 신청 추가 되기 전까지 임시 방편
const OutingLockContainer = styled.div`
  margin: auto;
  display: flex;
  justify-items: center;
  align-items: center;

  > p {
    font-size: 28px;
  }
`;

export default ActivityAccept;
