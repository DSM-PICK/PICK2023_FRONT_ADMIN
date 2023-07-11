import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { OutingApplyListType } from "@/models/outing/response";
import NoData from "../common/Nodata";

interface OutingProps {
  outing: OutingApplyListType[];
  outingSelectList: number[];
  outingStudentId: string[];
  setOutingSelectList: React.Dispatch<React.SetStateAction<number[]>>;
  setOutingStudentId: React.Dispatch<React.SetStateAction<string[]>>;
}

const OutingList = ({
  outing,
  outingSelectList,
  outingStudentId,
  setOutingSelectList,
  setOutingStudentId,
}: OutingProps) => {
  const studentClick = (studentIdx: number, student_id: string) => {
    const isIncludes = outingSelectList.includes(studentIdx);

    if (isIncludes) {
      setOutingSelectList(
        outingSelectList.filter((id: number) => id !== studentIdx)
      );
      setOutingStudentId(
        outingStudentId.filter((id: string) => id !== student_id)
      );
    } else {
      setOutingSelectList([...outingSelectList, studentIdx]);
      setOutingStudentId([...outingStudentId, student_id]);
    }
  };

  return (
    <>
      {outing.length ? (
        outing.map((item, idx) => {
          let start = item.start_time.slice(0, 5);
          let end = item.end_time.slice(0, 5);
          return (
            <Container
              key={item.student_id}
              onClick={() => {
                studentClick(idx, item.student_id);
              }}
              isReason={outingSelectList.includes(idx)}
            >
              <div>
                <NameText>
                  {item.student_number} {item.student_name}
                </NameText>
                <TimeText>
                  {start}~{end}
                </TimeText>
              </div>
              <ReasonText isReason={outingSelectList.includes(idx)}>
                {item.reason}
              </ReasonText>
            </Container>
          );
        })
      ) : (
        <NoData />
      )}
    </>
  );
};

const Container = styled.div<{ isReason: boolean }>`
  ${({ theme, isReason }) =>
    css`
      background-color: ${isReason
        ? theme.colors.purple50
        : theme.colors.gray50};
    `}
  border-radius: 12px;
  padding: 14px 20px;
  cursor: pointer;
  > div {
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
  }
`;

const NameText = styled.p`
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
`;

const TimeText = styled.p`
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const ReasonText = styled.p<{ isReason: boolean }>`
  font-size: 14px;
  margin-top: 8px;
  font-weight: 400;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray800};
  display: ${({ isReason }) => (isReason ? "block" : "none")};
`;

export default OutingList;
