import EditButton from "@/components/changePersonClass/EditButton";
import StudentList from "@/components/changePersonClass/StudentList";
import DropDown from "@/components/common/Dropdown";
import Modal from "@/components/common/Modal";
import PageContainer from "@/components/common/PageContainer";
import { ItemType } from "@/models/common";
import {
  getClassPersonStatus,
  patchClassPersonStatus,
} from "@/utils/api/changePerson";
import { media } from "@/utils/functions/media";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

interface SelectedProps {
  grade: number;
  class: number;
}

interface StudentType {
  student_id: string;
  student_number: number;
  student_name: string;
  status: string;
}

interface ChangeStudentType {
  user_id: string;
  status: string;
}

const ChangeClass = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStates, setSelectedStates] = useState<SelectedProps>({
    grade: 3,
    class: 2,
  });
  const [changedState, setChangedState] = useState<ChangeStudentType[]>([]);
  const { mutate, data: patchData } = useMutation(
    "patch-student-in-class",
    (user_list: ChangeStudentType[]) => patchClassPersonStatus(user_list)
  );
  const { data, isSuccess } = useQuery(
    ["get-student-in-class", selectedStates, patchData],
    () => getClassPersonStatus(selectedStates.grade, selectedStates.class)
  );

  if (!isSuccess) return <></>;

  const studentList = data.student_list;
  const teacher = data.teacher_name;
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

  const onChange = (changedValue: string, value: StudentType) => {
    const student = studentList.find(
      //해당 학생 객체
      (x) => x.student_id == value.student_id
    );

    if (changedValue != student?.status) {
      //해당 학생의 상태가 변경 전과 다른가? 그럼 저장해.
      const newValue: ChangeStudentType[] = [
        ...changedState.filter((x) => x.user_id != value.student_id),
        {
          user_id: value.student_id,
          status: changedValue,
        },
      ];
      setChangedState(newValue);
    } //아니면 없애
    else {
      const newValue: ChangeStudentType[] = [
        ...changedState.filter((x) => x.user_id != value.student_id),
      ];
      setChangedState(newValue);
    }
  };

  const firstStudent = changedState.length
    ? studentList.find((x) => x.student_id == changedState[0].user_id)
    : null;

  const filter: JSX.Element = (
    <>
      <EditButton
        size={[148, 48]}
        defaultColor={buttonColor}
        hoverColor={buttonHoverColor}
        onClick={() => {
          if (isEditing && changedState.length) {
            setOpenModal(true);
          } else {
            setIsEditing(!isEditing);
          }
        }}
        content={isEditing ? "상태 저장하기" : "상태 수정하기"}
      />
      <DropDown
        title="학년"
        dropDownItem={grades}
        setResult={(item) => {
          const tempItem = item as ItemType;
          setSelectedStates({
            ...selectedStates,
            grade: Number(tempItem.id) + 1,
          });
        }}
      />
      <DropDown
        title="반"
        dropDownItem={classes}
        setResult={(item) => {
          const tempItem = item as ItemType;
          setSelectedStates({
            ...selectedStates,
            class: Number(tempItem.id) + 1,
          });
        }}
      />
    </>
  );

  return (
    <>
      {openModal && firstStudent && (
        <Modal
          mainText={
            firstStudent.student_number +
            " " +
            firstStudent.student_name +
            `${
              changedState.length > 1
                ? " 외 " + (changedState.length - 1) + "명"
                : ""
            }` +
            "의\n변경된 상태를 저장하시겠습니까?"
          }
          subText={
            "학생의 상태를 자퇴로 변경했을 때에는\n학생 목록에서 삭제됩니다. 다시 한 번 확인해주세요."
          }
          btnText="저장하기"
          isDanger={false}
          callBack={() => {
            setIsEditing(false);
            mutate(changedState);
          }}
          setOpenModal={setOpenModal}
        />
      )}
      <PageContainer
        title={`${selectedStates.grade}학년 ${selectedStates.class}반`}
        subTitle={`담임 ${teacher} 선생님`}
        filter={filter}
      >
        <Container>
          {isSuccess &&
            studentList.map((value) => {
              return (
                <StudentList
                  studentID={value.student_id}
                  status="ATTENDANCE"
                  isEditing={isEditing}
                  onChange={(changedValue) => onChange(changedValue, value)}
                  text={`${value.student_number} ${value.student_name}`}
                />
              );
            })}
        </Container>
      </PageContainer>
    </>
  );
};

export default ChangeClass;

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
