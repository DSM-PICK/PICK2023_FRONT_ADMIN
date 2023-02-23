import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LayerToggleAtom } from "@/utils/atom";
import { useRecoilState } from "recoil";

const LayerToggle = () => {
  const [selector, setSelector] = useRecoilState<boolean>(LayerToggleAtom);

  return (
    <ButtonBox>
      <LeftBtn select={!selector} onClick={() => setSelector(false)}>
        층별로 보기
      </LeftBtn>
      <RightBtn select={selector} onClick={() => setSelector(true)}>
        반별로 보기
      </RightBtn>
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  width: 240px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  display: flex;
  box-sizing: border-box;
`;
const Button = styled.button<{ select: boolean }>`
  width: 120px;
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray600};
  background-color: #ffffff;
  border: 0;
  ${({ theme, select }) =>
    select &&
    css`
      border: 1px solid ${theme.colors.purple200};
      background-color: ${theme.colors.purple50};
      color: ${theme.colors.gray800};
    `}
`;
const LeftBtn = styled(Button)`
  border-radius: 12px 0 0 12px;
`;
const RightBtn = styled(Button)`
  border-radius: 0 12px 12px 0;
`;

export default LayerToggle;
