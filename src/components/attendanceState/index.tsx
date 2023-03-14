import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import DropDown from "../common/dropDown";
import { ItemType } from "@/models/common";
import {
  attendanceDropDownItem,
  floorDropDownItem,
  studentInfo,
  classDropDownItem,
} from "./constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarIcon } from "@/assets/attendanceState";
import Image from "next/image";
import moment from "moment";
import ClassDropDown from "./dropDown";
import { getDateType } from "@/utils/api/common";
import { useQuery, useMutation } from "react-query";
import {
  getLayerClassList,
  getAttendanceCheckList,
  attandanceStatusChange,
} from "@/utils/api/selfStudy";

const AttendanceState = () => {
  const [className, setClassName] = useState<string>("");
  const [classroomId, setClassroomId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const isFriday = new Date(date).getDay() === 5;

  const getAttendanceCheckListReq = {
    classroom_id: classroomId,
    date: date,
  };

  const { data: attendanceCheckList } = useQuery(
    [className, classroomId],
    () => {
      const res = getAttendanceCheckList(getAttendanceCheckListReq);
      console.log(res.then((res) => res.data));
      return res;
    }
  );

  return (
    <Wrapper>
      <Header>
        <Title>출결상태</Title>
        <DropDowns
          setClassroomId={setClassroomId}
          setDate={setDate}
          setClassName={setClassName}
        />
      </Header>
      <StudentListContainer width={isFriday ? "1159px" : "1130px"}>
        <StudentListHeader isFriday={isFriday} className={className} />
        <StudentWrapper>
          {attendanceCheckList?.data.student_list?.map((data, idx) => (
            <Student
              key={idx}
              isFriday={isFriday}
              studentName={data.student_name}
              studentNumber={data.student_number}
              attendanceList={data.type_list}
              studentId={data.student_id}
            />
          ))}
        </StudentWrapper>
      </StudentListContainer>
    </Wrapper>
  );
};

interface StudentProps {
  studentNumber: string;
  studentName: string;
  attendanceList: string[];
  studentId: string;
  isFriday: boolean;
}

const Student = ({
  studentNumber,
  studentName,
  attendanceList,
  studentId,
  isFriday,
}: StudentProps) => {
  console.log(attendanceList);
  const [sixthAttendanceDropDownResult, setSixthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [seventhAttendanceDropDownResult, setSeventhAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [eighthAttendanceDropDownResult, setEighthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [ninethAttendanceDropDownResult, setNinethAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });
  const [tenthAttendanceDropDownResult, setTenthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "제목",
      id: "TITLE",
    });

  const weekdayArr = [
    setEighthAttendanceDropDownResult,
    setNinethAttendanceDropDownResult,
    setTenthAttendanceDropDownResult,
  ];

  const fridayArr = [
    setSixthAttendanceDropDownResult,
    setSeventhAttendanceDropDownResult,
    setEighthAttendanceDropDownResult,
    setNinethAttendanceDropDownResult,
    setTenthAttendanceDropDownResult,
  ];

  const dropDownArr = isFriday ? fridayArr : weekdayArr;

  const convertAttendanceType = (type: string) => {
    switch (type) {
      case "DISALLOWED":
        return "무단";
      case "LEAVE":
        return "조퇴";
      case "HOME":
        return "귀가";
      case "FIELD_TRIP":
        return "현체";
      case "PICNIC":
        return "외출";
      case "MOVEMENT":
        return "이동";
      case "ATTENDANCE":
        return "출석";
    }
  };

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    attandanceStatusChange
  );

  function updateAttendance(
    period: number,
    status: string | number,
    studentId: string
  ) {
    if (status === "TITLE") return;
    mutate({
      period: period,
      user_id: studentId,
      status: status,
    });
  }

  useEffect(() => {
    updateAttendance(8, eighthAttendanceDropDownResult.id, studentId);
  }, [eighthAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance(9, ninethAttendanceDropDownResult.id, studentId);
  }, [ninethAttendanceDropDownResult]);

  useEffect(() => {
    updateAttendance(10, tenthAttendanceDropDownResult.id, studentId);
  }, [tenthAttendanceDropDownResult]);

  return (
    <StudentContainer>
      <StudentBox>
        {studentNumber} {studentName}
      </StudentBox>
      {dropDownArr.map((result, idx) => {
        const status = convertAttendanceType(attendanceList[idx]);
        return (
          <React.Fragment key={idx}>
            <DropDown
              title={status}
              dropDownItem={attendanceDropDownItem}
              setResult={result}
              isFriday={isFriday}
            />
            <>{status}</>
          </React.Fragment>
        );
      })}
    </StudentContainer>
  );
};

interface StudentListHeaderProps {
  className: string;
  isFriday: boolean;
}

const StudentListHeader = ({ className, isFriday }: StudentListHeaderProps) => {
  const fridayPeriod: string[] = ["6교시", "7교시", "8교시", "9교시", "10교시"];
  const weekdayPeriod: string[] = ["8교시", "9교시", "10교시"];
  const period: string[] = isFriday ? fridayPeriod : weekdayPeriod;

  return (
    <StudentListHeaderContainer>
      <ClassName width={isFriday ? "140px" : "136px"}>{className}</ClassName>
      {period.map((period, idx) => (
        <PeriodBox key={idx} width={isFriday ? "148px" : "260px"}>
          {period}
        </PeriodBox>
      ))}
    </StudentListHeaderContainer>
  );
};

interface DropDownsProps {
  setClassName: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setClassroomId: React.Dispatch<React.SetStateAction<string>>;
}

const DropDowns = ({
  setClassName,
  setDate,
  setClassroomId,
}: DropDownsProps) => {
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

  const { data: dateType } = useQuery(parsedDate, () =>
    getDateType(parsedDate)
  );
  const { data: classList } = useQuery(
    ["classList", parsedDate, floorDropDownResult],
    () => getLayerClassList(floorDropDownResult.id, dateType?.data.type),
    {
      enabled: !!dateType?.data.type,
    }
  );

  return (
    <BtnsContainer>
      <ExcelPrintBtn>엑셀 출력하기</ExcelPrintBtn>
      <DropDown
        title="2층"
        dropDownItem={floorDropDownItem}
        setResult={setFloorDropDownResult}
      />
      <ClassDropDown
        setClassName={setClassName}
        setClassroomId={setClassroomId}
        classList={classList?.data.classroom_list}
      />
      <DateInput onClick={() => setIsCalendarActive(!isCalendarActive)}>
        {parsedDate} <Image src={CalendarIcon} alt="" />
      </DateInput>
      {isCalendarActive && (
        <ReactCalender
          setCalendarDate={setCalendarDate}
          dateState={calendarDate}
        />
      )}
    </BtnsContainer>
  );
};

interface ReactCalendarProps {
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>;
  dateState: Date;
}

const ReactCalender = ({ setCalendarDate, dateState }: ReactCalendarProps) => {
  const [value, onChange] = useState<Date>(dateState);

  useEffect(() => {
    setCalendarDate(value);
  }, [value]);

  return (
    <Wrap>
      <Calendar
        locale="en-US"
        value={value}
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        formatMonthYear={(locale, date) => {
          return new Intl.DateTimeFormat(locale, { month: "long" }).format(
            date
          );
        }}
      />
    </Wrap>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding-left: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 700;
  font-size: 35px;
  line-height: 60px;
`;

const BtnsContainer = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
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
  :hover {
    color: ${({ theme }) => theme.colors.purple400};
    border: 1px solid ${({ theme }) => theme.colors.purple400};
  }
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

const StudentListContainer = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 600px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 54px 66px 60px 40px;
  gap: 28px;
`;

const StudentWrapper = styled.div`
  height: 648px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const StudentListHeaderContainer = styled.div`
  display: flex;
  gap: 36px;
`;

const ClassName = styled.h2<{ width: string }>`
  font-weight: 500;
  font-size: 23px;
  line-height: 36px;
  width: ${(props) => props.width};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  justify-content: center;
`;

const PeriodBox = styled.span<{ width: string }>`
  width: ${(props) => props.width};
  height: 48px;
  border-radius: 12px;
  background: white;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StudentContainer = styled.div`
  display: flex;
  gap: 36px;
`;

const StudentBox = styled.div`
  width: 190px;
  height: 48px;
  background: white;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  position: absolute;
  top: 55px;
  z-index: 99;
  right: 0px;

  .react-calendar {
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 300px;
    min-height: 240px;
    gap: 0px;
    padding: 14px;
    .react-calendar__tile--now {
      border-radius: 100px;
      background: ${({ theme }) => theme.colors.purple200};
      color: white;
    }
    .react-calendar__month-view__weekdays {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.colors.gray700};
      > div > abbr {
        text-decoration: none;
      }
      margin-top: 17px;
    }
    .react-calendar__month-view__days {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
    .react-calendar__navigation__prev2-button {
      display: none;
    }
    .react-calendar__navigation__next2-button {
      display: none;
    }
    .react-calendar__navigation {
      height: 0;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
    .react-calendar__month-view__days__day--weekend {
      color: ${({ theme }) => theme.colors.red400};
    }
    .react-calendar__month-view__days__day--neighboringMonth {
      color: ${({ theme }) => theme.colors.gray500};
    }
    .react-calendar__tile--active {
      background: ${({ theme }) => theme.colors.purple300};
      color: white;
      border-radius: 100px;
    }
    .react-calendar__month-view__days__day {
      :hover {
        border-radius: 100px;
      }
    }
    .react-calendar__tile--hasActive {
      background: ${({ theme }) => theme.colors.purple300};
    }
  }
`;

export default AttendanceState;
