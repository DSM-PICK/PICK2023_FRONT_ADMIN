import styled from "@emotion/styled";
import ButtonComponent from "../common/button/ButtonComponent";
import { useState } from "react";
import ModalPage from "../common/modal";
import { css } from "@emotion/react";
import List from "./List";
import Image from "next/image";
import { Delete } from "../../assets/AfterSchool/index";

interface List {
  student_number: string;
  student_name: string;
}

const AfterSchool = () => {
  const StudentAdd = css`
    margin-top: 122px;
    font-weight: 400px;
    font-size: 14px;
    line-height: 24px;
    margin-left: 442px;
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
    :hover {
      color: #9650fa;
      border: 1px solid #9650fa;
      background-color: #ffffff;
    }
  `;
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [studentInfo, setStudentInfo] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleUpload = () => {
    setStudentInfo([...studentInfo, input]);
    setInput("");
  };

  const onClickStudentListDelete = (user_id: string) => {
    const isIncludes = studentInfo.includes(user_id);

    if (isIncludes) {
      setStudentInfo(studentInfo.filter((id: string) => id !== user_id));
    } else {
      setStudentInfo([...studentInfo, user_id]);
    }
  };

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
              <ListBox
                key={props.student_number}
                student_number={props.student_number}
                student_name={props.student_name}
              />
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
          <>
            <InputWrapper>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="이름 초성을 입력해주세요."
              />
              <ButtonComponent
                customStyle={AddBtn}
                size={["93px", "48px"]}
                fill={"ghost"}
                onClick={handleUpload}
              >
                추가
              </ButtonComponent>
            </InputWrapper>
            <AddStudentList>
              {studentInfo.map((user_id_list) => {
                return (
                  <Container key={user_id_list}>
                    <AddStudent>{user_id_list}</AddStudent>
                    <Image
                      src={Delete}
                      onClick={() => onClickStudentListDelete(user_id_list)}
                      alt="삭제"
                    />
                  </Container>
                );
              })}
            </AddStudentList>
          </>
        </ModalPage>
      )}
    </>
  );
};

const ListBox = ({ student_number, student_name }: List) => {
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
          {student_number} {student_name}
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
          mainText={`${student_number} ${student_name} 학생을\n방과후 자습에서 삭제하시겠습니까?`}
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
  margin-bottom: 16px;
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
  font-size: 40px;
  font-weight: 700;
`;

const LayerText = styled.div`
  font-size: 24px;
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

const AddStudentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 80px;
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px 8px 10px;
  width: 130px;
  height: 36px;
  text-align: center;
  border-radius: 8px;

  > img {
    cursor: pointer;
  }
`;
const AddStudent = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray600};
`;

export default AfterSchool;
