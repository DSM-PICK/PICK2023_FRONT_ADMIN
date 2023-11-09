import styled from "@emotion/styled";
import DropDown from "../common/Dropdown";
import { ItemType } from "@/models/common";
import { useState } from "react";
import { searchUser } from "@/utils/api/outing";
import { useQuery, useMutation } from "react-query";
import { useApiError } from "@/hooks/useApiError";
import { postIssuanceOuting } from "@/utils/api/selfStudy";
import { IssuanceOuting } from "@/models/selfStudy/request";
import { toast } from "react-hot-toast";
import { SearchedUserListType } from "@/models/outing/response";
import Image from "next/image";
import { deleteStudent } from "@/assets/ActivityAccept";

const outingPeriod: ItemType[] = [
  { option: "1교시", id: 1 },
  { option: "2교시", id: 2 },
  { option: "3교시", id: 3 },
  { option: "4교시", id: 4 },
  { option: "5교시", id: 5 },
  { option: "6교시", id: 6 },
  { option: "7교시", id: 7 },
  { option: "8교시", id: 8 },
  { option: "9교시", id: 9 },
  { option: "10교시", id: 10 },
];

interface OutingIssueModalProps {
  setIsOpenOutingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const OutingIssueModal = ({ setIsOpenOutingModal }: OutingIssueModalProps) => {
  const [startPeriod, setStartPeriod] = useState<ItemType>(outingPeriod[0]);
  const [endPeriod, setEndPeriod] = useState<ItemType>(outingPeriod[1]);
  const [name, setName] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [outingUserIdList, setOutingUserIdList] = useState<string[]>([]);
  const [outingUserList, setOutingUserList] = useState<string[]>([]);

  const { handleError } = useApiError();

  const { data: userList } = useQuery(["", name], () => searchUser(name), {
    onError: handleError,
    cacheTime: 0,
    enabled: name != "",
  });

  const issuanceOutingRequest: IssuanceOuting = {
    user_id_list: outingUserIdList,
    reason: reason,
    start_period: startPeriod.id,
    end_period: endPeriod.id,
  };

  const { mutate } = useMutation(postIssuanceOuting, {
    onError: handleError,
    onSuccess: () => {
      toast.success("외출증이 발급되었습니다.", { duration: 1000 });
      setIsOpenOutingModal(false);
    },
  });

  const pushUserIdList = () => {
    if (outingUserIdList.includes(id)) {
      toast.error("이미 추가된 학생입니다.", { duration: 1000 });
      return;
    }
    setOutingUserIdList((prevList) => [...prevList, id]);
    setOutingUserList((prevList) => [...prevList, name]);
    setName("");
  };

  const onSetId = (value: SearchedUserListType) => {
    setId(value.id);
    setName(value.num + " " + value.name);
  };

  const popUserIdList = (idx: number) => {
    const updatedOutingUserList = [...outingUserList];
    const updatedOutingUserIdList = [...outingUserIdList];
    updatedOutingUserList.splice(idx, 1);
    updatedOutingUserIdList.splice(idx, 1);
    setOutingUserList(updatedOutingUserList);
    setOutingUserIdList(updatedOutingUserIdList);
  };

  return (
    <ModalWrapper>
      <ModalBox>
        <DropDowns>
          <DropDown
            title={startPeriod.option}
            dropDownItem={outingPeriod}
            setResult={setStartPeriod}
          />
          <p>~</p>
          <DropDown
            title={endPeriod.option}
            dropDownItem={outingPeriod}
            setResult={setEndPeriod}
          />
        </DropDowns>
        <NameInputWrapper>
          <div>
            <NameSearchInput
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name != "" && !(userList?.length === 0) && (
              <SearchStudentList>
                {userList?.map((value: SearchedUserListType, idx: number) => (
                  <span key={idx} onClick={() => onSetId(value)}>
                    {value.num} {value.name}
                  </span>
                ))}
              </SearchStudentList>
            )}
            <AddButton onClick={pushUserIdList}>추가</AddButton>
          </div>
          <AddedList>
            {outingUserList.map((value, idx) => (
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
        </NameInputWrapper>
        <ReasonInput
          placeholder="외출 사유를 입력해주세요."
          onChange={(e) => setReason(e.target.value)}
        />
        <Btns>
          <CancelBtn onClick={() => setIsOpenOutingModal(false)}>
            취소
          </CancelBtn>
          <IssueBtn onClick={() => mutate(issuanceOutingRequest)}>
            발급하기
          </IssueBtn>
        </Btns>
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

const ModalBox = styled.div`
  width: 600px;
  height: 380px;
  cursor: auto;
  border: none;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  padding: 24px 44px;
  gap: 20px;
`;

const DropDowns = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  > p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const NameInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
  flex-direction: column;
  > div {
    display: flex;
    gap: 16px;
  }
`;

const NameSearchInput = styled.input`
  width: 280px;
  height: 40px;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  padding: 0px 32px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  :focus {
    outline: 1px solid ${({ theme }) => theme.colors.purple400};
    background: white;
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const AddButton = styled.button`
  width: 80px;
  height: 40px;
  color: ${({ theme }) => theme.colors.gray500};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray500};
  border-radius: 12px;
  background: white;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.purple400};
    border: 1px solid ${({ theme }) => theme.colors.purple400};
  }
`;

const ReasonInput = styled.textarea`
  width: 515px;
  height: 112px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 12px;
  padding: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  border: none;
  resize: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 15px;
`;

const CancelBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 12px;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.gray700};
  width: 288px;
  height: 60px;
  cursor: pointer;
`;

const IssueBtn = styled.button`
  background: ${({ theme }) => theme.colors.purple400};
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  border: none;
  width: 288px;
  height: 60px;
  border-radius: 12px;
  color: white;
  cursor: pointer;
`;

const SearchStudentList = styled.div`
  width: 280px;
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

export default OutingIssueModal;
