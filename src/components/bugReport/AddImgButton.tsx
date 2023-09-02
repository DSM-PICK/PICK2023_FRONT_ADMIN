import { AddImgIcon } from "@/assets/bug-report";
import styled from "@emotion/styled";
import Image from "next/image";

const AddImgButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Container onClick={onClick}>
      <Image src={AddImgIcon} alt="이미지 추가 버튼 " />
      <p>사진을 등록해주세요.</p>
    </Container>
  );
};

const Container = styled.button`
  width: 445px;
  height: 230px;
  background: ${({ theme }) => theme.colors.gray300};
  border: none;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
`;

export default AddImgButton;
