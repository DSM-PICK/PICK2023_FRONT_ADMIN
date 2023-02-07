import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";
import { useState } from "react";

interface OutType {
  외출자: {
    학번: number;
    이름: string;
    시간: string;
  };
}

const Outing = ({ 외출자 }: OutType) => {
  const { 학번, 이름, 시간 } = 외출자;
  const [isModal, setIsModal] = useState<boolean>(false);

  const closeModal = () => {
    setIsModal(false);
  };
  const openModal = () => {
    setIsModal(true);
  };
  const comeback = () => {
    setIsModal(false);
    //API
  };

  return (
    <>
      <Container>
        <Info>
          <MainText>
            {학번} {이름}
          </MainText>
          <SubText>{시간} 도착예정</SubText>
        </Info>
        <Button onClick={openModal} fill="purple" size="sm">
          복귀
        </Button>
      </Container>
      {/* 모달 */}
      {isModal && (
        <>
          <Background onClick={closeModal} />
          <ModalBox>
            <div>
              <ModalMainText>
                <p>
                  {학번} {이름} 학생의
                </p>
                <p>외출을 끝내시겠습니까?</p>
              </ModalMainText>
              <ModalSubText>
                <p>확인하기를 선택하며 다시 상태를 변경할 수 없습니다.</p>
                <p>학생이 학교로 복귀했는지 다시 한번 확인해주세요.</p>
              </ModalSubText>
            </div>
            <Buttons>
              <ModalButton onClick={closeModal} size="lg">
                취소
              </ModalButton>
              <ModalButton onClick={comeback} fill="purple" size="lg">
                확인하기
              </ModalButton>
            </Buttons>
          </ModalBox>
        </>
      )}
      {/* 모달 */}
    </>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  width: 360px;
  height: 60px;
  padding: 12px 20px 12px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const MainText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;
const SubText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(33, 33, 33, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background-color: #ffffff;
  position: fixed;
  margin: auto auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 680px;
  height: 380px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 52px;
`;

const ModalMainText = styled.div`
  font-size: 36px;
  font-weight: 500;
  line-height: 54px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray900};
`;

const ModalSubText = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const ModalButton = styled(Button)`
  width: 288px;
  height: 60px;
`;
export default Outing;
