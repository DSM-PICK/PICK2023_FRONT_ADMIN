import styled from "@emotion/styled";
import { css } from "@emotion/react";

const styleState = {
  colorState: {
    default: "#5C5961",
    purple: "#F9F7FA",
    red: "#F9F7FA",
    ghost: "#98959E",
  },
  backColorState: {
    default: "#F9F7FA",
    purple: "#9650FA",
    red: "#F04D51",
    ghost: "#ffffff",
  },
  borderState: {
    default: "0",
    purple: "0",
    red: "0",
    ghost: "1px solid #EAE7EE",
  },
  hoverState: {
    default: "#EAE7EE",
    purple: "#8335F0",
    red: "#D61A20",
    ghost: "#F9F7FA",
  },
  disabledState: {
    defautl: ``,
    purple: `
      background-color: #f0e6ff;
      pointer-events: none;
    `,
    red: `
      background-color: #ffe6e6;
      pointer-events: none;
    `,
    ghost: `
      border-color: #f2f0f5;
      color: #dbd7e0;
      pointer-events: none;
    `,
  },
};

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

const ButtonComponent = ({ children, fill, disabled, onClick, customStyle }: BtnProps) => {
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
