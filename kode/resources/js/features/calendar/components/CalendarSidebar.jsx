import { BsPlusLg } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";

import Field from "../../../components/common/from/Field";
import SmallCalendar from "./SmallCalendar";

const CalendarSidebar = () => {
  return (
    <aside className="col-auto calendar-sidebar">
      <div className="sidebar-body scroll scroll-3">
        <div className="small-calendar m-3">
          <SmallCalendar />
        </div>

        <div className="border-top p-3">
          <form action="#">
            <Field>
              <input
                type="search"
                id="email"
                className="form-control"
                placeholder="Find calendar or room..."
              />
            </Field>
          </form>

          <div className="mt-3">
            <h5 className="fs-16">My Calendar</h5>

            <ul className="schedule-list mt-2">
              {Array.from({ length: 4 }).map((_, ind) => (
                <li key={ind}>
                  <label className="custom-checkbox" htmlFor={`check-${ind}`}>
                    <span className="box-wrap">
                      <input
                        type="checkbox"
                        id={`check-${ind}`}
                        name="c-group"
                        hidden
                      />
                      <span className="box">
                        <ImCheckmark />
                      </span>
                    </span>

                    <span className="label-text">Project</span>
                  </label>
                </li>
              ))}

              <li>
                <button className="fs-14 lh-1">
                  <BsPlusLg className="fs-16 me-2" /> Add Calendar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CalendarSidebar;
