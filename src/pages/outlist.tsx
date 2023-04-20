import NoData from "@/components/common/Nodata";
import PageContainer from "@/components/common/PageContainer";
import List from "@/components/outlist/List";
import { useApiError } from "@/hooks/useApiError";
import { getOutingStudentList } from "@/utils/api/outing";
import { todayDate } from "@/utils/functions/todayDate";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

const OutListPage = () => {
  const { handleError } = useApiError();
  const { data, isSuccess, refetch } = useQuery(
    "outing-students-list",
    () => getOutingStudentList(),
    {
      onError: handleError,
      cacheTime: 0,
    }
  );

  return (
    <>
      <PageContainer title="외출자 목록" subTitle={todayDate()}>
        <ListBox>
          {isSuccess && data.outing.length ? (
            data.outing.map((item) => {
              return (
                <List
                  student_id={item.student_id}
                  student_name={item.student_name}
                  student_number={item.student_number}
                  end_time={item.end_time}
                  refetch={refetch}
                />
              );
            })
          ) : (
            <NoData />
          )}
        </ListBox>
      </PageContainer>
    </>
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

// 앱 쪽에서 신청 추가 되기 전까지 임시 방편
const OutingLockContainer = styled.div`
  margin: auto;
  display: flex;
  justify-items: center;
  align-items: center;

  > p {
    font-size: 28px;
  }
`;

export default OutListPage;
