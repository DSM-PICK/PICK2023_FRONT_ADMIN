import { useApiError } from "@/hooks/useApiError";
import { usePeriod } from "@/hooks/usePeriod";
import { patchOutingStudentState } from "@/utils/api/outing";
import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Modal from "../common/Modal";
import { toast } from "react-hot-toast";

interface Props {
  student_id: string;
  student_number: string;
  student_name: string;
  end_time: string;
  refetch: () => void;
}

const List = ({
  student_id,
  student_number,
  student_name,
  end_time,
  refetch,
}: Props) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [period, setPeriod] = useState<number>(0);
  const { handleError } = useApiError();
  const { mutate } = useMutation(
    "confirm-return-outing",
    () => patchOutingStudentState(student_id, period),
    {
      onSuccess: () => {
        refetch();
        toast.success("복귀되었습니다.", { duration: 1000 });
      },
      onError: handleError,
    }
  );

  useEffect(() => {
    setPeriod(0);
    const { getPeriod } = usePeriod();
    setPeriod(getPeriod());
  }, [isOpenModal]);

  return (
    <>
      <Container>
        <div>
          <MainText>
            {student_number} {student_name}
          </MainText>
          <SubText>{end_time.substring(0, 5)} 도착예정</SubText>
        </div>
        <CustomButton
          onClick={() => setOpenModal(true)}
          fill="purple"
          size="sm"
        >
          복귀
        </CustomButton>
      </Container>
      {isOpenModal && (
        <Modal
          setOpenModal={setOpenModal}
          isDanger={false}
          btnText="확인하기"
          mainText={`${student_number} ${student_name} 학생의\n 외출을 끝내시겠습니까?`}
          subText={
            "확인하기를 선택하면 다시 상태를 변경할 수 없습니다.\n 학생이 학교로 복귀했는지 다시 한번 확인해주세요."
          }
          callBack={() => {
            mutate();
            refetch();
          }}
        />
      )}
    </>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 0 12px 0 14px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const MainText = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const SubText = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const CustomButton = styled(Button)`
  border-radius: 10px;
`;

export default List;
