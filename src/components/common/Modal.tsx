import { useRef } from "react";
import styled from "@emotion/styled";
import Button from "./Button";

interface Props {
  mainText?: string;
  subText?: string;
  btnText: string;
  isDanger: boolean;
  children?: JSX.Element;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  callBack: () => void;
}

const Modal = ({
  setOpenModal,
  btnText,
  isDanger,
  children,
  mainText,
  subText,
  callBack,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const clickModalOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  const clickConfirmButton = () => {
    setOpenModal(false);
    callBack();
  };

  return (
    <ModalWrapper ref={modalRef} onClick={(e) => clickModalOutside(e)}>
      <ModalBox>
        {mainText && <h1>{mainText}</h1>}
        {subText && <p>{subText}</p>}
        {children}
        <div>
          <Button
            fill="default"
            size={["240px", "52px"]}
            disabled={false}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            취소
          </Button>
          <Button
            fill={isDanger ? "red" : "purple"}
            size={["240px", "52px"]}
            disabled={false}
            onClick={() => clickConfirmButton()}
          >
            {btnText}
          </Button>
        </div>
      </ModalBox>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(33, 33, 33, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101 !important;
  cursor: pointer;
`;

const ModalBox = styled.dialog`
  padding: 28px 36px;
  width: 600px;
  cursor: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  > h1 {
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    text-align: center;
    white-space: pre-line;
    margin: 24px 0;
  }
  > p {
    font-size: 16px;
    white-space: pre-line;
    line-height: 24px;
    text-align: center;
    margin: 0 0 32px 0;
    color: ${({ theme }) => theme.colors.gray600};
  }
  > div {
    display: flex;
    gap: 24px;
  }
`;

export default Modal;
