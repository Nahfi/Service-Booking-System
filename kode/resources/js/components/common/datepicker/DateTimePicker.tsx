import React from "react";
import DatePicker from "react-datepicker";

import type { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Button from "../button/Button";
import "./datepicker.scss";

interface DateTimePickerProps extends ReactDatePickerProps {
  className?: string;
}


export const CustomDatePickerHeader = ({
    monthDate,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}) => (
    <div className="d-flex align-items-center justify-content-between gap-2 w-full">
        <Button iconBtn={true} icon={LuChevronLeft} className="fs-20 text-muted"
            onClick={decreaseMonth} disabled={prevMonthButtonDisabled}
        />
        <h6 className="fs-13">
            {monthDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
            })}
        </h6>
        <Button iconBtn={true} icon={LuChevronRight} className="fs-20 text-muted"
            onClick={increaseMonth} disabled={nextMonthButtonDisabled}
        />
    </div>
);

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
