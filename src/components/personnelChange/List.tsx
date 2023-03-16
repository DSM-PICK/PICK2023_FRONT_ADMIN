import { deleteAfterSchoolMember } from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import Modal from "../common/Modal";

interface Props {
  after_school_id: string;
  student_id: string;
  student_number: string;
  student_name: string;
  refetch: () => void;
}

const Outing = ({
  student_id,
  student_number,
  student_name,
  after_school_id,
  refetch,
}: Props) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { mutate: deleteMutation } = useMutation(
    "delete-afterSchool",
    () => deleteAfterSchoolMember({ after_school_id, student_id }),
    {
      onSuccess: () => {
        refetch();
        toast.success("삭제되었습니다.", { duration: 1000 });
      },
    }
  );

  return (
    <>
      <Container>
        <div>
          <MainText>
            {student_number} {student_name}
          </MainText>
        </div>
        <CustomButton
          onClick={() => setOpenModal(true)}
          fill="purple"
          size="sm"
        >
          삭제
        </CustomButton>
      </Container>
      {isOpenModal && (
        <Modal
          setOpenModal={setOpenModal}
          isDanger={true}
          btnText="삭제하기"
          mainText={`${student_number} ${student_name} 학생을\n방과후 자습에서 삭제하시겠습니까?`}
          subText={
            "삭제하기 선택 이후에는 취소할 수 없습니다.\n다시 한번 확인해주세요."
          }
          callBack={() => {
            deleteMutation();
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

const CustomButton = styled(Button)`
  border-radius: 10px;
`;

export default Outing;
