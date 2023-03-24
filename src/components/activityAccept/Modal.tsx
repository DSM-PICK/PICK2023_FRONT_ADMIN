import styled from "@emotion/styled";
import DropDown from "../common/Dropdown";
import { ItemType } from "@/models/common";
import { useEffect, useState } from "react";
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
  { option: "8교시", id: 8 },
  { option: "9교시", id: 9 },
  { option: "10교시", id: 10 },
];

interface OutingIssueModalProps {
  setIsOpenOutingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const OutingIssueModal = ({ setIsOpenOutingModal }: OutingIssueModalProps) => {
  // 초기 상태값 설정
  const [startPeriod, setStartPeriod] = useState<ItemType>({
    option: "8교시",
    id: 8,
  });
  const [endPeriod, setEndPeriod] = useState<ItemType>({
    option: "10교시",
    id: 10,
  });
  const [name, setName] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [outingUserIdList, setOutingUserIdList] = useState<string[]>([]);
  const [outingUserList, setOutingUserList] = useState<string[]>([]);

  // API 에러 핸들링 함수 가져오기
  const { handleError } = useApiError();

  // 유저 리스트 가져오기
  const { data: userList } = useQuery(
    ["classList", name],
    () => searchUser(name),
    {
      onError: handleError,
      cacheTime: 0,
      enabled: name != "",
    }
  );

  // 외출증 발급 요청 데이터
  const issuanceOutingRequest: IssuanceOuting = {
    user_id_list: outingUserIdList,
    reason: reason,
    start_period: startPeriod.id,
    end_period: endPeriod.id,
  };

  // 외출증 발급 요청 API 호출 함수
  const { mutate } = useMutation(postIssuanceOuting, {
    onError: handleError,
    onSuccess: () => {
      toast.success("외출증이 발급되었습니다.", { duration: 1000 });
      setIsOpenOutingModal(false);
    },
  });

  // 외출 유저 리스트에 추가하는 함수
  const pushUserIdList = () => {
    setOutingUserIdList((prevList) => [...prevList, id]);
    setOutingUserList((prevList) => [...prevList, name]);
    setName("");
  };

  // 유저 id 설정 함수
  const onSetId = (value: SearchedUserListType) => {
    setId(value.id);
    setName(value.num + " " + value.name);
  };

  // 외출 유저 리스트에서 제거하는 함수
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
              placeholder="이름을 검색해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name != "" && !(userList?.data.length === 0) && (
              <SearchStudentList>
                {userList?.data.map(
                  (value: SearchedUserListType, idx: number) => (
                    <span key={idx} onClick={() => onSetId(value)}>
                      {value.num} {value.name}
                    </span>
                  )
                )}
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
          onChange={(e: any) => setReason(e.target.value)}
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
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const AddButton = styled.button`
  width: 80px;
  height: 40px;
  color: ${({ theme }) => theme.colors.gray300};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;
  background: white;
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
`;

const IssueBtn = styled.button`
  background: ${({ theme }) => theme.colors.purple50};
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  border: none;
  width: 288px;
  height: 60px;
  border-radius: 12px;
  color: white;
  :hover {
    background: ${({ theme }) => theme.colors.purple400};
  }
`;

const SearchStudentList = styled.div`
  width: 277px;
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
  }
`;

export default OutingIssueModal;
