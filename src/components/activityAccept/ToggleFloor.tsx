import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LayerToggleAtom } from "@/utils/atom";
import { useRecoilState } from "recoil";

const LayerToggle = () => {
  const [selector, setSelector] = useRecoilState<boolean>(LayerToggleAtom);

  const btnData = [
    {
      content: "층별로 보기",
      select: !selector,
      onClick: () => {
        setSelector(false);
      },
      style: { "border-radius": "12px 0 0 12px" },
    },
    {
      content: "반별로 보기",
      select: selector,
      onClick: () => {
        setSelector(true);
      },
      style: { "border-radius": "0 12px 12px 0" },
    },
  ];

  return (
    <ButtonBox>
      {btnData.map((list) => (
        <Button border={list.style} select={list.select} onClick={list.onClick}>
          {list.content}
        </Button>
      ))}
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
const Button = styled.button<{ select: boolean; border: {} }>`
  width: 120px;
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray600};
  background-color: #ffffff;
  border: 0;
  ${({ border }) => border}
  ${({ select, theme }) =>
    select &&
    css`
      border: 1px solid ${theme.colors.purple200};
      background-color: ${theme.colors.purple50};
      color: ${theme.colors.gray800};
    `}
`;

export default LayerToggle;
