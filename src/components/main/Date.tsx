import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { setTeacherState } from "@/store/createSlice";
import { useEffect } from "react";

interface Props {
  date: string;
  name: string;
  floor: number[];
}

const Date = ({ date, name, floor }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const floorData = floor?.map((item) => item);
    dispatch(setTeacherState({ setSelfStudyState: floorData! }));
  }, [floor, dispatch]);

  return (
    <>
      <DateText>{date}</DateText>
      <TeacherBox>
        <p>{name}선생님은&nbsp;</p>
        {floor?.length > 0 ? (
          <div>
            {floor.map((item, i) => {
              return (
                <p className="floor" key={i}>
                  {item}
                  {i < floor.length - 1 && ","}
                </p>
              );
            })}
            <p>층 자습감독 선생님입니다.</p>
          </div>
        ) : (
          <p>자습감독 선생님이 아닙니다.</p>
        )}
      </TeacherBox>
    </>
  );
};

const DateText = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const TeacherBox = styled.div`
  display: flex;
  p {
    font-size: 32px;
    font-weight: 500;
  }
  > div {
    display: flex;
  }
  .floor {
    color: ${({ theme }) => theme.colors.purple400};
  }
`;

export default Date;
