import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <ModalBox>{children}</ModalBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(33, 33, 33, 0.3);
`;

const ModalBox = styled.dialog`
  padding: 60px 44px 28px 45px;
  width: 680px;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(33, 33, 33, 0.3);
`;

export default Modal;
