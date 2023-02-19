import { DropDownIcon } from "@/assets/dropDown";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ItemType } from "@/models/common";

const DropDown = ({
  title,
  dropDownItem,
  setResult,
}: {
  title: string;
  dropDownItem: ItemType[];
  setResult: React.Dispatch<React.SetStateAction<ItemType>>;
}) => {
  const [isClick, setIsCLick] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);
  const [fontColor, setFontColor] = useState<string>("#3F3C42");
  const [borderColor, setBorderColor] = useState<string>("#DBD7E0");

  const onChange = async (item: ItemType) => {
    setValue(item.option);
    setResult(item);
    setIsCLick(false);
  };

  useEffect(() => {
    switch (value) {
      case "이동":
        setFontColor("#9F62F5");
        setBorderColor("#D3B3FF");
        break;
      case "외출":
        setFontColor("#6D1BE0");
        setBorderColor("#B885FF");
        break;
      case "무단":
        setFontColor("#F04D51");
        setBorderColor("#FFB3B5");
        break;
      default:
        setFontColor("#3F3C42");
        setBorderColor("#DBD7E0");
        break;
    }
  }, [value]);

  return (
    <SelectBoxContainer>
      <SelectButton
        fontColor={fontColor}
        borderColor={borderColor}
        onClick={() => setIsCLick(!isClick)}
      >
        <span>{value}</span>
        <Image width={12} height={6} src={DropDownIcon} alt="" />
      </SelectButton>
      {isClick && (
        <SelectList>
          {dropDownItem.map((item) => (
            <span key={item.id} onClick={() => onChange(item)}>
              {item.option}
            </span>
          ))}
        </SelectList>
      )}
    </SelectBoxContainer>
  );
};

const SelectBoxContainer = styled.div`
  position: relative;
`;

const SelectButton = styled.button<{ fontColor: string; borderColor: string }>`
  width: 147px;
  height: 48px;
  background-color: white;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.fontColor};
`;

const SelectList = styled.div`
  width: 147px;
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
  top: 56px;
`;

export default DropDown;
