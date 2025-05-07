import { useState } from "react";


import DateTimePicker from "../../../components/common/datepicker/DateTimePicker";


const SmallCalendar = () => {
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(null);
   const onChange = (dates) => {
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
