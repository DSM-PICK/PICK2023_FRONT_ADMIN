import { DropDownIcon } from "@/assets/dropDown";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

const DropDown = ({
  title,
  dropDownItem,
}: {
  title: string;
  dropDownItem: string[];
}) => {
  const [isClick, setIsCLick] = useState<boolean>(false);
  const [value, setValue] = useState(title);

  const onChange = async (item: string) => {
    setValue(item);
    setIsCLick(false);
  };

  return (
    <SelectBoxContainer>
      <SelectButton onClick={() => setIsCLick(!isClick)}>
        <span>{value}</span>
        <Image width={8} height={4} src={DropDownIcon} alt="" />
      </SelectButton>
      {isClick && (
        <SelectList>
          {dropDownItem.map((item, idx) => (
            <span key={idx} onClick={() => onChange(item)}>
              {item}
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

const SelectButton = styled.button`
  width: 147px;
  height: 48px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray800};
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
