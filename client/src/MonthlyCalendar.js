import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import MonthlyTaskInfo from "./MonthlyTaskInfo";
import Navbar from "./Navbar";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  margin: 0 auto;
  position: fixed;
  width: 100%;
  margin-top:70px;
`;

const DateRange = styled.div`
  font-size: 2em;
`;

const IconButton = styled(FontAwesomeIcon)`
  font-size: 2em;
`;

const CalendarWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  margin: 0 2rem 2rem 2rem;
  font-family: system-ui, sans-serif;
  padding-top: 120px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledHead = styled.thead``;

const StyledRow = styled.tr``;

const StyledHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
`;

const StyledBody = styled.tbody``;

const StyledCell = styled.td`
  padding: 5px;
  height: 200px;
  width: 100%;
`;

function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const daysInMonth = getDaysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const startDayOfMonth = getStartDayOfMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const days = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDayOfMonth) {
          week.push("");
        } else if (day > daysInMonth) {
          week.push("");
        } else {
          // Constructing a new Date object with the year, month, and day
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          // Formatting the date
          week.push(formatDate(date));
          day++;
        }
      }
      days.push(week);
      if (day > daysInMonth) break;
    }
    setDaysArray(days);
  }, [currentDate]);

  const goToPreviousYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const goToNextYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const formatDayMonthYear = (inputDate) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[inputDate.getMonth()]} ${inputDate.getFullYear()}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const [daysArray, setDaysArray] = useState([]);

  return (
    <div>
      <Navbar />
      <ButtonContainer>
        <IconButton icon={faAngleDoubleLeft} onClick={goToPreviousYear} />
        <IconButton icon={faAngleLeft} onClick={goToPreviousMonth} />
        <DateRange>{formatDayMonthYear(currentDate)}</DateRange>
        <IconButton icon={faAngleRight} onClick={goToNextMonth} />
        <IconButton icon={faAngleDoubleRight} onClick={goToNextYear} />
      </ButtonContainer>
      <CalendarWrapper>
        <StyledTable>
          <StyledHead>
            <StyledRow>
              <StyledHeaderCell>Sunday</StyledHeaderCell>
              <StyledHeaderCell>Monday</StyledHeaderCell>
              <StyledHeaderCell>Tuesday</StyledHeaderCell>
              <StyledHeaderCell>Wednesday</StyledHeaderCell>
              <StyledHeaderCell>Thursday</StyledHeaderCell>
              <StyledHeaderCell>Friday</StyledHeaderCell>
              <StyledHeaderCell>Saturday</StyledHeaderCell>
            </StyledRow>
          </StyledHead>
          <StyledBody>
            {daysArray.map((week, weekIndex) => (
              <StyledRow key={weekIndex}>
                {week.map((date, dayIndex) => (
                  <StyledCell key={dayIndex}>
                    {date && <MonthlyTaskInfo day={date} />}
                  </StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
      </CalendarWrapper>
    </div>
  );
}

export default MonthlyCalendar;
