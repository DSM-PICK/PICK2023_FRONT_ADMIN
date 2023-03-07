import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import DropDown from "../common/dropDown";
import { ItemType } from "@/models/common";
import {
  attendanceDropDownItem,
  classDropDownItem,
  floorDropDownItem,
  studentInfo,
} from "./constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarIcon } from "@/assets/attendanceState";
import Image from "next/image";
import moment from "moment";

const AttendanceState = () => {
  const [className, setClassName] = useState<string>("");
  const [isSelfStudy, setIsSelfStudy] = useState<boolean>(false);
  const [studentAttendanceState, setStudentAttendanceState] = useState({
    period: 0,
    user_id: "UUID",
    status: "PICNIC",
  });

  return (
    <Wrapper>
      <Header>
        <Title>출결상태</Title>
        <DropDowns setClassName={setClassName} />
      </Header>
      <StudentListContainer width={isSelfStudy ? "1130px" : "1159px"}>
        <StudentListHeader isSelfStudy={isSelfStudy} className={className} />
        <StudentWrapper>
          {studentInfo.map((data, idx) => (
            <Student
              key={idx}
              isSelfStudy={isSelfStudy}
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
  isSelfStudy: boolean;
}

const Student = ({
  studentNumber,
  studentName,
  attendanceList,
  studentId,
  isSelfStudy,
}: StudentProps) => {
  const [sixthAttendanceDropDownResult, setSixthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "출석",
      id: "TITLE",
    });
  const [seventhAttendanceDropDownResult, setSeventhAttendanceDropDownResult] =
    useState<ItemType>({
      option: "출석",
      id: "TITLE",
    });
  const [eighthAttendanceDropDownResult, setEighthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "출석",
      id: "TITLE",
    });
  const [ninethAttendanceDropDownResult, setNinethAttendanceDropDownResult] =
    useState<ItemType>({
      option: "출석",
      id: "TITLE",
    });
  const [tenthAttendanceDropDownResult, setTenthAttendanceDropDownResult] =
    useState<ItemType>({
      option: "출석",
      id: "TITLE",
    });

  const selfStudyDropDownArr = [
    setEighthAttendanceDropDownResult,
    setNinethAttendanceDropDownResult,
    setTenthAttendanceDropDownResult,
  ];

  const afterSchoolDropDownArr = [
    setSixthAttendanceDropDownResult,
    setSeventhAttendanceDropDownResult,
    setEighthAttendanceDropDownResult,
    setNinethAttendanceDropDownResult,
    setTenthAttendanceDropDownResult,
  ];

  const dropDownArr = isSelfStudy
    ? selfStudyDropDownArr
    : afterSchoolDropDownArr;

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
      default:
        return "출석";
    }
  };

  return (
    <StudentContainer>
      <StudentBox>
        {studentNumber} {studentName}
      </StudentBox>
      {dropDownArr.map((result, idx) => (
        <DropDown
          key={idx}
          title={convertAttendanceType(attendanceList[idx])}
          dropDownItem={attendanceDropDownItem}
          setResult={result}
          isSelfStudy={isSelfStudy}
        />
      ))}
    </StudentContainer>
  );
};

const StudentListHeader = ({
  className,
  isSelfStudy,
}: {
  className: string;
  isSelfStudy: boolean;
}) => {
  const afterSchoolPeriod: string[] = [
    "6교시",
    "7교시",
    "8교시",
    "9교시",
    "10교시",
  ];
  const selfStudyPeriod: string[] = ["8교시", "9교시", "10교시"];
  const period: string[] = isSelfStudy ? selfStudyPeriod : afterSchoolPeriod;

  return (
    <StudentListHeaderContainer>
      <ClassName width={isSelfStudy ? "136px" : "140px"}>{className}</ClassName>
      {period.map((period, idx) => (
        <PeriodBox key={idx} width={isSelfStudy ? "260px" : "148px"}>
          {period}
        </PeriodBox>
      ))}
    </StudentListHeaderContainer>
  );
};

interface DropDownsProps {
  setClassName: React.Dispatch<React.SetStateAction<string>>;
}

const DropDowns = ({ setClassName }: DropDownsProps) => {
  const [floorDropDownResult, setFloorDropDownResult] = useState<ItemType>({
    option: "층",
    id: "TITLE",
  });
  const [classDropDownResult, setClassDropDownResult] = useState<ItemType>({
    option: "교실",
    id: "TITLE",
  });
  const [isCalendarActive, setIsCalendarActive] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setClassName(classDropDownResult.option);
  }, [classDropDownResult]);

  useEffect(() => {
    setIsCalendarActive(false);
  }, [date]);

  let year: number | string = date.getFullYear();
  let month: number | string = date.getMonth();
  month += 1;
  if (month <= 9) {
    month = "0" + month;
  }
  let day: number | string = date.getDate();
  if (day <= 9) {
    day = "0" + day;
  }

  const parsedDate: string = year + "-" + month + "-" + day;

  return (
    <BtnsContainer>
      <ExcelPrintBtn>엑셀 출력하기</ExcelPrintBtn>
      <DropDown
        title="층"
        dropDownItem={floorDropDownItem}
        setResult={setFloorDropDownResult}
      />
      <DropDown
        title="교실"
        dropDownItem={classDropDownItem}
        setResult={setClassDropDownResult}
      />
      <DateInput onClick={() => setIsCalendarActive(true)}>
        {parsedDate} <Image src={CalendarIcon} alt="" />
      </DateInput>
      {isCalendarActive && <ReactCalender setDate={setDate} dateState={date} />}
    </BtnsContainer>
  );
};

interface ReactCalendarProps {
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  dateState: Date;
}

const ReactCalender = ({ setDate, dateState }: ReactCalendarProps) => {
  const [value, onChange] = useState<Date>(dateState);
  useEffect(() => {
    setDate(value);
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
  font-size: 24px;
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
