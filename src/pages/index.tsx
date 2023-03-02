import { Attendance, Outing, OutingList } from "@/assets/main";
import Card from "@/components/main/Card";
import Date from "@/components/main/Date";
import TodayTeacher from "@/components/main/TodayTeacher";
import styled from "@emotion/styled";

interface Props {
  picnic: number;
  application: number;
  classroom_movement: number;
}

const Home = ({ picnic, application, classroom_movement }: Props) => {
  const OutingText = () => {
    return (
      <>
        <p>현재 외출 신청 학생은</p>
        <p>
          총 <i>{picnic}명</i>입니다.
        </p>
      </>
    );
  };

  const MoveText = () => {
    return (
      <>
        <p>현재 2층에서 이동한</p>
        <p>
          학생 수는 <i>{application}명</i>입니다.
        </p>
      </>
    );
  };

  const OutingListText = () => {
    return (
      <>
        <p> 현재 외출 중인 학생은</p>
        <p>
          총 <i>{classroom_movement}명</i>입니다.
        </p>
      </>
    );
  };

  return (
    <MainPageContainer>
      <Date date="2023-02-20" name="정대현" floor={[2, 3]} />
      <TodayTeacher
        second_floor="추혜연"
        third_floor="신희원"
        fourth_floor="정대현"
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
  max-width: 1220px;
  margin: auto;
  @media (max-width: 1100px) {
    width: auto;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Home;
