import { useState } from "react";
import { BsCalendar2Range, BsClock, BsTrash3 } from "react-icons/bs";
import { LuClock, LuRepeat2, LuSave, LuUserPlus } from "react-icons/lu";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../../components/common/button/Button";
import DateTimePicker from "../../../../components/common/datepicker/DateTimePicker";
import Field from "../../../../components/common/from/Field";
import SelectBox from "../../../../components/common/from/SelectBox";
import "./event-create.scss";

const options = [
  { value: "emma", label: "Emma" },
  { value: "liam", label: "Liam" },
  { value: "olivia", label: "Olivia" },
];

const EventCreateModal = ({ modalData={} }) => {

  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      ...formData,
      allDay: false,
    };
    console.log(eventData);
  };

  return (
      <form className="create-event" onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-3">
              <Field label={"Event Name"}>
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

              <Field label={"Choose Audience"}>
                  <SelectBox
                      options={options}
                      isMulti
                      icon={<LuUserPlus />}
                      name="multiUser"
                      value={formData.multiUser}
                      onChange={(selected) =>
                          handleChange("multiUser", selected)
                      }
                      placeholder={"Add Audience"}
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
                                      <DateTimePicker
                                          className="form-control w-100"
                                          selected={formData.date}
                                          onChange={(date) =>
                                              handleChange("date", date)
                                          }
                                          required
                                      />
                                  </div>
                              </Field>
                          </div>
                      </div>

                      <div className="row align-items-center">
                          <div className="col-2">
                              <span className="fs-14 fw-500 text-dark">
                                  From
                              </span>
                          </div>
                          <div className="col-10">
                              <Field>
                                  <div className="field-with-icon">
                                      <LuClock className="field-icon" />

                                      <DateTimePicker
                                          selected={formData.startTime}
                                          onChange={(date) =>
                                              handleChange("startTime", date)
                                          }
                                          showTimeSelect
                                          showTimeSelectOnly
                                          timeIntervals={15}
                                          timeCaption="Time"
                                          dateFormat="h:mm aa"
                                      />
                                  </div>
                              </Field>
                          </div>
                      </div>

                      <div className="row align-items-center">
                          <div className="col-2">
                              <span className="fs-14 fw-500 text-dark">To</span>
                          </div>
                          <div className="col-10">
                              <Field>
                                  <div className="field-with-icon">
                                      <LuClock className="field-icon" />

                                      <DateTimePicker
                                          selected={formData.endTime}
                                          onChange={(date) =>
                                              handleChange("endTime", date)
                                          }
                                          showTimeSelect
                                          showTimeSelectOnly
                                          timeIntervals={15}
                                          timeCaption="Time"
                                          dateFormat="h:mm aa"
                                      />
                                  </div>
                              </Field>
                          </div>
                      </div>
                  </div>
              </div>

              <Field label={"Repeat time"}>
                  <SelectBox
                      options={options}
                      icon={<LuRepeat2 />}
                      name="repeat"
                      value={formData.repeat}
                      onChange={(selected) => handleChange("repeat", selected)}
                      placeholder={"Enter repeat"}
                  />
              </Field>

              <Field label={"Note"}>
                  <textarea
                      id="addNote"
                      rows="3"
                      className="form-control"
                      placeholder="Add note"
                      name="note"
                      value={formData.note}
                      onChange={(e) => handleChange("note", e.target.value)}
                  />
              </Field>
          </div>

          <div className="modal-custom-footer mt-4">
              <Button
                  iconBtn={true}
                  tooltipText="Delete"
                  icon={BsTrash3}
                  className=" outline outline-danger btn-lg fs-18 rounded-3"
              />

              <Button
                  type="button"
                  className="btn--dark btn--lg outline rounded-3"
              >
                  <BsClock /> Reschedule
              </Button>

              <Button type="submit" className="btn--primary btn--lg rounded-3">
                  <LuSave /> Save
              </Button>
          </div>
      </form>
  );
};

export default EventCreateModal;
