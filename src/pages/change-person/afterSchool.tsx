import NoData from "@/components/common/Nodata";
import PageContainer from "@/components/common/PageContainer";
import List from "@/components/personnelChange/List";
import { useApiError } from "@/hooks/useApiError";
import {
  getAfterSchoolMemberList,
  getLayerClassList,
} from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { useState } from "react";
import Modal from "@/components/afterSchool/Modal";
import { useQuery } from "react-query";

const AfterSchoolPage = () => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  const { handleError } = useApiError();
  const { data: classroom, isSuccess: isSuccessClassRoom } = useQuery(
    "classroom",
    () => getLayerClassList(2, "AFTER_SCHOOL"),
    {
      onError: handleError,
    }
  );
  const {
    data: afterSchoolList,
    isSuccess: isSuccessAfterSchool,
    refetch,
  } = useQuery(
    "after-school-id",
    () => getAfterSchoolMemberList(classroom?.classroom_list[0]?.type_id || ""),
    {
      enabled: !!classroom?.classroom_list[0]?.type_id,
      onError: handleError,
      cacheTime: 0,
    }
  );

  return (
    <PageContainer
      title="방과후 자습"
      subTitle="2층 창조실"
      filter={<Box onClick={() => setIsActiveModal(true)}>인원추가하기</Box>}
    >
      <ListBox>
        {isSuccessClassRoom &&
        isSuccessAfterSchool &&
        afterSchoolList?.data.after_school_user_list.length ? (
          afterSchoolList?.data.after_school_user_list.map((item) => (
            <List
              after_school_id={classroom.classroom_list[0].type_id || ""}
              key={item.student_id}
              student_id={item.student_id}
              student_name={item.student_name}
              student_number={item.student_number}
              refetch={refetch}
            />
          ))
        ) : (
          <NoData />
        )}
        {isActiveModal && <Modal setIsActiveModal={setIsActiveModal} />}
      </ListBox>
    </PageContainer>
  );
};

const ListBox = styled.div`
  height: 100%;
  overflow-y: scroll;
  display: grid;
  gap: 16px 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 60px);
`;

const Box = styled.div`
  width: 147px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray300};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.purple400};
    border: 1px solid ${({ theme }) => theme.colors.purple400};
  }
`;

export default AfterSchoolPage;
