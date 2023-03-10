import { DataType } from "@/pages/changeTeacher";
import { SelfStudyTeacherType } from "@/utils/api/selfStudy";
import { media } from "@/utils/functions/media";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
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

interface Props {
  monthIndex: number;
  data: DataType;
  refetch: () => void;
}

interface CalendarType {
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
        day: i,
        teacher: teacher ? teacher.teacher : emptyTeacher,
        class: "prev-month",
      });
    }
    for (let i = 1; i <= thisMonthDays; i++) {
      const teacher = data.present.get(getDate(monthIndex, i));
      days.push({
        day: i,
        teacher: teacher ? teacher.teacher : emptyTeacher,
        class: "current-month",
      });
    }
    for (let i = 1; i <= nextMonthDays; i++) {
      const teacher = data.future.get(getDate(monthIndex + 1, i));
      days.push({
        day: i,
        teacher: teacher ? teacher.teacher : emptyTeacher,
        class: "next-month",
      });
    }
    setCalendarDays(days);
  }, [currentMonth, prevMonth, data]);

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
                {calendarDays.slice(index * 7, (index + 1) * 7).map((value) => (
                  <td className={value.class} key={value.day}>
                    {value.day}
                    <TeacherList>
                      {value.teacher &&
                        value.teacher.slice(1, 4).map((teacher, idx) => {
                          const month =
                            value.class == "prev-month"
                              ? monthIndex - 1
                              : value.class == "next-month"
                              ? monthIndex + 1
                              : monthIndex;
                          return (
                            teacher && (
                              <TeacherBlock
                                refetch={refetch}
                                date={{
                                  month: month,
                                  day: value.day,
                                }}
                                floor={idx + 1}
                                key={value.day + value.class + idx}
                                name={teacher}
                                disable={value.class !== "current-month"}
                              />
                            )
                          );
                        })}
                    </TeacherList>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

export default TeacherCalendar;

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
