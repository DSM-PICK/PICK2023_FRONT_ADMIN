import Outing from "@/components/outList/outing";
import { todayDate } from "@/utils/functions/todayDate";
import styled from "@emotion/styled";

interface Props {
  outing: {
    student_id: string;
    student_number: string;
    student_name: string;
    end_time: string;
  }[];
}

const OutListPage = () => {
  return (
    <OutListContainer>
      <TitleBox>
        <h1>외출자 목록</h1>
        <p>{todayDate()}</p>
      </TitleBox>
      <ListBox>
        {/* TODO. API 연결 후 주석 제거 */}
        {/* {outing.map((item) => {
            return (
              <Outing
                student_id={item.student_id}
                student_name={item.student_name}
                student_number={item.student_number}
                end_time={item.end_time}
              />
            );
          })} */}

        <div>
          <Outing
            student_id="UUID"
            student_name="추혜연"
            student_number="1111"
            end_time="10:30:00"
          />
          <Outing
            student_id="UUID"
            student_name="추혜연"
            student_number="1111"
            end_time="10:30:00"
          />
          <Outing
            student_id="UUID"
            student_name="추혜연"
            student_number="1111"
            end_time="10:30:00"
          />
          <Outing
            student_id="UUID"
            student_name="추혜연"
            student_number="1111"
            end_time="10:30:00"
          />
          <Outing
            student_id="UUID"
            student_name="추혜연"
            student_number="1111"
            end_time="10:30:00"
          />
        </div>
      </ListBox>
    </OutListContainer>
  );
};

const OutListContainer = styled.div`
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

export default OutListPage;