import styled from "@emotion/styled";
import ButtonComponent from "../common/button/ButtonComponent";
import { useState } from "react";
import ModalPage from "../common/modal";
import { css } from "@emotion/react";

interface List {
  학번: string;
  이름: string;
}

const AfterSchool = () => {
  const StudentAdd = css`
    margin-top: 122px;
    font-weight: 400px;
    font-size: 14px;
    line-height: 24px;
    margin-left: 507px;
    color: #dbd7e0;
    :hover {
      color: #9650fa;
      border: 1px solid #9650fa;
      background-color: #ffffff;
    }
  `;

  const AddBtn = css`
    font-weight: 400px;
    font-size: 20px;
    line-height: 24px;
    color: #dbd7e0;
  `;

  const List = [
    {
      학번: "2120",
      이름: "추혜연",
    },
    {
      학번: "2419",
      이름: "하혜령",
    },
    {
      학번: "2106",
      이름: "김의찬",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: " 2218",
      이름: "정대현",
    },
    {
      학번: " 2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
    {
      학번: "2218",
      이름: "정대현",
    },
  ];

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>방과후 자습</Title>
          <LayerText>2층 창조실</LayerText>
          <ButtonComponent
            fill="ghost"
            size={["137px;", "30px"]}
            customStyle={StudentAdd}
            onClick={() => setOpenModal(true)}
          >
            인원 추가하기
          </ButtonComponent>
        </TitleContainer>
        <ListContainer>
          <div>
            {List.map((props) => (
              <ListBox 학번={props.학번} 이름={props.이름} />
            ))}
          </div>
        </ListContainer>
      </Wrapper>
      {isOpenModal && (
        <ModalPage
          setOpenModal={setOpenModal}
          isDanger={false}
          btnText="추가하기"
          callBack={() => {}}
        >
          <InputWrapper>
            <Input placeholder="이름 초성을 입력해주세요."></Input>
            <ButtonComponent
              customStyle={AddBtn}
              size={["93px", "48px"]}
              fill={"ghost"}
            >
              추가
            </ButtonComponent>
          </InputWrapper>
        </ModalPage>
      )}
    </>
  );
};

const ListBox = ({ 학번, 이름 }: List) => {
  const StudentDelete = css`
    font-weight: 500px;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
  `;

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <BoxWrapper>
        <Student>
          {학번} {이름}
        </Student>
        <ButtonComponent
          onClick={() => setOpenModal(true)}
          customStyle={StudentDelete}
          fill="purple"
          size={["70px", "30px"]}
        >
          삭제
        </ButtonComponent>
      </BoxWrapper>
      {isOpenModal && (
        <ModalPage
          setOpenModal={setOpenModal}
          isDanger={true}
          btnText="삭제하기"
          mainText={`${학번} ${이름} 학생을\n방과후 자습에서 삭제하시겠습니까?`}
          subText={
            "삭제하기 선택 이후에는 취소할 수 없습니다.\n다시 한번 확인해주세요."
          }
          callBack={() => {}}
        />
      )}
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
`;
const Input = styled.input`
  width: 400px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-color: ${({ theme }) => theme.colors.gray300};
  margin-bottom: 190px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 12px 0 12px 32px;
  :focus {
    outline: 1px solid ${({ theme }) => theme.colors.purple400};
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-weight: 400;
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  padding-left: 120px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: end;
  height: 100px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const LayerText = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
  margin-left: 20px;
`;

const ListContainer = styled.div`
  width: 900px;
  height: 550px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 44px 24px;
  box-sizing: border-box;
  margin-top: 20px;
  display: grid;
  > div {
    height: 100%;
    overflow-y: scroll;
    display: grid;
    gap: 16px 20px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, 60px);
  }
`;
const BoxWrapper = styled.div`
  width: 260px;
  height: 50px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const Student = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  margin-left: 3px;
`;

export default AfterSchool;
