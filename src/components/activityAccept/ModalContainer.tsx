import { todayDate } from "@/utils/functions/todayDate";
import Modal from "../common/Modal";
import { useMutation } from "react-query";
import { floorRestrictionPatch } from "@/utils/api/selfStudy";
import { toast } from "react-hot-toast";
import OutingIssueModal from "./Modal";
import { useApiError } from "@/hooks/useApiError";

interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenOutingModal: React.Dispatch<React.SetStateAction<boolean>>;
  floorState: number[];
  isOpenOutingModal: boolean;
}

const Modals = ({
  isOpenModal,
  setOpenModal,
  setIsOpenOutingModal,
  floorState,
  isOpenOutingModal,
}: ModalProps) => {
  const { handleError } = useApiError();

  const { mutate } = useMutation("floor", () => floorRestrictionPatch(), {
    onError: handleError,
    onSuccess: () => {
      toast.success("층 이동이 제한되었습니다.", { duration: 1000 });
    },
  });
  return (
    <>
      {isOpenModal && (
        <Modal
          setOpenModal={setOpenModal}
          isDanger={true}
          btnText="제한하기"
          mainText={`오늘 ${floorState}층의 모든 이동을
      제한하시겠습니까?`}
          subText={`제한하기를 선택하면 오늘(${todayDate()})
          방과후 시간동안 학생들의 교실 이동은 불가능합니다.`}
          callBack={() => {
            mutate();
          }}
        />
      )}
      {isOpenOutingModal && (
        <OutingIssueModal setIsOpenOutingModal={setIsOpenOutingModal} />
      )}
    </>
  );
};

export default Modals;
