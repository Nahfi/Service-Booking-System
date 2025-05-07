import BaseLayout from "../../components/layouts/BaseLayout";
import "./calendar.scss";
import CalendarSidebar from "./components/CalendarSidebar";
import ScheduleCalendar from "./components/ScheduleCalendar";
const Calendar = () => {

  return (
    <BaseLayout className="p-0">
      <div className="calendar-section">
        <div className="row g-0">
          <CalendarSidebar />
          <div className="col calendar-container">
            <ScheduleCalendar />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Calendar;
