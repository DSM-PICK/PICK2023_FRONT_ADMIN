import List from "@/components/personnelChange/List";
import {
  getAfterSchoolMemberList,
  getLayerClassList,
} from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

const AfterSchoolPage = () => {
  const { data: classroom } = useQuery("classroom", () =>
    getLayerClassList(2, "AFTER_SCHOOL")
  );
  const { data: afterSchoolList, refetch } = useQuery(
    "after-school-id",
    () => getAfterSchoolMemberList(classroom?.classroom_list[0].type_id || ""),
    {
      enabled: !!classroom?.classroom_list[0].type_id,
    }
  );

  return (
    <AfterSchoolContainer>
      <TitleBox>
        <h1>방과후 자습</h1>
        <p>2층 창조실</p>
      </TitleBox>
      <ListBox>
        <div>
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
        </div>
      </ListBox>
    </AfterSchoolContainer>
  );
};

const AfterSchoolContainer = styled.div`
  margin: auto;
`;

const TitleBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: end;
  gap: 24px;
  > h1 {
    font-size: 32px;
    font-weight: 700;
  }
  > p {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const ListBox = styled.div`
  width: 70vw;
  height: 600px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  border: solid ${({ theme }) => theme.colors.gray50};
  border-width: 32px 28px;
  > div {
    height: 100%;
    overflow-y: scroll;
    display: grid;
    gap: 16px 20px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, 60px);
  }
`;

export default AfterSchoolPage;
