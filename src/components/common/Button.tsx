import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { SerializedStyles } from "@emotion/react";
import { buttonStyleMap } from "@/constants/buttonStyleMap";

interface BtnProps {
  children: string;
  fill?: "default" | "purple" | "red" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  customStyle?: SerializedStyles;
  size?: [number, number] | [string, string];
}

interface BtnStyle {
  [index: string]: string;
}

const Button = ({
  children,
  fill,
  disabled,
  onClick,
  customStyle,
  size,
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
  }: BtnStyleVariable = buttonStyleMap;
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

  const btnSize = ["80px", "40px"];
  if (size) {
    if (typeof size[0] === "number") {
      size[0] = size[0] + "px";
      size[1] = size[1] + "px";
    }
    btnSize[0] = String(size[0]);
    btnSize[1] = String(size[1]);
  }
  return (
    <DefaultBtn
      btnStyle={btnStyle}
      customStyle={customStyle}
      disabled={disabled}
      onClick={onClick}
      size={btnSize}
    >
      {children}
    </DefaultBtn>
  );
};

const DefaultBtn = styled.button<{
  btnStyle: BtnStyle;
  size: string[];
  customStyle?: SerializedStyles;
}>`
  border-radius: 8px;
  padding: 0 21px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  ${({ size }) =>
    size &&
    css`
      width: ${size[0]};
      height: ${size[1]};
    `}
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
    ${({ customStyle }) => customStyle && customStyle}
`;

export default Button;
