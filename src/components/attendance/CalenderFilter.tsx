import styled from "@emotion/styled";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>;
  dateState: Date;
}

const CalenderFilter = ({ setCalendarDate, dateState }: Props) => {
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

export default CalenderFilter;
