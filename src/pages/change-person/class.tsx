import EditButton from "@/components/changePersonClass/EditButton";
import StudentList from "@/components/changePersonClass/StudentList";
import DropDown from "@/components/common/dropDown";
import ModalPage from "@/components/common/modal";
import { ItemType } from "@/models/common";
import { media } from "@/utils/media";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

const ChangeClass = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const teacher = "신요셉";
  const grades: ItemType[] = [
    { id: 0, option: "1학년" },
    { id: 1, option: "2학년" },
    { id: 2, option: "3학년" },
  ];
  const classes: ItemType[] = [
    { id: 0, option: "1반" },
    { id: 1, option: "2반" },
    { id: 2, option: "3반" },
    { id: 3, option: "4반" },
  ];

  const buttonColor = {
    border: theme.colors.gray300,
    text: theme.colors.gray300,
  };
  const buttonHoverColor = {
    border: theme.colors.purple500,
    text: theme.colors.purple500,
  };

  return (
    <>
      {openModal && (
        <ModalPage
          mainText={"" + "의\n변경된 상태를 저장하시겠습니까?"}
          subText={
            "학생의 상태를 자퇴로 변경했을 때에는\n학생 목록에서 삭제됩니다. 다시 한 번 확인해주세요."
          }
          btnText="저장하기"
          isDanger={false}
          callBack={() => {
            setIsEditing(false);
          }}
          setOpenModal={setOpenModal}
        />
      )}
      <Wrapper>
        <Header>
          <Title>
            <MainTitle>
              {2}학년 {2}반
            </MainTitle>
            <SubTitle>담임 {teacher} 선생님</SubTitle>
          </Title>
          <Filter>
            <EditButton
              size={[120, 40]}
              color={buttonColor}
              hoverColor={buttonHoverColor}
              onClick={() => {
                if (isEditing) {
                  setOpenModal(true);
                } else {
                  setIsEditing(!isEditing);
                }
              }}
              content={isEditing ? "상태 저장하기" : "상태 수정하기"}
            />
            <StyledDropDown
              title="학년"
              dropDownItem={grades}
              setResult={() => {}}
            />
            <StyledDropDown
              title="반"
              dropDownItem={classes}
              setResult={() => {}}
            />
          </Filter>
        </Header>
        <Container>
          <StudentList
            status="귀가"
            isEditing
            onChange={() => {}}
            text="1234 이경수"
          />
          <StudentList
            status="귀가"
            isEditing
            onChange={() => {}}
            text="1234 이경수"
          />
          <StudentList
            status="귀가"
            isEditing
            onChange={() => {}}
            text="1234 이경수"
          />
          <StudentList
            status="귀가"
            isEditing
            onChange={() => {}}
            text="1234 이경수"
          />
          <StudentList
            status="귀가"
            isEditing
            onChange={() => {}}
            text="1234 이경수"
          />
          <StudentList
            status="귀가"
            isEditing
            onChange={() => {}}
            text="1234 이경수"
          />
          <StudentList
            status="귀가"
            isEditing
            onChange={() => {}}
            text="1234 이경수"
          />
        </Container>
      </Wrapper>
    </>
  );
};

export default ChangeClass;

const Wrapper = styled.div`
  width: calc(85% - 300px);
  height: 80vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.header`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  align-items: end;
  gap: 24px;
`;

const MainTitle = styled.p`
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.gray900};
`;
const SubTitle = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 4px;
`;
const Filter = styled.div`
  display: flex;
  gap: 24px;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  min-height: 500px;
  border-radius: 16px;
  flex: 1;
  gap: 20px 30px;
  padding: 24px 20px;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(auto, 10.1%));
  ${media(1000)} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${media(1200)} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${media(1600)} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  ${media(1800)} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const StyledDropDown = styled(DropDown)`
  > button {
    width: 120px;
    height: 40px;
  }
  > div {
    width: 120px;
  }
`;
