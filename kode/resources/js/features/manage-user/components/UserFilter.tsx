import { useState } from "react";
import { BsCalendar2Range } from "react-icons/bs";
import { LuFilter, LuRefreshCw } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import DateTimePicker from "../../../components/common/datepicker/DateTimePicker";
import Field from "../../../components/common/from/Field";
import SelectBox from "../../../components/common/from/SelectBox";

const options = [
    { value: 11, label: 'Berk Glover' },
    { value: 10, label: 'Timothy Weaver' },
]

const UserFilter = ({ roles, onReset }) => {

    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        null,
        null,
    ]);

    const [startDate, endDate] = dateRange;

    const handleDateChange = (date: [Date | null, Date | null]) => {
        setDateRange(date);
    };

    const [selectInput, setSelectInput] = useState({
        'role_id': "",
    })

    const handleSelectChange = (option, key) => {
        setSelectInput((prevState) => {
            return {
                ...prevState,
                [key]: option
            }
        })

    }

    const formatDateRange = () => {
        if (!startDate || !endDate) return "";
        const formatDate = (date: Date) => {
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        };
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    return (
        <div className="d-flex justify-content-start align-items-center flex-wrap gap-3">
            <div className="flex-grow-1">
                <Field>
                    <input
                        type="search"
                        id="search"
                        name="search"
                        placeholder="Search by name or email"
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
                            placeholderText="Select date range"
                        />

                        <input type="hidden" name="date" value={formatDateRange()} />
                    </div>
                </Field>
            </div>

            <Field>
                <SelectBox
                    options={roles}
                    name="role_id"
                    placeholder={"Search by role"}
                    size="lg"
                    id="role_id"
                    value={selectInput.role_id}
                    onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, "role_id")
                    }
                />
            </Field>

            <div className="d-flex align-items-center gap-2">
                <Button
                    iconBtn={true}
                    tooltipText="Filter"
                    icon={LuFilter}
                    type="submit"
                    className="dark-soft hover btn-md rounded-circle fs-18"
                />
                <Button
                    iconBtn={true}
                    tooltipText="Reset"
                    icon={LuRefreshCw}
                    type="button"
                    onClick={() => onReset(setDateRange, setSelectInput)}
                    className="danger-soft hover btn-md rounded-circle fs-18"
                />
            </div>
        </div>

    );
};

export default UserFilter