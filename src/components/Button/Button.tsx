import styled from "@emotion/styled";

interface BtnProps {
  children?: string;
  fill?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: {
    [index: string]: string;
  };
}

const Button = ({ children, fill, disabled, onClick, style }: BtnProps) => {
  if (fill) {
    interface BtnProps {
      [index: string]: JSX.Element;
    }
    const buttonStyle: BtnProps = {
      ghost: (
        <GhostBtn style={style} disabled={disabled} onClick={onClick}>
          {children}
        </GhostBtn>
      ),
      red: (
        <RedBtn style={style} disabled={disabled} onClick={onClick}>
          {children}
        </RedBtn>
      ),
      purple: (
        <PurpleBtn style={style} disabled={disabled} onClick={onClick}>
          {children}
        </PurpleBtn>
      ),
      default: (
        <DefaultBtn style={style} disabled={disabled} onClick={onClick}>
          {children}
        </DefaultBtn>
      ),
    };
    return buttonStyle[fill];
  }
  return (
    <DefaultBtn style={style} disabled={disabled} onClick={onClick}>
      {children}
    </DefaultBtn>
  );
};

const DefaultBtn = styled.button`
  height: 40px;
  border: 0;
  border-radius: 8px;
  padding: 0 21px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray700};
  background-color: ${({ theme }) => theme.colors.gray50};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

const GhostBtn = styled(DefaultBtn)`
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray500};
  font-weight: 400;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray50};
  }
  &:disabled {
    border-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray300};
    &:hover {
      background-color: #ffffff;
    }
  }
`;

const PurpleBtn = styled(DefaultBtn)`
  background-color: ${({ theme }) => theme.colors.purple400};
  color: #ffffff;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple500};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.purple50};
    &:hover {
      background-color: ${({ theme }) => theme.colors.purple50};
    }
  }
`;

const RedBtn = styled(DefaultBtn)`
  background-color: ${({ theme }) => theme.colors.red400};
  color: #ffffff;
  &:hover {
    background-color: ${({ theme }) => theme.colors.red600};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.red50};
    &:hover {
      background-color: ${({ theme }) => theme.colors.red50};
    }
  }
`;

export default Button;
