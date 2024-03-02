import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import WeeklyTaskInfo from "./WeeklyTaskInfo";
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
  width: 100%;
  padding-top: 120px;
`;

const Timeline = styled.div`
  display: grid;
  grid-template-rows: repeat(24, 60px);
`;

const Days = styled.div`
  display: grid;
  grid-column: 2;
  gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const DateContainer = styled.div`
  display: flex;
  gap: 1em;
  height: 60px;
`;

const DateNum = styled.p`
  font-size: 3rem;
  font-weight: 600;
  display: inline;
  height: 60px;
`;

const DateDay = styled.p`
  display: inline;
  font-size: 3rem;
  font-weight: 100;
  height: 60px;
`;

function WeeklyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const formatDayAndDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const formatDay = (inputDate) => {
    const date = new Date(inputDate);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${dayOfWeek}`;
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysOfWeek = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      days.push(date);
    }

    return days;
  };

  return (
    <div>
      <Navbar />
      <ButtonContainer>
        <IconButton icon={faAngleDoubleLeft} onClick={goToPreviousMonth} />
        <IconButton icon={faAngleLeft} onClick={goToPreviousWeek} />
        <DateRange>
          {formatDayAndDate(getDaysOfWeek()[0])} -{" "}
          {formatDayAndDate(getDaysOfWeek()[6])}
        </DateRange>
        <IconButton icon={faAngleRight} onClick={goToNextWeek} />
        <IconButton icon={faAngleDoubleRight} onClick={goToNextMonth} />
      </ButtonContainer>
      <CalendarWrapper>
        <Timeline>
          <div className="spacer"></div>
          {[...Array(24)].map((_, index) => (
            <div key={index} className="time-marker">
              {index === 0
                ? "12 AM"
                : index % 12 === 0
                ? "12 PM"
                : `${index % 12} ${index < 12 ? "AM" : "PM"}`}
            </div>
          ))}
        </Timeline>
        <Days>
          {getDaysOfWeek().map((day, index) => (
            <div className="day" key={index}>
              <DateContainer className="date">
                <DateNum className="date-num">{day.getDate()}</DateNum>
                <DateDay className="date-day">{formatDay(day)}</DateDay>
              </DateContainer>
              <WeeklyTaskInfo day={formatDate(day)} />
            </div>
          ))}
        </Days>
      </CalendarWrapper>
    </div>
  );
}

export default WeeklyCalendar;
