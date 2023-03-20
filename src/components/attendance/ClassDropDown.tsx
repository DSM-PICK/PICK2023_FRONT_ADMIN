import styled from "@emotion/styled";
import Image from "next/image";
import { DropDownIcon } from "@/assets/dropDown";
import { useState, useEffect } from "react";
import { FloorClassRoomDto } from "@/models/selfStudy/response";
import OutSideClickHandler from "../common/OutSideClickHandler";

const ClassDropDown = ({
  classList,
  setClassName,
  setClassroomId,
}: {
  classList: FloorClassRoomDto[] | undefined;
  setClassName: React.Dispatch<React.SetStateAction<string>>;
  setClassroomId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [value, setValue] = useState<string>("교실");
  const changeState = (value: FloorClassRoomDto) => {
    setValue(value.name);
    setClassName(value.name);
    setIsClick(false);
    setClassroomId(value.classroom_id);
  };

  useEffect(() => {
    if (classList) changeState(classList[0]);
    else {
      setValue("교실 없음");
    }
  }, [classList]);

  return (
    <OutSideClickHandler
      onOutSideClick={() => {
        setIsClick(false);
      }}
    >
      <Container>
        <SelectButton
          disabled={!classList}
          isClick={isClick}
          onClick={() => setIsClick(!isClick)}
        >
          <span>{value}</span>
          <Image width={12} height={6} src={DropDownIcon} alt="" />
        </SelectButton>
        {isClick && classList && (
          <SelectList>
            {classList.map((value) => (
              <span key={value.classroom_id} onClick={() => changeState(value)}>
                {value.name}
              </span>
            ))}
          </SelectList>
        )}
      </Container>
    </OutSideClickHandler>
  );
};

const Container = styled.div`
  position: relative;
`;

const SelectButton = styled.button<{ isClick: boolean }>`
  cursor: pointer;
  width: 147px;
  height: 48px;
  background-color: white;
  border: 1px solid
    ${(props) =>
      props.isClick
        ? props.theme.colors.purple400
        : props.theme.colors.gray300};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.gray700};
`;

const SelectList = styled.div`
  cursor: pointer;
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
  z-index: 1;
  top: 56px;
  z-index: 99;
`;

export default ClassDropDown;
