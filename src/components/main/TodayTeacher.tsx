import styled from "@emotion/styled";

interface Props {
  second_floor: string;
  third_floor: string;
  fourth_floor: string;
}

const TodayTeacher = ({ second_floor, third_floor, fourth_floor }: Props) => {
  return (
    <TodayTeacherContainer>
      <p>오늘의 자습감독 선생님</p>
      <div>
        <p>2층 {second_floor}선생님</p>
        <p>3층 {third_floor}선생님</p>
        <p>4층 {fourth_floor}선생님</p>
      </div>
    </TodayTeacherContainer>
  );
};

const TodayTeacherContainer = styled.div`
  margin: 40px 0;
  > p {
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray600};
  }
  > div {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-evenly;
    text-align: center;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.gray50};
    margin-top: 20px;
    > p {
      font-size: 18px;
      line-height: 60px;
      color: ${({ theme }) => theme.colors.gray800};
    }
  }
`;

export default TodayTeacher;
