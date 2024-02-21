// TaskLengthForm.js
import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import "./css/TaskForm.css";


function TaskLengthForm() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const calculateTotalSeconds = (event) => {
    event.preventDefault();
    const totalHoursInSeconds = hours * 3600;
    const totalMinutesInSeconds = minutes * 60;
    const totalSeconds = totalHoursInSeconds + totalMinutesInSeconds + seconds;
    setTotalSeconds(totalSeconds);
  };

  

  return (
    <div className="task-length-form">
      <h2>Task Form</h2>
      <Form className="col-md-6 offset-md-3" onSubmit={calculateTotalSeconds}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Timer</Form.Label>

          <div>
            <Form.Label className="fw-bold">Hours</Form.Label>
            <Form.Control
              type="number"
              name="hours"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value, 10))}
              min="0"
              placeholder="Hours"
              className="me-2"
            />
          </div>

          <div>
            <Form.Label className="fw-bold">Minutes</Form.Label>
            <Form.Control
              type="number"
              name="minutes"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
              min="0"
              max="59"
              placeholder="Minutes"
              className="me-2"
            />
          </div>

          <div>
            <Form.Label className="fw-bold">Seconds</Form.Label>
            <Form.Control
              type="number"
              name="seconds"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
              min="0"
              max="59"
              placeholder="Seconds"
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Calculate Total Seconds
        </Button>
      </Form>
      <p>Total Seconds: {totalSeconds}</p>
    </div>
  );
}


export default TaskLengthForm;
