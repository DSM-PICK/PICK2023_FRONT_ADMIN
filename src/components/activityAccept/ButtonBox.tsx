import { patchOutingRejectAccept } from "@/utils/api/outing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "react-query";
import Button from "../common/Button";

interface Props {
  isActive: boolean;
  outingStudentId: string[];
}

const ButtonBox = ({ isActive, outingStudentId }: Props) => {
  const acceptBtnStyle = css`
    font-size: 13px;
    font-weight: 300;
  `;

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
