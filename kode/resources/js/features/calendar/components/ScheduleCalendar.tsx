import React, { useEffect, useState } from "react";

import { getDateRangesForYearAndMonth } from "../utils/helper";
import CalendarHeader from "./CalendarHeader";
import "./custom-calendar.scss";
import MonthlyCalendar from './MonthlyCalendar';

const { monthStart, monthEnd } = getDateRangesForYearAndMonth();
const filterObject = { date:`${monthStart}-${monthEnd}`};

const ScheduleCalendar: React.FC = ({ modal }) => {
  const { openModal, closeModal, modalUid, modalConfig } = modal;

  const [filters, setFilters] = useState(filterObject);

  const baseDate = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(baseDate);

  useEffect(() => {
    const { monthStart: monthStartDate, monthEnd: monthEndDate } =
      getDateRangesForYearAndMonth(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1
      );
    setFilters({ date: `${monthStartDate}-${monthEndDate}` });
  }, [currentDate]);


  return (
    <div className="calendar-wrapper scroll scroll-3">
      <CalendarHeader actions={{
        modal: { fn: openModal, modalUid },
        dateSwitch: { setCurrentDate, currentDate, setFilters }
      }}
      />

      <div className="calendar-body">
        <MonthlyCalendar
          currentDate={currentDate}
          modal={{ fn: openModal, modalUid }}
        />
      </div>
    </div>
  );
}

export default ScheduleCalendar