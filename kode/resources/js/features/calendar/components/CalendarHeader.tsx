import { BsPlusLg } from "react-icons/bs";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Button from "../../../components/common/button/Button";

const CalendarHeader = ({ actions }) => {
    const { fn: openModalFn, modalUid } = actions?.modal;
    const { fn: handleCalendarModeFn, viewMode } = actions?.switchView;

  return (
      <div className="calendar-header">
          <div className="calendar-header-left">
              <div className="d-flex align-items-center gap-2">
                  <Button iconBtn={true} icon={LuChevronLeft} className="fs-24" />
                  <h6 className="text-muted">January 2024</h6>
                  <Button iconBtn={true} icon={LuChevronRight} className="fs-24" />
              </div>
          </div>

          <ul className="calendar-header-middle">
              <li className="view-mood-item">
                  <button
                      className={`view-mood-btn ${viewMode === "weekly" ? "active" : ""
                          }`}
                      onClick={() => handleCalendarModeFn("weekly")}
                  >
                      Week
                  </button>
              </li>

              <li className="view-mood-item">
                  <button
                      className={`view-mood-btn ${viewMode === "monthly" ? "active" : ""
                          }`}
                      onClick={() => handleCalendarModeFn("monthly")}
                  >
                      Month
                  </button>
              </li>
          </ul>

          <div className="calendar-header-right d-flex align-items-center gap-3">
              <Button
                  className="btn--primary btn--md rounded-3"
                  onClick={() => openModalFn(modalUid, "CREATE_EVENT", "Create campaign", "xl")}
              >
                  <BsPlusLg className="fs-16" /> Add Event
              </Button>
          </div>
      </div>
  )
}

export default CalendarHeader