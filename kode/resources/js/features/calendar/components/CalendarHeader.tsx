import { LuChevronLeft, LuChevronRight, LuPlus } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import { goToNextMonth, goToPreviousMonth } from "../utils/helper";

const CalendarHeader = ({ actions }) => {
    const { fn: openModalFn, modalUid } = actions?.modal;
    const { setCurrentDate, currentDate, setFilters } = actions?.dateSwitch;
     
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
    

    return (
        <div className="calendar-header">
            <div className="calendar-header-left">
                <div className="d-flex align-items-center gap-2">
                    <Button iconBtn={true} icon={LuChevronLeft} className="fs-22"
                        onClick={() =>
                            goToPreviousMonth(currentDate, setCurrentDate, setFilters)
                        }
                    />
                    <h6 className="text-muted fs-15">{formattedDate}</h6>
                    <Button iconBtn={true} icon={LuChevronRight} className="fs-22"
                        onClick={() =>
                           goToNextMonth(currentDate, setCurrentDate, setFilters)
                        }
                    />
                </div>
            </div>

            <div className="calendar-header-right d-flex align-items-center gap-3">
                <Button
                    className="btn--primary btn--md rounded-3"
                    onClick={() => openModalFn(modalUid, "CREATE_EVENT", "", "xl")}
                >
                    <LuPlus className="fs-16" /> Create Campaign
                </Button>
            </div>
        </div>
    )
}

export default CalendarHeader