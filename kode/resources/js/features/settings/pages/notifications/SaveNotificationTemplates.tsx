import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";
import PageHeader from "@/components/common/Page-header/PageHeader";
import React from "react";
import { LuCopy } from "react-icons/lu";

const SaveNotificationTemplates: React.FC = () => {
  return (
      <>
          <PageHeader
              title={"Notification Templates"}
              breadcrumbs={[
                  { title: "Settings", path: "/setting/general" },
                  {
                      title: "Notification Templates",
                      path: "/setting/notification-templates",
                  },
                  {
                      title: "Create",
                  },
              ]}
          />

          <form>
              <div className="row g-4">
                  <div className="col-12">
                      <div className="p-3 border rounded-4">
                          <h6 className="fs-16 mb-3">Template Info</h6>
                          <div className="row g-3">
                              <div className="col-md-6">
                                  <Field label="Template name" required>
                                      <input
                                          type="text"
                                          id="name"
                                          name="name"
                                          placeholder="Enter template name"
                                          className="form-control"
                                          required
                                      />
                                  </Field>
                              </div>

                              <div className="col-md-6">
                                  <Field label="Subject">
                                      <input
                                          type="text"
                                          id="subject"
                                          name="subject"
                                          placeholder="Enter template subject"
                                          className="form-control"
                                      />
                                  </Field>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="p-3 border rounded-4">
                          <h6 className="fs-16 mb-3">Notifications setup</h6>
                          <div className="row g-3">
                              <div className="col-md-6">
                                  <Field label="SMS Notification">
                                      <select
                                          className="form-select"
                                          id="country"
                                          aria-label="State"
                                      >
                                          <option value="active">Active</option>
                                          <option value="inactive">
                                              Inactive
                                          </option>
                                      </select>
                                  </Field>
                              </div>

                              <div className="col-md-6">
                                  <Field label="Email Notification">
                                      <select
                                          className="form-select"
                                          id="email-notification"
                                          name="email-notification"
                                          aria-label="State"
                                      >
                                          <option value="active">Active</option>
                                          <option value="inactive">
                                              Inactive
                                          </option>
                                      </select>
                                  </Field>
                              </div>

                              <div className="col-md-6">
                                  <Field label="Push Notification">
                                      <select
                                          className="form-select"
                                          id="push-notification"
                                          name="push-notification"
                                          aria-label="State"
                                      >
                                          <option value="active">Active</option>
                                          <option value="inactive">
                                              Inactive
                                          </option>
                                      </select>
                                  </Field>
                              </div>

                              <div className="col-md-6">
                                  <Field label="Site Notification">
                                      <select
                                          className="form-select"
                                          id="site-notification"
                                          name="site-notification"
                                          aria-label="State"
                                      >
                                          <option value="active">Active</option>
                                          <option value="inactive">
                                              Inactive
                                          </option>
                                      </select>
                                  </Field>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="p-3 border rounded-4">
                          <h6 className="fs-16 mb-3">Template Key</h6>

                          <ul className="ul-list">
                              <li className="py-2">
                                  <div className="d-flex align-items-center gap-3 info-list-left copy-section">
                                      <b className="fs-14 d-flex align-items-center gap-3 copy-content">
                                          {"{{message}}"}
                                      </b>

                                      <Button
                                          iconBtn={true}
                                          tooltipText="Copy"
                                          icon={LuCopy}
                                          type="button"
                                          className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                      />
                                  </div>

                                  <span className="fs-14">Message</span>
                              </li>

                              <li className="py-2">
                                  <div className="d-flex align-items-center gap-3 info-list-left copy-section">
                                      <b className="fs-14 d-flex align-items-center gap-3 copy-content">
                                          {"{{number}}"}
                                      </b>
                                      <Button
                                          iconBtn={true}
                                          tooltipText="Copy"
                                          icon={LuCopy}
                                          type="button"
                                          className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                      />
                                  </div>

                                  <span className="line-clamp-1 fs-14">
                                      Number
                                  </span>
                              </li>
                          </ul>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="p-3 border rounded-4">
                          <h6 className="fs-16 mb-3">Template body</h6>
                          <div className="row g-3">
                              <div className="col-12">
                                  <Field label="SMS Notification Body" required>
                                      <textarea
                                          name="sms-body"
                                          id="sms-body"
                                          className="form-control"
                                          rows={4}
                                          required
                                      ></textarea>
                                  </Field>
                              </div>

                              <div className="col-12">
                                  <Field
                                      label="Push Notification Body"
                                      required
                                  >
                                      <textarea
                                          name="sms-body"
                                          id="sms-body"
                                          className="form-control"
                                          rows={4}
                                          required
                                      ></textarea>
                                  </Field>
                              </div>

                              <div className="col-12">
                                  <Field
                                      label="Email Notification Body"
                                      required
                                  >
                                      <textarea
                                          name="sms-body"
                                          id="sms-body"
                                          className="form-control"
                                          rows={4}
                                          required
                                      ></textarea>
                                  </Field>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="d-flex align-items-center justify-content-end mt-4">
                  <Button
                      type="submit"
                      className="i-btn btn--primary btn--lg rounded-3"
                  >
                      Save Template
                  </Button>
              </div>
          </form>
      </>
  );
}

export default SaveNotificationTemplates