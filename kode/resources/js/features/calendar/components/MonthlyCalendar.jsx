import React, { useRef, useState } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { BsPencilSquare, BsPlus, BsTrash3 } from "react-icons/bs";
import {
  getDaysOfWeek,
  getFirstDayOfMonth,
  getFormattedSchedule,
  getLastDayOfMonth,
  getTotalDasyOfMonth,
  normalizeDate
} from "../../../utils/helper";

import Button from "../../../components/common/button/Button";
import EventCard from './EventCard';

const days = getDaysOfWeek();

const MonthlyCalendar = ({ currentDate, onModalShow }) => {
  const scheduleList = [];
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const lastDayOfMonth = getLastDayOfMonth(currentDate);
  const totalDaysInMonth = getTotalDasyOfMonth(currentDate);

  const formattedScheduleList = getFormattedSchedule(
    totalDaysInMonth,
    scheduleList,
    currentDate
  );
  
  const today = normalizeDate(new Date());

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  
  return (
    <div>
      <div className="days-header">
        {days.map((day) => (
          <div key={day} className="day-title">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-start-${index}`} className="cell empty-cell"></div>
        ))}

        {formattedScheduleList?.map((data) => {
          const scheduleDate = normalizeDate(new Date(data?.date));
          const isToday = scheduleDate.getTime() === today.getTime();
          return (
            <div
              key={data?.day}
              className={`cell day-cell ${isToday ? "today-cell" : ""}`}
            >
              <div className="grid gap-1">
                <div className="d-flex align-items-center justify-content-between">
                  <p className={`${isToday ? "text-primary" : "fs-14"}`}>
                    {data?.day}
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      iconBtn={true}
                      icon={BsPlus}
                      className="dark-soft btn-ghost hover fs-18 rounded-circle p-1"
                      onClick={() =>
                        onModalShow(
                          "CREATE_EVENT",
                          "Create event",
                          "md",
                          data?.date
                        )
                      }
                    />
                  </div>
                </div>

                <div className="d-flex flex-column gap-1 mt-2">
                  {isToday && (
                    <div ref={ref}>
                      <div onClick={handleClick} className="cursor-pointer">
                        <EventCard />
                      </div>
                      <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                      >
                        <Popover id="popover-contained">
                          <Popover.Header as="div">
                            <div className="d-flex justify-content-between">
                              <h4 className="fs-14"> Event Title</h4>
                              <div className="d-flex align-items-center gap-1">
                                <Button
                                  iconBtn={true}
                                  tooltipText="Delete"
                                  icon={BsTrash3}
                                  onClick={() => onModalShow("DELETE")}
                                  className="danger-solid circle p-2 fs-10"
                                />

                                <Button
                                  iconBtn={true}
                                  tooltipText="Edit"
                                  icon={BsPencilSquare}
                                  className="dark-solid circle p-2 fs-12"
                                  onClick={() =>
                                    onModalShow(
                                      "CREATE_EVENT",
                                      "Create event",
                                      "md",
                                      data
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </Popover.Header>
                          <Popover.Body>
                            <strong>Holy guacamole!</strong> Check this info.
                          </Popover.Body>
                        </Popover>
                      </Overlay>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {Array.from({ length: 6 - lastDayOfMonth }).map((_, index) => (
          <div key={`empty-end-${index}`} className="cell empty-cell"></div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
