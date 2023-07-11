import { css } from "@emotion/react";
import Button from "../common/Button";

interface ActivityBtnProps {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ActivityBtn = ({ children, onClick, disabled }: ActivityBtnProps) => {
  const headerBarBtnStyle = css`
    font-size: 13px;
    font-weight: 400;
    padding: 0px 12px;
    border-radius: 8px;
    margin: 8px 0;
    cursor: pointer;
  `;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size={["", "36px"]}
      customStyle={headerBarBtnStyle}
      fill="purple"
    >
      {children}
    </Button>
  );
};

export default ActivityBtn;
