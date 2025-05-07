import React from "react";
import { getDaysOfWeek, normalizeDate } from "../../../utils/helper";
import EventCard from "./EventCard";

const days = getDaysOfWeek();

const WeeklyCalendar = ({ currentDate, viewMode }) => {

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 1;
    return `${hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
  });

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return normalizeDate(d);
  };

  const weekStart = getWeekStart(currentDate);
    
  const weekDates = Array.from({ length: days.length }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return {
      date: d,
      day: d.getDate(),
    };
  });

  const today = normalizeDate(new Date());

  return (
    <div className="weekly-calendar">
      <div className="weekly-grid">
        {/* Time column */}
        <div className="time-column">
          <div className="time-header"></div>
          {timeSlots.map((time, index) => (
            <div key={`time-${index}`} className="time-slot">
              {time}
            </div>
          ))}
        </div>

        {/* Days and events */}
        {weekDates.map((date, index) => {
          const isToday =
            normalizeDate(date.date).getTime() === today.getTime();

          return (
            <div key={`day-${index}`} className="day-column">
              <div className={`day-header ${isToday ? "today-header" : ""}`}>
                <div className="day-info d-flex align-items-center justify-content-center">
                  <span className="day-name">{days[index]}</span>
                  <span
                    className={`day-number ${isToday ? "text-primary" : ""}`}
                  >
                    {date.day}
                  </span>
                </div>
              </div>
              <div className="events-container">
                {/* Example event - replace with actual event data */}
                {isToday && (
                  <div
                    className="event-slot"
                  >
                    <EventCard />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
