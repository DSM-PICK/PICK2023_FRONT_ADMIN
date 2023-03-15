import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { OutingApplyListType } from "@/models/outing/response";
import ButtonComponent from "../common/button/ButtonComponent";
import { useMutation, useQueryClient } from "react-query";
import { patchOutingRejectAccept } from "@/utils/api/outing";

interface OutingProps {
  outing: OutingApplyListType[];
}

const OutingComponent = (props: OutingProps) => {
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const [outingStudentId, setOutingStudentId] = useState<string[]>([]);

  let isClick = outingSelectList.length > 0;

  const acceptBtnStyle = css`
    font-size: 13px;
    font-weight: 300;
  `;

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

  const queryClient = useQueryClient();
  const { mutate: patchOutingRejectList } = useMutation(
    () => patchOutingRejectAccept("PICNIC_REJECT", outingStudentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("applyList");
      },
    }
  );

  const { mutate: patchOutingApplyList } = useMutation(
    () => patchOutingRejectAccept("PICNIC", outingStudentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("applyList");
      },
    }
  );

  return (
    <>
      {props.outing.map((item, idx) => {
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
            <NameText>
              {item.student_number} {item.student_name}
            </NameText>
            <TimeText>
              {start}~{end}
            </TimeText>
            <ReasonText isReason={outingSelectList.includes(idx)}>
              {item.reason}
            </ReasonText>
          </Container>
        );
      })}
      <AcceptBtns>
        <ButtonComponent
          disabled={!isClick}
          customStyle={acceptBtnStyle}
          size={[95, 40]}
          fill="ghost"
          onClick={() => {
            patchOutingRejectList();
          }}
        >
          거절하기
        </ButtonComponent>
        <ButtonComponent
          disabled={!isClick}
          customStyle={acceptBtnStyle}
          size={[95, 40]}
          fill="purple"
          onClick={() => {
            patchOutingApplyList();
          }}
        >
          수락하기
        </ButtonComponent>
      </AcceptBtns>
    </>
  );
};
const Container = styled.div<{ isReason: boolean }>`
  width: 215px;
  min-height: 42px;
  ${({ theme, isReason }) =>
    css`
      background-color: ${isReason
        ? theme.colors.purple50
        : theme.colors.gray50};
      height: ${isReason ? "auto" : "40px"};
    `}
  border-radius: 12px;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, minmax(20px, auto));
  row-gap: 8px;
`;
const NameText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
`;
const TimeText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray600};
  text-align: end;
`;
const ReasonText = styled.p<{ isReason: boolean }>`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.black};
  display: ${({ isReason }) => (isReason ? "block" : "none")};
  grid-column: 1 / 3;
  grid-row: auto;
`;

const AcceptBtns = styled.div`
  position: absolute;
  bottom: 14px;
  left: 262px;
  display: flex;
  gap: 12px;
  justify-content: end;
`;

export default OutingComponent;
