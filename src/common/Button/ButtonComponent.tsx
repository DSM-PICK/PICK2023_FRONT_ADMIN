import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { styleState } from "./constants/index";

interface BtnProps {
  children: string;
  fill?: string;
  disabled?: boolean;
  onClick?: () => void;
  customStyle?: {
    [index: string]: string;
  };
}

interface BtnStyle {
  [index: string]: string;
}

const ButtonComponent = ({
  children,
  fill,
  disabled,
  onClick,
  customStyle,
}: BtnProps) => {
  interface BtnStyleVariable {
    [index: string]: BtnStyle;
  }

  const {
    colorState,
    backColorState,
    borderState,
    hoverState,
    disabledState,
  }: BtnStyleVariable = styleState;

  let btnStyle: BtnStyle = {
    color: colorState.default,
    backColor: backColorState.default,
    border: borderState.default,
    hover: hoverState.default,
    disabled: disabledState.defautl,
  };
  if (fill) {
    btnStyle.color = colorState[fill];
    btnStyle.backColor = backColorState[fill];
    btnStyle.border = borderState[fill];
    btnStyle.hover = hoverState[fill];
    btnStyle.disabled = disabledState[fill];
  }
  return (
    <DefaultBtn
      btnStyle={btnStyle}
      style={customStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </DefaultBtn>
  );
};

const DefaultBtn = styled.button<{ btnStyle: BtnStyle }>`
  height: 40px;
  border-radius: 8px;
  padding: 0 21px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  ${({ btnStyle }) =>
    btnStyle &&
    css`
      background-color: ${btnStyle.backColor};
      color: ${btnStyle.color};
      border: ${btnStyle.border};
      &:hover {
        background-color: ${btnStyle.hover};
      }
      &:disabled {
        ${btnStyle.disabled}
      }
    `}
`;

export default ButtonComponent;
