import { DropDownIcon } from "@/assets/dropDown";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ItemType } from "@/models/common";
import { useTheme } from "@emotion/react";
import OutSideClickHandler from "./OutSideClickHandler";

interface Props {
  title: string | undefined;
  dropDownItem: ItemType[];
  setResult: React.Dispatch<React.SetStateAction<ItemType>>;
  isFriday?: boolean | undefined;
  className?: string;
}

const DropDown = ({
  title,
  dropDownItem,
  setResult,
  isFriday,
  className,
}: Props) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(title);
  const [isAttendance, setIsAttendance] = useState<boolean>(false);
  const theme = useTheme();
  const [fontColor, setFontColor] = useState<string>(theme.colors.gray800);
  const [borderColor, setBorderColor] = useState<string>(theme.colors.gray300);
  const [isActivate, setIsActivate] = useState<boolean>(true);

  const onChange = (item: ItemType) => {
    setValue(item.option);
    setResult(item);
    setIsClick(false);
  };

  const changeStates = (
    fontColor: string,
    borderColor: string,
    isAttendance: boolean
  ) => {
    setFontColor(fontColor);
    setBorderColor(borderColor);
    setIsAttendance(isAttendance);
  };

  useEffect(() => {
    switch (value) {
      case "이동":
        changeStates(theme.colors.purple300, theme.colors.purple100, true);
        break;
      case "외출":
        changeStates(theme.colors.purple600, theme.colors.purple200, true);
        break;
      case "무단":
        changeStates(theme.colors.red400, theme.colors.red100, true);
        break;
      case "출석":
        changeStates(theme.colors.gray800, theme.colors.gray300, true);
        break;
      case "현체":
        changeStates(theme.colors.gray600, theme.colors.gray300, true);
        setIsActivate(false);
        break;
      case "조퇴":
        changeStates(theme.colors.red400, theme.colors.red100, true);
        break;
      case "취업":
        changeStates(theme.colors.gray600, theme.colors.gray300, true);
        break;
      case "귀가":
        changeStates(theme.colors.gray600, theme.colors.gray300, true);
        break;
    }
  }, [value]);

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <OutSideClickHandler
      onOutSideClick={() => {
        setIsClick(false);
      }}
    >
      <SelectBoxContainer className={className}>
        <SelectButton
          fontColor={fontColor}
          borderColor={borderColor}
          isAttendance={isAttendance}
          isClick={isClick}
          onClick={() => setIsClick(!isClick)}
          isFriday={isFriday}
          disabled={!isActivate}
        >
          <span>{value}</span>
          {isActivate && (
            <Image width={12} height={6} src={DropDownIcon} alt="arrow" />
          )}
        </SelectButton>
        {isClick && (
          <SelectList isFriday={isFriday}>
            {dropDownItem.map((item) => (
              <span key={item.id} onClick={() => onChange(item)}>
                {item.option}
              </span>
            ))}
          </SelectList>
        )}
      </SelectBoxContainer>
    </OutSideClickHandler>
  );
};

const SelectBoxContainer = styled.div`
  position: relative;
  position: 98;
`;

const SelectButton = styled.button<{
  fontColor: string;
  borderColor: string;
  isAttendance: boolean;
  isClick: boolean;
  isFriday?: boolean;
}>`
  width: ${(props) => (props.isFriday === undefined ? "147px" : "100%")};
  height: 48px;
  background-color: white;
  border: 1px solid
    ${(props) =>
      props.isClick && !props.isAttendance
        ? props.theme.colors.purple400
        : props.borderColor};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  font-weight: 400;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) =>
    props.isClick && !props.isAttendance
      ? props.theme.colors.gray700
      : props.fontColor};
`;

const SelectList = styled.div<{ isFriday?: boolean }>`
  width: ${(props) => (props.isFriday === undefined ? "147px" : "100%")};
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  gap: 12px;
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.gray900};
  position: absolute;
  z-index: 1;
  top: 56px;
  z-index: 99;
  max-height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
    display: block;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;

    display: block;
  }
  > span {
    cursor: pointer;
  }
`;

export default DropDown;
