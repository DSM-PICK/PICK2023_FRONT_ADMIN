import styled from "@emotion/styled";
import DropDown from "../common/dropDown";
import { useState, useEffect } from "react";
import { ItemType } from "@/models/common";
import ButtonComponent from "../common/button/ButtonComponent";
import { useMutation, useQuery } from "react-query";
import { getTeachersList } from "@/utils/api/common";
import { patchSelfStudyTeacher } from "@/utils/api/selfStudy";

interface Props {
  floor: number;
  date: {
    month: number;
    day: number;
  };
  teacher: string;
  setToggle: (state: boolean) => void;
  refetch: () => void;
}

const ChangeTeacherModal = ({
  date,
  floor,
  setToggle,
  refetch,
  teacher,
}: Props) => {
  const [selectedFloor, setFloor] = useState<ItemType>({
    id: floor,
    option: floor + 1 + "층",
  });
  const [selectedTeacher, setTeacher] = useState<ItemType>({
    id: 0,
    option: teacher,
  });
  const { data, isSuccess } = useQuery(["get-teachers-list"], () =>
    getTeachersList()
  );
  const { mutate } = useMutation(
    ["patch-teachers-list", selectedTeacher.id, selectedFloor.id],
    () => {
      const request = {
        teacher_id: selectedTeacher.id.toString(),
        floor: Number(selectedFloor.id) + 1,
        date: `${new Date().getFullYear()}-${date.month
          .toString()
          .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`,
      };
      return patchSelfStudyTeacher(request);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  useEffect(() => {
    const id = data?.teachers.find((value) => value.name == teacher)?.id;
    setTeacher({
      id: id ? id : 0,
      option: teacher,
    });
  }, [isSuccess]);

  if (!data) return <></>;

  const teacherItem: ItemType[] = data.teachers.map((value, index) => {
    return {
      id: value.id,
      option: value.name,
    };
  });

  const clickConfirmButton = () => {
    mutate();
    setToggle(false);
  };

  return (
    <Wrapper onClick={() => setToggle(false)}>
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          {date.month}월 {date.day}일
        </Title>
        <DropDown
          setResult={setFloor}
          title={selectedFloor.option}
          dropDownItem={[
            { id: 1, option: "2층" },
            { id: 2, option: "3층" },
            { id: 3, option: "4층" },
          ]}
        />
        <StyledDropDown
          setResult={setTeacher}
          title={selectedTeacher.option}
          dropDownItem={teacherItem}
        />
        <div id="buttons">
          <ButtonComponent
            fill="default"
            size={["288px", "52px"]}
            disabled={false}
            onClick={() => {
              setToggle(false);
            }}
          >
            취소
          </ButtonComponent>
          <ButtonComponent
            fill={"purple"}
            size={["288px", "52px"]}
            disabled={!selectedTeacher.id}
            onClick={() => clickConfirmButton()}
          >
            변경하기
          </ButtonComponent>
        </div>
      </Box>
    </Wrapper>
  );
};

export default ChangeTeacherModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: rgba(33, 33, 33, 0.3);
`;

const Box = styled.div`
  width: 680px;
  height: 380px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 49px 45px 28px 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  position: relative;
  > #buttons {
    width: calc(100% - 90px);
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 28px;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.black};
`;

const StyledDropDown = styled(DropDown)`
  width: 100%;
  > button,
  div {
    width: 100%;
    text-align: start;
  }
`;
