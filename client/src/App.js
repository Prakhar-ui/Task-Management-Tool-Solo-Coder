import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MonthlyCalendar from "./MonthlyCalendar";
import WeeklyCalendar from "./WeeklyCalendar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly-calendar" element={<MonthlyCalendar />} />
        <Route path="/weekly-calendar" element={<WeeklyCalendar />} />
      </Routes>
    </Router>
  );
};

export default App;
