import { useState, useCallback, Children } from "react";
import styled from "@emotion/styled";
import Modal from "./modal";
import ButtonComponent from "../button/ButtonComponent";
import contant from "./contant";

interface Props {
  gcn: number;
  studentName: string;
}

const Props = {
  gcn: 1233,
  studentName: "추혜연",
};

interface ContentType {
  [index: string]: {
    Text: string;
    Layer1: string;
    Layer2: string;
    Button: string;
    Fill: "purple" | "red";
  };
}

const content: ContentType = {
  accept: {
    Text: "외출을 수락하시겠습니까?",
    Layer1: "수락하기 선택 이후에는 변경할 수 없습니다.",
    Layer2: "다시 한번 확인해주세요.",
    Button: "수락하기",
    Fill: "purple",
  },
  refuse: {
    Text: "외출을 거절하시겠습니까?",
    Layer1: "확인하기를 선택하면 다시 상태를 변경할 수 없습니다.",
    Layer2: " 학생이 학교로 복귀했는지 다시 한번 확인해주세요.",
    Button: "거절하기",
    Fill: "red",
  },
  finish: {
    Text: "외출을 끝내시겠습니까?",
    Layer1: "확인하기를 선택하면 다시 상태를 변경할 수 없습니다.",
    Layer2: "학생이 학교로 복귀했는지 다시 한번 확인해주세요.",
    Button: "확인하기",
    Fill: "purple",
  },
  restriction: {
    Text: "제한하시겠습니까?",
    Layer1: `제한하기를 선택하면 오늘${"(2023-02-18)"}`,
    Layer2: "방과후 시간동안 학생들의 교실 이동은 불가능합니다.",
    Button: "수락하기",
    Fill: "red",
  },
};

const ModalPage = () => {
  const BtnsStyles = {
    "font-weight": "400",
    "font-size": "24px",
    "line-height": "36px",
  };
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Main>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <TitleWrapper>
            <MainText>
              {content.restriction
                ? `오늘 ${"2"}층의 모든 이동을`
                : Props.gcn + Props.studentName + "학생의"}
            </MainText>
            <MainText>{content.restriction.Text}</MainText>
          </TitleWrapper>
          <LayerText>{contant.restriction.Layer1}</LayerText>
          <LayerText>{contant.restriction.Layer2}</LayerText>
          <BtnContainer>
            <ButtonComponent
              customStyle={BtnsStyles}
              fill="default"
              size={["288px", "60px"]}
              disabled={false}
            >
              취소
            </ButtonComponent>
            <ButtonComponent
              customStyle={BtnsStyles}
              fill={content.restriction.Fill}
              size={["288px", "60px"]}
              disabled={false}
            >
              {contant.restriction.Button}
            </ButtonComponent>
          </BtnContainer>
        </Modal>
      )}
      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
    </Main>
  );
};
const TitleWrapper = styled.div`
  padding-bottom: 24px;
`;
const BtnContainer = styled.div`
  display: flex;
  margin-top: 52px;
  justify-content: space-between;
  gap: 15px;
`;

const LayerText = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #706d75;
`;
const MainText = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  text-align: center;
`;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DialogButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: #8c339e;
  color: white;
  font-weight: 400;
  border: none;
  cursor: pointer;
`;

export default ModalPage;
