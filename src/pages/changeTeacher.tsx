import CalendarArrowIcon from "@/assets/changeTeacher";
import TeacherCalendar from "@/components/changeTeacher/calendar";
import Title from "@/components/common/Title";
import { getSelfStudyTeacherList } from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { useState, useEffect, useCallback } from "react";
import { useQueries } from "react-query";

export interface TeacherType {
  type: string;
  teacher: string[];
}

export interface DataType {
  past: Map<string, TeacherType>;
  present: Map<string, TeacherType>;
  future: Map<string, TeacherType>;
}

const ChangeTeacherPage = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [dataMap, setDataMap] = useState<DataType>({
    future: new Map(),
    past: new Map(),
    present: new Map(),
  });
  const data = useQueries([
    {
      queryKey: [month, "past"],
      queryFn: () => getSelfStudyTeacherList(month - 1),
    },
    {
      queryKey: [month, "present"],
      queryFn: () => getSelfStudyTeacherList(month),
    },
    {
      queryKey: [month, "future"],
      queryFn: () => getSelfStudyTeacherList(month + 1),
    },
  ]);

  const [past, present, future] = data;

  const refetchAll = useCallback(() => {
    data.forEach((result) => result.refetch());
  }, [data]);

  useEffect(() => {
    const tempMap = new Map<string, any>();
    let result: DataType = {
      past: new Map<string, TeacherType>(),
      present: new Map<string, TeacherType>(),
      future: new Map<string, TeacherType>(),
    };
    data.forEach((eachData, index) => {
      if (eachData.data) {
        eachData.data.self_study_list.map((value) => {
          const { date, ...otherValue } = value;
          tempMap.set(date, otherValue);
        });
        switch (index) {
          case 0: {
            //past
            result.past = new Map(tempMap);
            break;
          }
          case 1: {
            //present
            result.present = new Map(tempMap);
            break;
          }
          case 2: {
            //future
            result.future = new Map(tempMap);
            break;
          }
        }
        tempMap.clear();
      }
    });
    setDataMap(result);
  }, [month, past.data, present.data, future.data]);

  return (
    <Wrapper>
      <Header>
        <Title title="자습감독 선생님 변경" />
        <DateDial>
          <CalendarArrowIcon
            direction={0}
            onClick={() => setMonth(month < 2 ? month : month - 1)}
          />
          <p>
            {new Date().getFullYear()}년 {month}월
          </p>
          <CalendarArrowIcon
            direction={180}
            onClick={() => setMonth(month > 11 ? month : month + 1)}
          />
        </DateDial>
      </Header>
      <CalendarWrapper>
        <TeacherCalendar
          monthIndex={month}
          data={dataMap}
          refetch={refetchAll}
        />
      </CalendarWrapper>
    </Wrapper>
  );
};

export default ChangeTeacherPage;

const Wrapper = styled.div`
  width: calc(85% - 300px);
  min-height: 680px;
  max-height: 1000px;
  height: 90vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const DateDial = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 40px;
  gap: 20px;
  > p {
    width: 130px;
    text-align: center;
  }
`;

const CalendarWrapper = styled.main`
  width: 100%;
  height: calc(100% - 54px);
`;
