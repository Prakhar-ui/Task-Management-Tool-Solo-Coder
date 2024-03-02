import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Events = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #fff1f8;
  margin-bottom: 0.5rem;
  height: 100%;
`;

const Event = styled.div`
  border: 1px solid #f2d3d8;
  border-radius: 5px;
  padding: 0;
  padding-left: 0.5rem;
  margin: 0.5rem 0.5rem 0 0.5rem; /* Added top margin */
  background: ${(props) => {
    const colors = ["#ffd6d1", "#fafaa3", "#e2f8ff", "#d1ffe6"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }};
  overflow: hidden;
  white-space: nowrap;
`;

const DateNum = styled.p`
  font-size: 2rem;
  font-weight: 600;
  display: inline;
  text-align: center;
`;

const Title = styled.p`
  font-weight: 600;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function MonthlyTaskInfo({ day }) {
  const [tasks, setTasks] = useState([]);

  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (day) {
          const response = await axios.get(
            `http://localhost:4000/getTaskByDate/${day}`
          );
          const sortedTasks = response.data.sort((a, b) => {
            const startTimeA = a.startTime.hour * 60 + a.startTime.minute;
            const startTimeB = b.startTime.hour * 60 + b.startTime.minute;
            return startTimeA - startTimeB;
          });
          setTasks(sortedTasks);
        } else {
          setTasks([]); // Reset tasks if day is null
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [day]);

  const getMinTime = () => {
    if (tasks.length === 0) return null;
    const startTimes = tasks.map((task) => task.startTime).filter(Boolean); // Filter out null values
    if (startTimes.length === 0) return null; // No valid start times found

    // Custom sorting function
    startTimes.sort((a, b) => {
      if (a.hour !== b.hour) {
        return a.hour - b.hour; // Sort by hour
      } else if (a.minute !== b.minute) {
        return a.minute - b.minute; // Sort by minute
      } else {
        return a.second - b.second; // Sort by second
      }
    });

    // Retrieve the minimum task after sorting
    const minStartTime = startTimes[0];

    // Format the time as "hh:mm:ss AM/PM"
    const formattedHour = minStartTime.hour.toString().padStart(2, "0");
    const ampm = minStartTime.hour >= 12 ? "PM" : "AM";
    const formattedMinStartTime = `${formattedHour}:${minStartTime.minute
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return formattedMinStartTime;
  };

  const getMaxTime = () => {
    if (tasks.length === 0) return null;
    const endTimes = tasks.map((task) => task.endTime).filter(Boolean); // Filter out null values
    if (endTimes.length === 0) return null; // No valid start times found

    // Custom sorting function
    endTimes.sort((a, b) => {
      if (b.hour !== a.hour) {
        return b.hour - a.hour; // Sort by hour
      } else if (b.minute !== a.minute) {
        return b.minute - a.minute; // Sort by minute
      } else {
        return b.second - a.second; // Sort by second
      }
    });

    // Retrieve the minimum task after sorting
    const minStartTime = endTimes[0];

    // Format the time as "hh:mm:ss AM/PM"
    const formattedHour = minStartTime.hour.toString().padStart(2, "0");
    const ampm = minStartTime.hour >= 12 ? "PM" : "AM";
    const formattedMinStartTime = `${formattedHour}:${minStartTime.minute
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return formattedMinStartTime;
  };

  const getTotalTasks = () => {
    return tasks.length;
  };

  const getTotalFreeTime = () => {
    const totalAvailableTime = 16 * 60;
    const totalTaskDuration = tasks.reduce((total, task) => {
      const startTime = task.startTime.hour * 60 + task.startTime.minute;
      const endTime = task.endTime.hour * 60 + task.endTime.minute;
      const duration = endTime - startTime; // Duration of each task in milliseconds
      return total + duration;
    }, 0);
    const totalFreeTime = totalAvailableTime - totalTaskDuration;
    const hours = Math.floor(totalFreeTime / 60);
    const minutes = totalFreeTime % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <Events>
      {day && <DateNum>{formatDate(day)}</DateNum>}
      <Event>
        {getTotalTasks() == 0 ? (
          <Title>No Task Scheduled</Title>
        ) : (
          <>
            <Title>
              Number of Tasks: {getTotalTasks()} {"->"}
            </Title>
            <Title>Starting: {getMinTime()}</Title>
            <Title>Ending: {getMaxTime()}</Title>
            <Title>Total Free Time: {getTotalFreeTime()}</Title>
          </>
        )}
      </Event>
    </Events>
  );
}

export default MonthlyTaskInfo;
