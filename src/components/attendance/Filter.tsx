import { useQuery } from "react-query";
import { getDateType } from "@/utils/api/common";
import { useEffect, useState } from "react";
import { ItemType } from "@/models/common";
import styled from "@emotion/styled";
import DropDown from "../common/Dropdown";
import Image from "next/image";
import { CalendarIcon } from "@/assets/attendanceState";
import { getLayerClassList } from "@/utils/api/selfStudy";
import { floorDropDownItem } from "./constants";
import CalenderFilter from "./CalenderFilter";
import ClassDropDown from "./ClassDropDown";

interface Props {
  setClassName: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setClassroomId: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({ setClassName, setDate, setClassroomId }: Props) => {
  const [floorDropDownResult, setFloorDropDownResult] = useState<ItemType>({
    option: "2층",
    id: 2,
  });
  const [isCalendarActive, setIsCalendarActive] = useState<boolean>(false);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  useEffect(() => {
    setIsCalendarActive(false);
    setDate(parsedDate);
  }, [calendarDate]);

  const changeDate = () => {
    let year: number | string = calendarDate.getFullYear();
    let month: number | string = calendarDate.getMonth();
    month += 1;
    if (month <= 9) {
      month = "0" + month;
    }
    let day: number | string = calendarDate.getDate();
    if (day <= 9) {
      day = "0" + day;
    }

    return year + "-" + month + "-" + day;
  };

  const parsedDate: string = changeDate();

  const { data: dateType, isSuccess: isSuccessDateType } = useQuery(
    parsedDate,
    () => getDateType(parsedDate)
  );
  const { data: classList, isSuccess: isSuccessClassList } = useQuery(
    ["classList", parsedDate, floorDropDownResult],
    () =>
      getLayerClassList(
        floorDropDownResult.id,
        isSuccessDateType && !!dateType.type ? dateType.type : ""
      ),
    {
      enabled: isSuccessDateType && !!dateType.type,
    }
  );

  return (
    <BtnsContainer>
      <DropDown
        title="2층"
        dropDownItem={floorDropDownItem}
        setResult={setFloorDropDownResult}
      />
      <ClassDropDown
        setClassName={setClassName}
        setClassroomId={setClassroomId}
        classList={
          isSuccessClassList && classList.classroom_list.length
            ? classList.classroom_list
            : undefined
        }
      />
      <DateInput onClick={() => setIsCalendarActive(!isCalendarActive)}>
        {parsedDate} <Image src={CalendarIcon} alt="" />
      </DateInput>
      {isCalendarActive && (
        <CalenderFilter
          setCalendarDate={setCalendarDate}
          dateState={calendarDate}
        />
      )}
    </BtnsContainer>
  );
};

const BtnsContainer = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
`;

const DateInput = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  width: 147px;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray800};
  background: white;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

const ExcelPrintBtn = styled.button`
  width: 147px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.gray300};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background: white;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.purple400};
    border: 1px solid ${({ theme }) => theme.colors.purple400};
  }
`;

export default Filter;
