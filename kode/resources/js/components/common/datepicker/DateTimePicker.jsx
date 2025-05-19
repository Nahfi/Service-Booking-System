import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

const DateTimePicker = ({ ...props }) => {
   const attributes = {
     ...props,
     className: `form-control w-full ${props.className || ""}`,
   };

  
  return (
    <DatePicker
      {...attributes}
      // icon={<LuCalendarDays />}
      // showIcon={true}
    />
  );
};

export default DateTimePicker