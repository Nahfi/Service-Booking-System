import React, { useContext, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import ModalWrapper from "../../../components/common/modal";
import DeleteModal from "../../../components/common/modal/deleteModal/DeleteModal";
import { ModalContext } from "../../../context";
import { getWeekRanges } from "../../../utils/helper";
import type { ModalContextType } from "../../../utils/types";
import "./custom-calendar.scss";
import EventCreateModal from "./event-create/EventCreateModal";
import MonthlyCalendar from './MonthlyCalendar';
import WeeklyCalendar from "./WeeklyCalendar";

type ViewMode = "monthly" | "weekly";

const { weekStart: currentWeekStart, weekEnd: currentWeekEnd } = getWeekRanges();

const CustomCalendar: React.FC = () => {
  const baseDate = new Date();

  const [currentDate, setCurrentDate] = useState<Date>(baseDate);
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");

  const handleCalendarMode = (type: ViewMode) => {
    setViewMode(type);
  };

  const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;


  return (
    <>
      <div className="calendar-wrapper scroll scroll-3">
        <div className="calendar-header">
          <div className="calendar-header-left">
            <div className="d-flex align-items-center gap-2">
              <Button iconBtn={true} icon={LuChevronLeft} className="fs-24" />
              <h6 className="">January 2024</h6>
              <Button iconBtn={true} icon={LuChevronRight} className="fs-24" />
            </div>
          </div>

          <ul className="calendar-header-middle">
            <li className="view-mood-item">
              <button
                className={`view-mood-btn ${viewMode === "weekly" ? "active" : ""
                  }`}
                onClick={() => handleCalendarMode("weekly")}
              >
                Week
              </button>
            </li>
            <li className="view-mood-item">
              <button
                className={`view-mood-btn ${viewMode === "monthly" ? "active" : ""
                  }`}
                onClick={() => handleCalendarMode("monthly")}
              >
                Month
              </button>
            </li>
          </ul>

          <div className="calendar-header-right d-flex align-items-center gap-3">
            <Button className="btn--dark outline btn--md rounded-3">
              Today
            </Button>
            <Button
              className="btn--primary btn--md rounded-3"
              onClick={() => openModal("CREATE_EVENT", "Create event", "md")}
            >
              <BsPlusLg className="fs-16" /> Add Event
            </Button>
          </div>
        </div>

        <div className="calendar-body">
          {viewMode === "weekly" ? (
            <WeeklyCalendar currentDate={currentDate} viewMode={viewMode} />
          ) : (
            <MonthlyCalendar
              currentDate={currentDate}
              onModalShow={openModal}
            />
          )}
        </div>
      </div>

      <ModalWrapper
        title={modalConfig?.title}
        onHide={closeModal}
        show={showModal}
        size={modalConfig?.size}
        backdrop="static"
        scrollable
        centered
      >
        {(modalConfig?.type === "CREATE_EVENT" ||
          modalConfig?.type === "UPDATE_EVENT") && (
            <EventCreateModal modalData={modalConfig} />
          )}

        {modalConfig?.type === "DELETE" && <DeleteModal onHide={closeModal} />}
      </ModalWrapper>
    </>
  );
}

export default CustomCalendar