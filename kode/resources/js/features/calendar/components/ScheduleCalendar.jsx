import { useRef, useState } from "react";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import { createEventId } from "../event-utils.js";
// import ModalWrapper from "./../../common/modal/ModalWrapper";
// import EventCreateModal from "./event-create/EventCreateModal";

import ModalWrapper from "../../../components/common/modal/ModalWrapper";
import CustomCalendar from "./CustomCalendar.jsx";
import EventCreateModal from "./event-create/EventCreateModal";
import "./schedule.scss";

const ScheduleCalendar = () => {
  const fullCalendarRef = useRef(null);
  const modalRef = useRef(null);
  const confirmModalRef = useRef(null); // Confirmation modal reference
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [draggedEventInfo, setDraggedEventInfo] = useState(null); // Store the dragged event info
  const [initialEventData, setInitialEventData] = useState(null); // Store initial event data for revert

  // Handle Modal
  const handleModalShow = () => modalRef.current.open();
  const handleModalClose = () => {
    modalRef.current.hide();
    setSelectedEvent(null);
    setSelectedDateInfo(null);
  };

  // Handle confirmation modal for dragging
  const handleConfirmModalShow = () => confirmModalRef.current.open();
  const handleConfirmModalClose = () => confirmModalRef.current.hide();

  function handleDateSelect(selectInfo) {
    setSelectedDateInfo(selectInfo);
    handleModalShow();
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleRemoveEvent(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleDeleteEvent(event) {
    const calendarApi = fullCalendarRef.current.getApi();
    const eventToRemove = calendarApi.getEventById(event.id);
    eventToRemove?.remove(); // Remove the event from the calendar
    handleModalClose();
  }

  function handleSaveEvent(eventData) {
    const calendarApi = selectedDateInfo.view.calendar;

    if (selectedEvent) {
      const event = calendarApi.getEventById(selectedEvent.id);
      if (event) {
        event.setProp("title", eventData.title);
        event.setStart(eventData.start);
        event.setEnd(eventData.end);
        event.setAllDay(eventData.allDay || false);
      }
    } else {
      calendarApi.unselect();
      calendarApi.addEvent({
        id: createEventId(),
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        allDay: eventData.allDay || false,
        backgroundColor: eventData.backgroundColor || "",
      });
    }
    handleModalClose();
  }

  // Function to handle custom button click
  function handleCustomButtonClick() {
    setSelectedDateInfo({
      startStr: new Date().toISOString(),
      endStr: new Date(
        new Date().getTime() + (60 * 60 * 1000) / 2
      ).toISOString(),
      view: { calendar: fullCalendarRef.current?.getApi() },
    });
    handleModalShow();
  }

  function handleEditEvent(eventInfo) {
    setSelectedEvent({
      id: eventInfo.event.id,
      title: eventInfo.event.title,
      start: eventInfo.event.start.toISOString(),
      end: eventInfo.event.end ? eventInfo.event.end.toISOString() : null,
      note: eventInfo.event.note,
    });

    setSelectedDateInfo({
      startStr: eventInfo.event.start.toISOString(),
      endStr: eventInfo.event.end ? eventInfo.event.end.toISOString() : null,
      view: { calendar: fullCalendarRef.current?.getApi() },
    });

    handleModalShow();
  }

  function renderEventContent(eventInfo) {
    return (
      <div className="event-card">
        <h6 className="event-title">{eventInfo.event.title}</h6>
        <span className="event-time">{eventInfo.timeText}</span>

        <div className="event-action">
          <button
            type="button"
            onClick={() => handleRemoveEvent(eventInfo)}
            className="icon-btn danger-solid btn-sm circle"
          >
            <BsTrash3 />
          </button>

          <button
            onClick={() => handleEditEvent(eventInfo)}
            className="icon-btn light-soft btn-sm circle"
          >
            <BsPencilSquare />
          </button>
        </div>
      </div>
    );
  }

  // Function to handle event drop
  function handleEventDrop(eventInfo) {
    setDraggedEventInfo(eventInfo); // Store the event being dragged
    setInitialEventData({
      // Store the original event data for potential revert
      id: eventInfo.event.id,
      title: eventInfo.event.title,
      start: eventInfo.event.start,
      end: eventInfo.event.end,
    });
    handleConfirmModalShow(); // Show confirmation modal
  }

  // Function to handle confirmation for event dragging
  function handleDragConfirm(confirmed) {
    const calendarApi = fullCalendarRef.current.getApi();
    const eventToRevert = calendarApi.getEventById(initialEventData.id);

    if (confirmed && draggedEventInfo) {
      // If user confirms, keep the changes
      draggedEventInfo.revert = false; // Allow the event to stay in its new position
    } else if (initialEventData && eventToRevert) {
      // If user cancels, revert the event to the original position
      eventToRevert.setStart(initialEventData.start);
      eventToRevert.setEnd(initialEventData.end);
      draggedEventInfo.revert = true; // Prevent the new position from being kept
    }

    setDraggedEventInfo(null); // Clear dragged event info
    setInitialEventData(null); // Clear initial event data
    handleConfirmModalClose(); // Close confirmation modal
  }


  // Test
   const employees = [
    { id: '1', title: 'John Doe' },
    { id: '2', title: 'Jane Smith' },
    { id: '3', title: 'Alice Johnson' },
  ];
  const shifts = [
    { title: 'Morning Shift', start: '2024-11-16T09:00:00', end: '2024-11-16T13:00:00', resourceId: '1' },
    { title: 'Evening Shift', start: '2024-11-16T14:00:00', end: '2024-11-16T18:00:00', resourceId: '2' },
  ];



  return (
    <>
      {/* <div className="calendar-body">
        <FullCalendar
          ref={fullCalendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            multiMonthPlugin,
            interactionPlugin,
          ]}
          resources={employees}
          // events={shifts}
          initialView="timeGridWeek"
          contentHeight={"auto"}
          initialEvents={INITIAL_EVENTS}
          weekends={true}
          editable={true}
          selectMirror={true}
          selectable={true}
          nowIndicator={true}
          select={handleDateSelect}
          eventsSet={handleEvents}
          eventContent={renderEventContent}
          multiMonthMaxColumns={1}
          headerToolbar={{
            start: "prev,title,next",
            center: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear",
            end: "today,addEvent",
          }}
          customButtons={{
            addEvent: {
              text: "+ Add Event",
              click: handleCustomButtonClick,
            },
          }}
          dayMaxEventRows={true}
          views={{
            timeGrid: {
              dayMaxEventRows: 2,
            },
          }}
          eventDrop={handleEventDrop} // Updated to use eventDrop
        />
      </div> */}

      <CustomCalendar/>

      {/* Modal for adding/editing events */}
      <ModalWrapper
        ref={modalRef}
        title={selectedEvent ? "Edit Event" : "Add Event"}
        onHide={handleModalClose}
        backdrop="static"
        scrollable
        centered
      >
        <EventCreateModal
          selectedEvent={selectedEvent}
          startDate={selectedDateInfo?.startStr || null}
          endDate={selectedDateInfo?.endStr || null}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      </ModalWrapper>

      {/* Confirmation Modal for event drag */}
      <ModalWrapper
        ref={confirmModalRef}
        title="Move Event"
        onHide={handleConfirmModalClose}
        backdrop="static"
        centered
      >
        <div className="modal-body">
          <p>
            Are you sure you want to move this event to another time or date?
          </p>
          <button
            className="btn btn-primary me-2"
            onClick={() => handleDragConfirm(true)}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleDragConfirm(false)}
          >
            No
          </button>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ScheduleCalendar;
