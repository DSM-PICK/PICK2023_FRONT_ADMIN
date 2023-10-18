import { DataType } from "@/pages/change-teacher";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import ChangeType from "./changeType";
import ChangeTeacherModal from "./modal";
import TeacherBlock from "./teacher";
const months = [
  {
    name: "January",
    days: 31,
  },
  {
    name: "February",
    days: new Date().getFullYear() % 4 === 0 ? 29 : 28,
  },
  {
    name: "March",
    days: 31,
  },
  {
    name: "April",
    days: 30,
  },
  {
    name: "May",
    days: 31,
  },
  {
    name: "June",
    days: 30,
  },
  {
    name: "July",
    days: 31,
  },
  {
    name: "August",
    days: 31,
  },
  {
    name: "September",
    days: 30,
  },
  {
    name: "October",
    days: 31,
  },
  {
    name: "November",
    days: 30,
  },
  {
    name: "December",
    days: 31,
  },
];

const Days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export type DayType = "SELF_STUDY" | "AFTER_SCHOOL" | "CLUB" | "";

interface Props {
  monthIndex: number;
  data: DataType;
  refetch: () => void;
}

export interface CalendarType {
  type: string;
  day: number;
  class: string;
  teacher: string[];
}
[];

interface MonthType {
  name: string;
  days: number;
}

const TeacherCalendar = ({ monthIndex, data, refetch }: Props) => {
  const month = monthIndex - 1;
  const [currentMonth, setCurrentMonth] = useState<MonthType>(months[month]);
  const [prevMonth, setPrevMonth] = useState<MonthType>(
    month < 2 ? months[11] : months[month - 1]
  );
  const [calendarDays, setCalendarDays] = useState<CalendarType[]>([]);
  const emptyTeacher = ["", "", "", "", ""];
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [addSelfSudyTeacherModalDay, setAddSelfSudyTeacherModalDay] =
    useState<number>(0);
  const [addSelfSudyTeacherModalMonth, setAddSelfSudyTeacherModalMonth] =
    useState<number>(0);

  useEffect(() => {
    const current = months[month];
    const prev = months[month - 1] || months[11];
    setCurrentMonth(current);
    setPrevMonth(prev);
  }, [month]);

  useEffect(() => {
    const firstDayOfMonth = new Date(
      currentMonth.name + " 1, " + new Date().getFullYear()
    ).getDay();
    const prevMonthDays = prevMonth.days - firstDayOfMonth + 1;
    const thisMonthDays = currentMonth.days;
    const nextMonthDays = 41 - (prevMonth.days - prevMonthDays + thisMonthDays);
    let days: CalendarType[] = [];
    const date = new Date();
    const year = date.getFullYear();
    const getDate = (month: number, date: number) => {
      if (!month || !date) return "null";
      return `${year}-${month.toString().padStart(2, "0")}-${date
        .toString()
        .padStart(2, "0")}`;
    };
    for (let i = prevMonthDays; i <= prevMonth.days; i++) {
      const teacher = data.past.get(getDate(monthIndex - 1, i));
      days.push({
        type: teacher?.type || "",
        day: i,
        teacher: teacher ? teacher.teacher : emptyTeacher,
        class: "prev-month",
      });
    }
    for (let i = 1; i <= thisMonthDays; i++) {
      const teacher = data.present.get(getDate(monthIndex, i));
      days.push({
        type: teacher?.type || "",
        day: i,
        teacher: teacher ? teacher.teacher : emptyTeacher,
        class: "current-month",
      });
    }
    for (let i = 1; i <= nextMonthDays; i++) {
      const teacher = data.future.get(getDate(monthIndex + 1, i));
      days.push({
        type: teacher?.type || "",
        day: i,
        teacher: teacher ? teacher.teacher : emptyTeacher,
        class: "next-month",
      });
    }
    setCalendarDays(days);
  }, [currentMonth, prevMonth, data]);

  const addAfterShcoolTeacher = (day: number, month: number) => {
    setAddSelfSudyTeacherModalDay(day);
    setAddSelfSudyTeacherModalMonth(month);
    setIsActiveModal(true);
  };

  return (
    <>
      <Wrapper>
        <table>
          <thead>
            <tr>
              {Days.map((value) => (
                <th key={value}>
                  <p>{value}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {new Array(6).fill(0).map((_, index) => (
              <tr key={index}>
                {calendarDays.slice(index * 7, (index + 1) * 7).map((value) => {
                  const month =
                    value.class == "prev-month"
                      ? monthIndex - 1
                      : value.class == "next-month"
                      ? monthIndex + 1
                      : monthIndex;
                  return (
                    <td className={value.class} key={value.day}>
                      <DayBlockHeader>
                        <p
                          onClick={() =>
                            addAfterShcoolTeacher(value.day, month)
                          }
                        >
                          {value.day}
                        </p>
                        <ChangeType
                          refetch={refetch}
                          value={value}
                          date={{
                            day: value.day,
                            month: month,
                          }}
                        />
                      </DayBlockHeader>
                      <TeacherList>
                        {value.teacher &&
                          value.teacher.slice(1, 4).map((teacher, idx) => {
                            return (
                              teacher && (
                                <TeacherBlock
                                  refetch={refetch}
                                  teachers={value.teacher}
                                  date={{
                                    month: month,
                                    day: value.day,
                                  }}
                                  floor={idx + 2}
                                  key={value.day + value.class + idx}
                                  name={teacher}
                                />
                              )
                            );
                          })}
                      </TeacherList>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Wrapper>
      {isActiveModal && (
        <ChangeTeacherModal
          date={{
            month: addSelfSudyTeacherModalMonth,
            day: addSelfSudyTeacherModalDay,
          }}
          floor={1}
          teacher={"선생님을 추가해주세요"}
          setToggle={setIsActiveModal}
          refetch={() => refetch}
          isAdd={true}
        />
      )}
    </>
  );
};

export default TeacherCalendar;

const DayBlockHeader = styled.div`
  width: 100%;
  padding: 0 4px;
  height: fit-content;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: fit-content;
  height: 100%;
  border-radius: 16px;
  border-collapse: collapse;
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  table {
    width: 100%;
    height: 100%;
    display: table;
    table-layout: fixed;
  }
  thead {
    width: 100%;
    height: 40px;
  }
  tbody {
    background: rgba(249, 247, 250, 0.5);
    > tr {
      height: 16.6%;
    }
  }
  th {
    display: table-cell;
    border: 2px solid ${({ theme }) => theme.colors.gray200};
    border-top: none;
    > p {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  td {
    border: 2px solid ${({ theme }) => theme.colors.gray200};
    border-bottom: none;
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    :hover {
      background-color: ${({ theme }) => theme.colors.gray100};
    }
  }
  td:not(.current-month) {
    color: ${({ theme }) => theme.colors.gray500};
  }
  td:first-child,
  th:first-child {
    border-left: none;
  }
  td:last-child,
  th:last-child {
    border-right: none;
  }
  tr {
    width: 100%;
  }
`;

const TeacherList = styled.div`
  width: 100%;
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 0;
`;
