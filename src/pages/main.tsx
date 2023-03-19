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
import { getToken } from "@/utils/functions/tokenManager";

const Home = () => {
  const { handleError } = useApiError();
  const { accessToken } = getToken();
  const { data } = useQuery("postlist", () => getTodaySelfStudyTeacher(), {
    onError: handleError,
  });
  const { data: state } = useQuery(
    "state",
    () => getTodaySelfStudyTeacherWhether(),
    {
      onError: handleError,
      enabled: accessToken,
    }
  );
  const { data: students } = useQuery(
    "students",
    () => getMainpageStudnetCount(),
    { onError: handleError, cacheTime: 0 }
  );

  const OutingText = () => {
    return (
      <>
        <p>현재 외출 신청 학생은</p>
        <p>
          총 <i>{students?.data.picnic}명</i>입니다.
        </p>
      </>
    );
  };

  const MoveText = () => {
    return (
      <>
        <p>현재 2층에서 이동한</p>
        <p>
          학생 수는 <i>{students?.data.application}명</i>입니다.
        </p>
      </>
    );
  };

  const OutingListText = () => {
    return (
      <>
        <p> 현재 외출 중인 학생은</p>
        <p>
          총 <i>{students?.data.classroom_movement}명</i>입니다.
        </p>
      </>
    );
  };

  return (
    <MainPageContainer>
      <Date
        date={state?.data.date!}
        name={state?.data.name!}
        floor={state?.data.floor!}
      />
      <TodayTeacher
        second_floor={data?.data.second_floor!}
        third_floor={data?.data.third_floor!}
        fourth_floor={data?.data.fourth_floor!}
      />
      <CardContainer>
        <Card
          text={OutingText}
          img={Outing}
          btnText="외출 수락하러 가기"
          link="/activity-accept"
        />
        <Card
          text={MoveText}
          img={Attendance}
          btnText="출결 상태 확인하기"
          link="/attendance"
        />
        <Card
          text={OutingListText}
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
