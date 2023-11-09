import { Attendance, Outing, OutingList } from "@/assets/main";
import Card from "@/components/main/Card";
import Date from "@/components/main/Date";
import TodayTeacher from "@/components/main/TodayTeacher";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import {
  getTodaySelfStudyTeacher,
  getTodaySelfStudyTeacherWhether,
  getMainpageStudnetCount,
} from "@/utils/api/selfStudy/index";
import { useApiError } from "@/hooks/useApiError";
import { MainPageStudentNumber } from "@/models/selfStudy/response";

const QUERY_KEYS = {
  POST_LIST: "postlist",
  STATE: "state",
  STUDENTS: "students",
};

const OutingText = ({ students }: { students: MainPageStudentNumber }) => (
  <>
    <p>현재 외출 신청 학생은</p>
    <p>
      총 <i>{students?.application}명</i>입니다.
    </p>
  </>
);

const MoveText = ({ students }: { students: MainPageStudentNumber }) => (
  <>
    <p>현재 2층에서 이동한</p>
    <p>
      학생 수는 <i>{students?.classroom_movement}명</i>입니다.
    </p>
  </>
);

const OutingListText = ({ students }: { students: MainPageStudentNumber }) => (
  <>
    <p> 현재 외출 중인 학생은</p>
    <p>
      총 <i>{students?.picnic}명</i>입니다.
    </p>
  </>
);

const Home = () => {
  const { handleError } = useApiError();

  const { data: teachers } = useQuery(
    QUERY_KEYS.POST_LIST,
    getTodaySelfStudyTeacher,
    { onError: handleError }
  );

  const { data: state } = useQuery(
    QUERY_KEYS.STATE,
    getTodaySelfStudyTeacherWhether,
    { onError: handleError }
  );

  const { data: students } = useQuery(
    QUERY_KEYS.STUDENTS,
    getMainpageStudnetCount,
    { onError: handleError, cacheTime: 0 }
  );

  return (
    <MainPageContainer>
      <Date date={state?.date!} name={state?.name!} floor={state?.floor!} />
      <TodayTeacher
        second_floor={teachers?.second_floor!}
        third_floor={teachers?.third_floor!}
        fourth_floor={teachers?.fourth_floor!}
      />
      <CardContainer>
        <Card
          text={() => <OutingText students={students!} />}
          img={Outing}
          btnText="외출 수락하러 가기"
          link="/activity-accept"
        />
        <Card
          text={() => <MoveText students={students!} />}
          img={Attendance}
          btnText="출결 상태 확인하기"
          link="/attendance"
        />
        <Card
          text={() => <OutingListText students={students!} />}
          img={OutingList}
          btnText="외출자 목록보기"
          link="/outlist"
        />
      </CardContainer>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  width: 70vw;
  margin: auto;
  @media (max-width: 1100px) {
    width: auto;
  }
`;

const CardContainer = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default Home;
