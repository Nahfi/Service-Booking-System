import type React from "react";
import ModalWrapper, { DeleteModal } from "../../components/common/modal";
import BaseLayout from "../../components/layouts/BaseLayout";
import { useModal } from "../../context";
import type { ModalContextType } from "../../utils/types";
import "./calendar.scss";
import CalendarSidebar from "./components/CalendarSidebar";
import ScheduleCalendar from "./components/ScheduleCalendar";
import CreateCampaignModal from "./components/event-create/CreateCampaignModal";

const Calendar: React.FC = () => {

  const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
  const modalUid: string = "calendarModal";

  return (
    <>
      <BaseLayout className="p-0">
        <div className="calendar-section">
          <div className="row g-0">
            <CalendarSidebar />
            <div className="col calendar-container">
              <ScheduleCalendar modal={{openModal, closeModal, modalUid, modalConfig}} />
            </div>
          </div>
        </div>
      </BaseLayout>


      {showModal && modalConfig?.modalUid === modalUid && (
        <ModalWrapper
          title={modalConfig?.title}
          onHide={closeModal}
          show={showModal}
          size={modalConfig?.size}
          scrollable
          centered
        >
          {(modalConfig?.type === "CREATE_EVENT" ||
            modalConfig?.type === "UPDATE_EVENT") && (
            <CreateCampaignModal onHide={closeModal} />
            )}

          {modalConfig?.type === "DELETE" && <DeleteModal onHide={closeModal} />}
        </ModalWrapper>
      )}

    </>
  );
};

export default Calendar;
