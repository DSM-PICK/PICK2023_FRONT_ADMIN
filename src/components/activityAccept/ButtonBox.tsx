import { useApiError } from "@/hooks/useApiError";
import { patchOutingRejectAccept } from "@/utils/api/outing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "react-query";
import Button from "../common/Button";
import { toast } from "react-hot-toast";

interface Props {
  outingStudentId: string[];
  outingSelectList: number[];
}

const ButtonBox = ({ outingStudentId, outingSelectList }: Props) => {
  let isActive = outingSelectList.length > 0;

  const acceptBtnStyle = css`
    font-size: 13px;
    font-weight: 300;
  `;

  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { mutate: patchOutingRejectList } = useMutation(
    () => patchOutingRejectAccept("PICNIC_REJECT", outingStudentId),
    {
      onError: handleError,
      onSuccess: () => {
        queryClient.invalidateQueries("applyList");
        toast.success("외출이 거절되었습니다.", { duration: 1000 });
      },
    }
  );

  const { mutate: patchOutingApplyList } = useMutation(
    () => patchOutingRejectAccept("PICNIC", outingStudentId),
    {
      onError: handleError,
      onSuccess: () => {
        queryClient.invalidateQueries("applyList");
        toast.success("외출이 수락되었습니다.", { duration: 1000 });
      },
    }
  );

  return (
    <ButtonContainer>
      <div>
        <Button
          disabled={!isActive}
          customStyle={acceptBtnStyle}
          size={[95, 40]}
          fill="ghost"
          onClick={() => {
            patchOutingRejectList();
          }}
        >
          거절하기
        </Button>
        <Button
          disabled={!isActive}
          customStyle={acceptBtnStyle}
          size={[95, 40]}
          fill="purple"
          onClick={() => {
            patchOutingApplyList();
          }}
        >
          수락하기
        </Button>
      </div>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  bottom: 0px;
  right: 20px;
  > div {
    display: flex;
    margin: 12px 0;
    justify-content: flex-end;
    gap: 12px;
  }
`;

export default ButtonBox;
