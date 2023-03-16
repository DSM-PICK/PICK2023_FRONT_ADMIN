import PageContainer from "@/components/common/PageContainer";
import Outing from "@/components/OutList/outing";
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
          {isSuccess &&
            data.data.outing.map((item) => {
              return (
                <Outing
                  student_id={item.student_id}
                  student_name={item.student_name}
                  student_number={item.student_number}
                  end_time={item.end_time}
                  refetch={refetch}
                />
              );
            })}
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

export default OutListPage;
