import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "../common/button/ButtonComponent";
import { css } from "@emotion/react";

interface Props {
  img: string;
  btnText: string;
  link: string;
  text: () => void;
}

const Card = ({ img, btnText, link, text }: Props) => {
  const BtnsStyles = css`
    font-weight: "500";
    font-size: "20px";
    line-height: "28px";
  `;

  return (
    <BtnContainer>
      <MainBtns>
        <>
          {text()}
          <Image src={img} alt="img" />
          <Link href={`${link}`}>
            <ButtonComponent
              customStyle={BtnsStyles}
              fill="purple"
              size={["280px", "54px"]}
            >
              {btnText}
            </ButtonComponent>
          </Link>
        </>
      </MainBtns>
    </BtnContainer>
  );
};

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainBtns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  border-radius: 16px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.gray50};
  > p {
    font-size: 22px;
    line-height: 26px;
    > i {
      color: ${({ theme }) => theme.colors.purple400};
    }
  }
  > img {
    margin: 32px 0 44px;
  }
`;

export default Card;
