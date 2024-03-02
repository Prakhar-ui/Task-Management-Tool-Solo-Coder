import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
 
const Events = styled.div`
  display: grid;
  grid-template-rows: repeat(24, 60px);
  border-radius: 5px;
  background: #fff1f8;
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
  grid-row-start: ${(props) => props.start};
  grid-row-end: ${(props) => props.end};
  overflow: hidden;
  white-space: nowrap;
`;

const Title = styled.p`
  font-weight: 600;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function WeeklyTaskInfo({ day }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/getTaskByDate/${day}`
        );
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [day]);

  return (
    <Events>
      {tasks.map((task, index) => (
        <Event
          key={index}
          start={task.startTime.hour + 1}
          end={task.endTime.hour + 1}
        >
          <Title>{task.title}</Title>
          <Description>{task.description}</Description>
        </Event>
      ))}
    </Events>
  );
}

export default WeeklyTaskInfo;
