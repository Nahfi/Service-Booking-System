import { useState } from "react";
import { BsCalendar2Range } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";
import Button from "../button/Button";
import DateTimePicker from "../datepicker/DateTimePicker";
import Field from "../from/Field";

interface FilterProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Filter: React.FC<FilterProps> = ({ className = "", ...props }) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        new Date(),
        null,
    ]);
    const [startDate, endDate] = dateRange;

    const attributes = {
        ...props,
        className: `filter-form ${className || ""}`,
    };

    const handleDateChange = (date: [Date | null, Date | null]) => {
        setDateRange(date);
    };

    return (
        <form {...attributes}>
            <div className="d-flex justify-content-start align-items-center flex-wrap gap-3">
                <div className="flex-grow-1">
                    <Field>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            placeholder="Search contacts"
                            className="form-control h-40"
                        />
                    </Field>
                </div>

                <div className="flex-grow-1">
                    <Field className="date-range-wrapper">
                        <div className="field-with-icon w-full">
                            <BsCalendar2Range className="field-icon" />
                            <DateTimePicker
                                className="form-control w-full h-40"
                                selectsRange={true}
                                onChange={(date) =>
                                    handleDateChange(
                                        date as [Date | null, Date | null]
                                    )
                                }
                                startDate={startDate}
                                endDate={endDate}
                                required
                            />
                        </div>
                    </Field>
                </div>

                <div className="flex-grow-1">
                    <Field>
                        <select
                            className="form-select h-40"
                            id="country"
                            aria-label="country"
                        >
                            <option defaultValue>Status</option>
                            <option value="1">Active</option>
                            <option value="2">Deactive</option>
                            <option value="3">Pending</option>
                        </select>
                    </Field>
                </div>

                <Button
                    iconBtn={true}
                    tooltipText="Filter"
                    icon={LuFilter}
                    className="dark-soft btn-ghost hover btn-md rounded-circle fs-18"
                />
            </div>
        </form>
    );
};

export default Filter;
