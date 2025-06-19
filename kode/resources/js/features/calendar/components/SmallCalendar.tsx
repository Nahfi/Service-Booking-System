import React, { useState } from "react";

import DateTimePicker from "../../../components/common/datepicker/DateTimePicker";

const SmallCalendar: React.FC = () => {
   const [startDate, setStartDate] = useState<Date | null>(new Date());
   const [endDate, setEndDate] = useState<Date | null>(null);
   const onChange = (dates: [Date | null, Date | null]) => {
       const [start, end] = dates;
       setStartDate(start);
       setEndDate(end);
   };
  return (
    <DateTimePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default SmallCalendar;
