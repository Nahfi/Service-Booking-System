

import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BsList } from "react-icons/bs";
import Field from "../../../../components/common/from/Field";
import MessagePreview from "./MessagePreview";

interface FormState {
  headerText: string;
  headerSelectValue: string;
  bodyText: string;
  bodySelectValue: string;
  buttonText: string;
  buttonSelectValue: string;
  urlText: string;
}

const WhatsappCompose: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    headerText: "",
    headerSelectValue: "",
    bodyText: "",
    bodySelectValue: "",
    buttonText: "",
    buttonSelectValue: "",
    urlText: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof FormState
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="row g-0 fade-in">
      <div className="col-xxl-8 col-xl-7 col-lg-6 py-30 border-lg-end pe-lg-30">
        <div className="form-wrapper-width ms-0 me-auto">
          <form>
            <div className="row g-4">
              <div className="col-12">
                <Field label="Choose template">
                  <select
                    className="form-select"
                    id="country"
                    aria-label="State"
                  >
                    <option value="">
                      Choose your state
                    </option>
                    <option value="1">Spain</option>
                    <option value="2">England</option>
                    <option value="3">Bangladesh</option>
                    <option value="4">Dhaka</option>
                  </select>
                </Field>
              </div>
              
              <div className="col-12">
                <Tabs
                  defaultActiveKey="header"
                  id="fill-tab-example"
                  className="mb-4 style-1 style--dark"
                >
                  <Tab
                    eventKey="header"
                    title={
                      <>
                        <BsList
                          style={{ marginRight: "8px" }}
                        />{" "}
                        Header
                      </>
                    }
                  >
                    <div className="row g-3">
                      <div className="col-xl-6 col-lg-12">
                        <Field label="Variable">
                          <input
                            type="text"
                            placeholder="Hello"
                            className="form-control"
                            value={
                              formState.headerText
                            }
                            onChange={(e) =>
                              handleChange(
                                e,
                                "headerText"
                              )
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-xl-6 col-lg-12">
                        <Field label="Contact field">
                          <select
                            className="form-select"
                            id="contact-field"
                            aria-label="State"
                            value={
                              formState.headerSelectValue
                            }
                            onChange={(e) =>
                              handleChange(
                                e,
                                "headerSelectValue"
                              )
                            }
                          >
                            <option value="">
                              Select Value
                            </option>
                            <option value="03">
                              03
                            </option>
                            <option value="54">
                              54
                            </option>
                            <option value="756">
                              756
                            </option>
                            <option value="678">
                              678
                            </option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="body"
                    title={
                      <>
                        <BsList
                          style={{ marginRight: "8px" }}
                        />{" "}
                        Body
                      </>
                    }
                  >
                    <div className="row g-3">
                      <div className="col-xl-6 col-lg-12">
                        <Field label="Variable">
                          <input
                            type="text"
                            placeholder="Hello"
                            className="form-control"
                            value={formState.bodyText}
                            onChange={(e) =>
                              handleChange(
                                e,
                                "bodyText"
                              )
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-xl-6 col-lg-12">
                        <Field label="Contact field">
                          <select
                            className="form-select"
                            id="contact-field"
                            aria-label="State"
                            value={
                              formState.bodySelectValue
                            }
                            onChange={(e) =>
                              handleChange(
                                e,
                                "bodySelectValue"
                              )
                            }
                          >
                            <option value="">
                              Select Value
                            </option>
                            <option value="03">
                              03
                            </option>
                            <option value="54">
                              54
                            </option>
                            <option value="756">
                              756
                            </option>
                            <option value="678">
                              678
                            </option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="button"
                    title={
                      <>
                        <BsList
                          style={{ marginRight: "8px" }}
                        />{" "}
                        Button
                      </>
                    }
                  >
                    <div className="row g-3">
                      <div className="col-12">
                        <Field label="Copy code">
                          <input
                            type="text"
                            placeholder="Hello"
                            className="form-control"
                            value={
                              formState.buttonText
                            }
                            onChange={(e) =>
                              handleChange(
                                e,
                                "buttonText"
                              )
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-12">
                        <Field label="Contact field">
                          <select
                            className="form-select"
                            id="contact-field"
                            aria-label="State"
                            value={
                              formState.buttonSelectValue
                            }
                            onChange={(e) =>
                              handleChange(
                                e,
                                "buttonSelectValue"
                              )
                            }
                          >
                            <option value="">
                              Select Value
                            </option>
                            <option value="03">
                              03
                            </option>
                            <option value="54">
                              54
                            </option>
                            <option value="756">
                              756
                            </option>
                            <option value="678">
                              678
                            </option>
                          </select>
                        </Field>
                      </div>
                      <div className="col-12">
                        <Field label="URL">
                          <input
                            type="text"
                            placeholder="www.url.com"
                            className="form-control"
                            value={formState.urlText}
                            onChange={(e) =>
                              handleChange(
                                e,
                                "urlText"
                              )
                            }
                          />
                        </Field>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="col-xxl-4 col-xl-5 col-lg-6 py-30 position-relative">
        <MessagePreview
          headerText={formState.headerText}
          headerSelectValue={formState.headerSelectValue}
          bodySelectValue={formState.bodySelectValue}
          bodyText={formState.bodyText}
          buttonText={formState.buttonText}
          buttonSelectValue={formState.buttonSelectValue}
          urlText={formState.urlText}
          whatsapp
        />
      </div>
    </div>
  );
};

export default WhatsappCompose