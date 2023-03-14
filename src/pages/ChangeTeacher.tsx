import CalendarArrowIcon from "@/assets/changeTeacher";
import TeacherCalendar from "@/components/changeTeacher/calendar";
import { getSelfStudyTeacherList } from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { useState, useEffect, useCallback } from "react";
import { useQueries, useQuery } from "react-query";

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
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [dataMap, setDataMap] = useState<DataType | null>(null);
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
        <Title>자습감독 선생님 변경</Title>
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

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 20px;
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  font-size: 80px;
`;

export default ChangeTeacherPage;
