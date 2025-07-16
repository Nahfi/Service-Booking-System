import React from "react";

import DateTimePicker, { CustomDatePickerHeader } from "../../../components/common/datepicker/DateTimePicker";

const SmallCalendar: React.FC = ({ dateFilter }) => {
   
  const { startDate, endDate, handleDateChange } = dateFilter;
  
  return (
    <DateTimePicker
      renderCustomHeader={CustomDatePickerHeader}
      selected={startDate}
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default SmallCalendar;
