import { useState, useCallback, Children } from "react";
import styled from "@emotion/styled"
import Modal from "./modal";

function App() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Main>
    
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <TitleWrapper>
             <MainText>2120 추혜연 학생의</MainText>
       <MainText>외출을 끝내시겠습니까?</MainText>
          </TitleWrapper>
       <LayerText>확인하기를 선택하면 다시 상태를 변경할 수 없습니다.</LayerText> 
       <LayerText>학생이 학교로 복귀했는지 다시 한번 확인해주세요.</LayerText>
        </Modal>
      )}
      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
    </Main>
  );
}
const TitleWrapper=styled.div`
  padding-bottom: 24px;
`

const LayerText=styled.div`
  font-weight: 400;
font-size: 20px;
line-height: 24px;
text-align: center;
color: #706D75;
`
const MainText=styled.div`
font-weight: 500;
font-size: 36px;
line-height: 54px;
text-align: center;
`

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

export default App;