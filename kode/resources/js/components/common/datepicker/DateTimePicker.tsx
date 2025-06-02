import React from "react";
import DatePicker from "react-datepicker";

import type { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

interface DateTimePickerProps extends ReactDatePickerProps {
  className?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    className = "",
    ...props
}) => {
    const attributes = {
        ...props,
        className: `form-control w-full ${className || ""}`,
    };

    return (
        <DatePicker
            {...attributes}
            // icon={<LuCalendarDays />}
            // showIcon={true}
        />
    );
};

export default DateTimePicker;
