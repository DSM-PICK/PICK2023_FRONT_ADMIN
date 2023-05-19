import styled from "@emotion/styled";
import DropDown from "../common/Dropdown";
import { useState, useEffect } from "react";
import { ItemType } from "@/models/common";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTeachersList } from "@/utils/api/common";
import {
  addSelfStudyTeacher,
  patchSelfStudyTeacher,
} from "@/utils/api/selfStudy";
import Button from "../common/Button";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-hot-toast";

interface Props {
  floor: number;
  date: {
    month: number;
    day: number;
  };
  teacher: string;
  setToggle: (state: boolean) => void;
  refetch: () => void;
  isAdd?: boolean;
}

const ChangeTeacherModal = ({
  date,
  floor,
  setToggle,
  refetch,
  teacher,
  isAdd,
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
  const { handleError } = useApiError();

  const { mutate: editTeacher } = useMutation(
    ["patch-teachers-list", selectedTeacher.id, selectedFloor.id],
    () => {
      const request = {
        teacher_id: selectedTeacher.id.toString(),
        floor: Number(selectedFloor.id),
        date: `${new Date().getFullYear()}-${date.month
          .toString()
          .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`,
      };
      return patchSelfStudyTeacher(request);
    },
    {
      onSuccess: () => {
        refetch();
        toast.success("자습감독선생님이 변경되었습니다.", { duration: 1000 });
      },
      onError: handleError,
    }
  );

  const { mutate: addTeacher } = useMutation(
    ["add-teacher", selectedTeacher.id, selectedFloor.id],
    () => {
      const request = {
        teacher_id: selectedTeacher.id.toString(),
        floor: Number(selectedFloor.id),
        date: `${new Date().getFullYear()}-${date.month
          .toString()
          .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`,
      };
      return addSelfStudyTeacher(request);
    },
    {
      onSuccess: () => {
        refetch();
        toast.success("자습감독선생님이 추가되었습니다.", { duration: 1000 });
      },
      onError: handleError,
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

  const teacherItem: ItemType[] = data.teachers.map((value) => {
    return {
      id: value.id,
      option: value.name,
    };
  });

  const clickConfirmButton = () => {
    if (isAdd) {
      addTeacher();
      setToggle(false);
    } else {
      editTeacher();
      setToggle(false);
    }
  };

  const floorDropDownItem = [
    {
      id: 2,
      option: "2층",
    },
    {
      id: 3,
      option: "3층",
    },
    {
      id: 4,
      option: "4층",
    },
  ];

  return (
    <Wrapper>
      <Box>
        <Title>
          {date.month}월 {date.day}일
        </Title>
        <DropDown
          setResult={setFloor}
          title="층"
          dropDownItem={floorDropDownItem}
        />
        <StyledDropDown
          setResult={setTeacher}
          title={selectedTeacher.option}
          dropDownItem={teacherItem}
        />
        <div id="buttons">
          <Button
            fill="default"
            size={["288px", "52px"]}
            disabled={false}
            onClick={() => {
              setToggle(false);
            }}
          >
            취소
          </Button>
          <Button
            fill={"purple"}
            size={["288px", "52px"]}
            disabled={!selectedTeacher.id}
            onClick={() => clickConfirmButton()}
          >
            {isAdd ? "추가하기" : "변경하기"}
          </Button>
        </div>
      </Box>
    </Wrapper>
  );
};

export default ChangeTeacherModal;

const Wrapper = styled.div`
  cursor: default;
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
