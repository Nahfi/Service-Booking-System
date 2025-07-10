import React, { useState } from "react";
import { getWeekRanges } from "../../../utils/helper";
import CalendarHeader from "./CalendarHeader";
import "./custom-calendar.scss";
import MonthlyCalendar from './MonthlyCalendar';
import WeeklyCalendar from "./WeeklyCalendar";

type ViewMode = "monthly" | "weekly";

const { weekStart: currentWeekStart, weekEnd: currentWeekEnd } = getWeekRanges();

const CustomCalendar: React.FC = ({ modal }) => {
  
  const { openModal, closeModal, modalUid, modalConfig } = modal;

  const baseDate = new Date();

  const [currentDate, setCurrentDate] = useState<Date>(baseDate);
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");

  const handleCalendarMode = (type: ViewMode) => {
    setViewMode(type);
  };


  return (
    <div className="calendar-wrapper scroll scroll-3">
      <CalendarHeader actions={{
        modal: { fn: openModal, modalUid },
        switchView: { fn: handleCalendarMode, viewMode },
      }}
      />

      <div className="calendar-body">
        {viewMode === "weekly" ? (
          <WeeklyCalendar currentDate={currentDate} viewMode={viewMode} />
        ) : (
          <MonthlyCalendar
            currentDate={currentDate}
              modal={{ fn: openModal ,modalUid}}
          />
        )}
      </div>
    </div>
  );
}

export default CustomCalendar