import PageContainer from "@/components/common/PageContainer";
import List from "@/components/personnelChange/List";
import { useApiError } from "@/hooks/useApiError";
import {
  getAfterSchoolMemberList,
  getLayerClassList,
} from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

const AfterSchoolPage = () => {
  const { handleError } = useApiError();
  const { data: classroom } = useQuery(
    "classroom",
    () => getLayerClassList(2, "AFTER_SCHOOL"),
    {
      onError: handleError,
    }
  );
  const { data: afterSchoolList, refetch } = useQuery(
    "after-school-id",
    () => getAfterSchoolMemberList(classroom?.classroom_list[0].type_id || ""),
    {
      enabled: !!classroom?.classroom_list[0].type_id,
      onError: handleError,
      cacheTime: 0,
    }
  );

  return (
    <PageContainer title="방과후 자습" subTitle="2층 창조실">
      <ListBox>
        {afterSchoolList?.data.after_school_user_list.map((item) => (
          <List
            after_school_id={classroom?.classroom_list[0].type_id || ""}
            key={item.student_id}
            student_id={item.student_id}
            student_name={item.student_name}
            student_number={item.student_number}
            refetch={refetch}
          />
        ))}
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

export default AfterSchoolPage;
