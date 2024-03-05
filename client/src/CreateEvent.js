import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Form, Button, Row, Col } from "react-bootstrap";
import moment from "moment-timezone";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTimeHour: "",
    startTimeMinute: "",
    timezone: "",
    recurrence: "",
    freeTime: "",
  });

  const [timezones, setTimezones] = useState([]);
  const [currentTimezone, setCurrentTimezone] = useState("");
  const [useCurrentTimezone, setUseCurrentTimezone] = useState(false);
  const [allDay, setAllDay] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    const allTimezones = moment.tz.names();
    const timezoneObjects = allTimezones.map((tz) => {
      const offset = moment.tz(tz).format("Z");
      return {
        name: tz,
        offset: offset !== "Z" ? offset : "+00:00", // handle 'Z' (UTC) offset
      };
    });

    const guessedTimezone = moment.tz.guess();
    const offset = moment.tz(guessedTimezone).format("Z");
    const gmtOffset = offset !== "Z" ? `(GMT${offset})` : "(GMT+00:00)";
    setCurrentTimezone(`${gmtOffset} ${guessedTimezone}`);

    // Sort timezones by GMT offset
    timezoneObjects.sort((a, b) => {
      const offsetA = parseInt(a.offset.replace(":", ""), 10);
      const offsetB = parseInt(b.offset.replace(":", ""), 10);
      return offsetA - offsetB;
    });
    setTimezones(timezoneObjects);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend
      console.log("Form data:", formData);
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  const handleUseCurrentTimezoneChange = (checked) => {
    if (checked) {
      const guessedTimezone = moment.tz.guess();
      const offset = moment.tz(guessedTimezone).format("Z");
      const gmtOffset = offset !== "Z" ? `(GMT${offset})` : "(GMT+00:00)";
      setFormData({
        ...formData,
        timezone: `${gmtOffset} ${guessedTimezone}`,
      });
      setCurrentTimezone(`${gmtOffset} ${guessedTimezone}`);
    } else {
      setFormData({
        ...formData,
        timezone: "",
      });
      setCurrentTimezone("");
    }
    setUseCurrentTimezone(checked);
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Add Title"
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <br />
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleChange("date", date)}
                dateFormat="EEEE, MMMM d"
                placeholderText="Select date"
              />
            </Form.Group>
          </Col>
          {!allDay && (
            <>
              <Col>
                <Form.Group controlId="formStartTimeHour">
                  <Form.Label>Duration in Hour:</Form.Label>
                  <Form.Control
                    as="select"
                    name="startTimeHour"
                    value={formData.startTimeHour}
                    onChange={handleChange}
                  >
                    {[...Array(24)].map((_, index) => (
                      <option key={index}>{index}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formStartTimeMinute">
                  <Form.Label>Duration in Minute:</Form.Label>
                  <Form.Control
                    as="select"
                    name="startTimeMinute"
                    value={formData.startTimeMinute}
                    onChange={handleChange}
                  >
                    {[0, 15, 30, 45].map((minute) => (
                      <option key={minute}>{minute}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </>
          )}
        </Row>

        <Form.Group controlId="formAllDay">
          <Form.Check
            type="checkbox"
            label="All Day"
            name="allDay"
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formUseCurrentTimezone">
              <Form.Check
                type="checkbox"
                label="Use Current Timezone"
                name="useCurrentTimezone"
                checked={useCurrentTimezone}
                onChange={(e) =>
                  handleUseCurrentTimezoneChange(e.target.checked)
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTimezone">
              <Form.Label>Timezone:</Form.Label>
              <Form.Control
                as="select"
                name="timezone"
                value={currentTimezone}
                onChange={(e) => setCurrentTimezone(e.target.value)}
              >
                {currentTimezone !== "" ? (
                  <option value={currentTimezone}>{currentTimezone}</option>
                ) : (
                  <option value="">Select Timezone</option>
                )}
                {timezones.map((tz) => (
                  <option
                    key={tz.name}
                  >{`(GMT${tz.offset}) ${tz.name}`}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formRecurrence">
          <Form.Label>Recurrence:</Form.Label>
          <Form.Control
            as="select"
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
          >
            {/* Add recurrence options */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formFreeTime">
          <Form.Label>Free Time:</Form.Label>
          <Form.Control
            as="select"
            name="freeTime"
            value={formData.freeTime}
            onChange={handleChange}
          >
            {/* Add free time options */}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
    </div>
  );
}

export default CreateEvent;
