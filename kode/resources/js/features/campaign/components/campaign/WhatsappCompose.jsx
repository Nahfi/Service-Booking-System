

import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BsList } from "react-icons/bs";
import Field from "../../../../components/common/from/Field";
import MessagePreview from "./MessagePreview";
const WhatsappCompose = () => {
    const [headerText, setHeaderText] = useState("");
    const [headerSelectValue, setHeaderSelectValue] = useState("");
  
    const [bodyText, setBodyText] = useState("");
    const [bodySelectValue, setBodySelectValue] = useState("");
  
    const [buttonText, setButtonText] = useState("");
    const [buttonSelectValue, setButtonSelectValue] = useState("");
    const [urlText, setUrlText] = useState("");
  
    const handleHeaderChange = (e) => setHeaderText(e.target.value);
    const handleHeaderSelectChange = (e) => {
      setHeaderSelectValue(e.target.value);
    };
  
    const handleBodyChange = (e) => setBodyText(e.target.value);
    const handleBodySelectChange = (e) => {
      setBodySelectValue(e.target.value);
    };
  
    const handleButtonChange = (e) => setButtonText(e.target.value);
    const handleUrlChange = (e) => setUrlText(e.target.value);
    const handleButtonSelectChange = (e) => {
      setButtonSelectValue(e.target.value);
  };
  
  return (
    <div className="row">
      <div className="col-xxl-8 col-xl-7 col-lg-6 py-30 border-lg-end pe-lg-30">
        <div className="form-wrapper-width ms-0 me-auto">
          <form action="">
            <div className="row g-4">
              <div className="col-12">
                <Field label="Choose template">
                  <select
                    className="form-select"
                    id="country"
                    aria-label="State"
                  >
                    <option selected>Choose your state</option>
                    <option value="1">Spain</option>
                    <option value="2">England</option>
                    <option value="3">Bangladesh</option>
                    <option value="3">Dhaka</option>
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
                        <BsList style={{ marginRight: "8px" }} /> Header
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
                            value={headerText}
                            onChange={handleHeaderChange}
                          />
                        </Field>
                      </div>
                      <div className="col-xl-6 col-lg-12">
                        <Field label="Contact field">
                          <select
                            className="form-select"
                            id="contact-field"
                            aria-label="State"
                            value={headerSelectValue} // Controlled select
                            onChange={handleHeaderSelectChange} // Update state
                          >
                            <option value="">Select Value</option>
                            <option value="03">03</option>
                            <option value="54">54</option>
                            <option value="756">756</option>
                            <option value="678">678</option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="body"
                    title={
                      <>
                        <BsList style={{ marginRight: "8px" }} /> Body
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
                            value={bodyText}
                            onChange={handleBodyChange}
                          />
                        </Field>
                      </div>
                      <div className="col-xl-6 col-lg-12">
                        <Field label="Contact field">
                          <select
                            className="form-select"
                            id="contact-field"
                            aria-label="State"
                            value={bodySelectValue} // Controlled select
                            onChange={handleBodySelectChange} // Update state
                          >
                            <option value="">Select Value</option>
                            <option value="03">03</option>
                            <option value="54">54</option>
                            <option value="756">756</option>
                            <option value="678">678</option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="button"
                    title={
                      <>
                        <BsList style={{ marginRight: "8px" }} /> Button
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
                            value={buttonText}
                            onChange={handleButtonChange}
                          />
                        </Field>
                      </div>
                      <div className="col-12">
                        <Field label="Contact field">
                          <select
                            className="form-select"
                            id="contact-field"
                            aria-label="State"
                            value={buttonSelectValue} // Controlled select
                            onChange={handleButtonSelectChange} // Update state
                          >
                            <option value="">Select Value</option>
                            <option value="03">03</option>
                            <option value="54">54</option>
                            <option value="756">756</option>
                            <option value="678">678</option>
                          </select>
                        </Field>
                      </div>
                      <div className="col-12">
                        <Field label="URL">
                          <input
                            type="text"
                            placeholder="www.url.com"
                            className="form-control"
                            value={urlText}
                            onChange={handleUrlChange}
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
          headerText={headerText}
          headerSelectValue={headerSelectValue}
          bodySelectValue={bodySelectValue}
          bodyText={bodyText}
          buttonText={buttonText}
          buttonSelectValue={buttonSelectValue}
          urlText={urlText}
          whatsapp
        />
      </div>
    </div>
  );
}

export default WhatsappCompose