import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MonthlyCalendar from "./MonthlyCalendar";
import WeeklyCalendar from "./WeeklyCalendar";
import CreateEvent from "./CreateEvent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly-calendar" element={<MonthlyCalendar />} />
        <Route path="/weekly-calendar" element={<WeeklyCalendar />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
};

export default App;
