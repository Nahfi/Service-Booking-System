import { useState } from "react";
import DatePicker from "react-datepicker";
import { BsCalendar2Range, BsClock, BsTrash3 } from "react-icons/bs";
import { LuRepeat2, LuSave, LuUserPlus } from "react-icons/lu";
// import Field from "../../../../common/from/Field";
// import SelectBox from "../../../../common/from/SelectBox";

import "react-datepicker/dist/react-datepicker.css";
import Field from "../../../../../components/common/from/Field";
import SelectBox from "../../../../../components/common/from/SelectBox";
import "./add-note.scss";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const actionRepeat = [
  { value: "No repeat", label: "No repeat" },
  { value: "Every day", label: "Every day" },
  { value: "Every week on Monday", label: "Every week on Monday" },
  { value: "Every 2 week on Monday", label: "Every 2 week on Monday" },
  { value: "custom", label: "Custom..." },
];

const AddNote = ({ onModalClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    note: "",
    multiUser: [],
    repeat: null,
  });

  const handleChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      ...formData,
    };

    console.log(eventData);
    setFormData(eventData);
    onModalClose();
  };

  return (
    <form className="create-event" onSubmit={handleFormSubmit}>
      <div className="d-flex flex-column gap-3">
        <Field>
          <input
            type="text"
            id="eventTitle"
            className="form-control"
            placeholder="Weekly Event"
            value={formData.title}
            name="title"
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </Field>

        <Field>
          <SelectBox
            options={options}
            isMulti
            icon={<LuUserPlus />}
            name="multiUser"
            value={formData.multiUser}
            onChange={(selected) => handleChange("multiUser", selected)}
          />
        </Field>

        <div className="date-time">
          <div className="d-flex align-items-center gap-2 lh-1 date-time-header">
            <BsClock />
            <h5 className="fs-14 fw-medium">Date and time</h5>
          </div>

          <div className="date-time-body">
            <div className="row align-items-center">
              <div className="col-2">
                <span className="fs-14 fw-500 text-dark">On</span>
              </div>

              <div className="col-10">
                <Field>
                  <div className="field-with-icon">
                    <BsCalendar2Range className="field-icon" />
                    <DatePicker
                      className="form-control w-100"
                      selected={formData.start}
                      onChange={(date) => handleChange("start", date)}
                      required
                    />
                  </div>
                </Field>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-2">
                <span className="fs-14 fw-500 text-dark">From</span>
              </div>
              <div className="col-10">
                <Field>
                  <input
                    type="time"
                    id="startTime"
                    className="form-control"
                    name="startTime"
                    value={formData.start.toLocaleTimeString("it-IT", {
                      hour12: false,
                    })}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const updatedStart = new Date(formData.start);
                      updatedStart.setHours(hours, minutes);
                      handleChange("start", updatedStart);
                    }}
                  />
                </Field>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-2">
                <span className="fs-14 fw-500 text-dark">To</span>
              </div>
              <div className="col-10">
                <Field>
                  <input
                    type="time"
                    id="endTime"
                    className="form-control"
                    name="endTime"
                    value={formData.end.toLocaleTimeString("it-IT", {
                      hour12: false,
                    })}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const updatedEnd = new Date(formData.end);
                      updatedEnd.setHours(hours, minutes);
                      handleChange("end", updatedEnd);
                    }}
                  />
                </Field>
              </div>
            </div>
          </div>
        </div>

        <Field>
          <SelectBox
            options={actionRepeat}
            icon={<LuRepeat2 />}
            name="repeat"
            value={formData.repeat}
            onChange={(selected) => handleChange("repeat", selected)}
          />
        </Field>

        <Field>
          <textarea
            id="addNote"
            rows="4"
            className="form-control"
            placeholder="Add note"
            name="note"
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </Field>
      </div>

      <div className="d-flex align-items-center gap-2 mt-5">
        <button
          type="button"
          className="icon-btn outline outline-danger btn-lg fs-18"
        >
          <BsTrash3 />
        </button>

        <button
          type="button"
          className="i-btn btn--dark btn--lg outline rounded-3"
        >
          <BsClock /> Reschedule
        </button>

        <button type="submit" className="i-btn btn--primary btn--lg rounded-3">
          <LuSave /> Save
        </button>
      </div>
    </form>
  );
};

export default AddNote;
