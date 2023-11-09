import { useMutation, useQuery } from "react-query";
import Image from "next/image";
import { deleteStudent } from "@/assets/ActivityAccept";
import { useState } from "react";
import { searchUser } from "@/utils/api/outing";
import { SearchedUserListType } from "@/models/outing/response";
import { toast } from "react-hot-toast";
import { addAfterSchoolStudent } from "@/utils/api/changePerson";
import { useApiError } from "@/hooks/useApiError";
import { getLayerClassList } from "@/utils/api/selfStudy";
import styled from "@emotion/styled";

interface ModalProps {
  setIsActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setIsActiveModal }: ModalProps) => {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [afterSchoolUserIdList, setAfterSchoolUserIdList] = useState<string[]>(
    []
  );
  const [afterSchoolUserList, setAfterSchoolUserList] = useState<string[]>([]);

  const { handleError } = useApiError();

  const { data: userList } = useQuery([name], () => searchUser(name), {
    onError: handleError,
    cacheTime: 0,
    enabled: name != "",
  });

  const { data: classroom } = useQuery(
    "classroom",
    () => getLayerClassList(2, "AFTER_SCHOOL"),
    {
      onError: handleError,
    }
  );

  const addAfterSchoolStudentRequest = {
    after_school_id: classroom?.classroom_list[0]?.type_id || "",
    user_id_list: afterSchoolUserIdList,
  };

  const { mutate } = useMutation(addAfterSchoolStudent, {
    onError: handleError,
    onSuccess: () => {
      toast.success("학생이 추가되었습니다.", { duration: 1000 });
      setIsActiveModal(false);
    },
  });

  const onSetId = (value: SearchedUserListType) => {
    setId(value.id);
    setName(value.num + " " + value.name);
  };

  const pushUserIdList = () => {
    if (afterSchoolUserIdList.includes(id)) {
      toast.error("이미 추가된 학생입니다.", { duration: 1000 });
      return;
    }
    setAfterSchoolUserList((prevList) => [...prevList, name]);
    setAfterSchoolUserIdList((prevList) => [...prevList, id]);
    setName("");
  };

  const popUserIdList = (idx: number) => {
    const updatedAfterSchoolUserList = [...afterSchoolUserList];
    const updatedAfterSchoolUserIdList = [...afterSchoolUserIdList];
    updatedAfterSchoolUserList.splice(idx, 1);
    updatedAfterSchoolUserIdList.splice(idx, 1);
    setAfterSchoolUserList(updatedAfterSchoolUserList);
    setAfterSchoolUserIdList(updatedAfterSchoolUserIdList);
  };

  return (
    <Background>
      <Container>
        <NameInput>
          <Input
            placeholder="이름을 입력해주세요."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <AddButton onClick={pushUserIdList}>추가</AddButton>
          {name != "" && !(userList?.length === 0) && (
            <SearchStudentList>
              {userList?.map((value: SearchedUserListType, idx: number) => (
                <span key={idx} onClick={() => onSetId(value)}>
                  {value.num} {value.name}
                </span>
              ))}
            </SearchStudentList>
          )}
        </NameInput>
        <AddedList>
          {afterSchoolUserList.map((value, idx) => (
            <span key={idx}>
              {value}{" "}
              <Image
                width={10}
                height={10}
                src={deleteStudent}
                alt=""
                onClick={() => popUserIdList(idx)}
              />
            </span>
          ))}
        </AddedList>
        <Btns>
          <CancelBtn onClick={() => setIsActiveModal(false)}>
            취소하기
          </CancelBtn>
          <AddBtn onClick={() => mutate(addAfterSchoolStudentRequest)}>
            추가하기
          </AddBtn>
        </Btns>
      </Container>
    </Background>
  );
};

const Background = styled.div`
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

const Container = styled.div`
  width: 600px;
  height: 380px;
  background: white;
  border-radius: 16px;
  cursor: auto;
  padding: 54px 45px 28px 45px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

const NameInput = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
`;

const Input = styled.input`
  width: 433px;
  height: 40px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 0 32px;
  border-radius: 12px;
  :focus {
    outline: 1px solid ${({ theme }) => theme.colors.purple400};
    background: white;
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const AddButton = styled.button`
  width: 93px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: white;
  border-radius: 12px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray300};
  cursor: pointer;
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.purple400};
    color: ${({ theme }) => theme.colors.purple400};
  }
`;

const AddedList = styled.div`
  display: flex;
  gap: 8px;
  width: 515px;
  overflow-x: scroll;
  > span {
    min-width: 127px;
    height: 36px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.gray600};
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    gap: 14px;
    cursor: pointer;
  }
`;

const SearchStudentList = styled.div`
  width: 410px;
  box-shadow: 0px 2px 8px ${({ theme }) => theme.colors.black};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray900};
  gap: 16px;
  background: white;
  position: absolute;
  top: 60px;
  max-height: 140px;
  overflow-x: scroll;
  cursor: pointer;
  > span {
    cursor: pointer;
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  top: 280px;
`;

const CancelBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 12px;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.gray700};
  width: 250px;
  height: 60px;
  cursor: pointer;
`;

const AddBtn = styled.button`
  background: ${({ theme }) => theme.colors.purple400};
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  border: none;
  width: 250px;
  height: 60px;
  border-radius: 12px;
  color: white;
  cursor: pointer;
`;

export default Modal;
