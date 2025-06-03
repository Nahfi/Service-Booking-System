import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";
import PageHeader from "@/components/common/Page-header/PageHeader";
import type React from "react";

const WhatsappSetting:React.FC = () => {
  return (
      <>
          <PageHeader
              title={"Whatsapp Setup"}
              breadcrumbs={[
                  { title: "Settings", path:"/setting/general" },
                  {
                    title: "Whatsapp Setup",
                  },
              ]}
          />

          <form>
              <div className="row g-3">
                  <div className="col-md-6">
                      <Field label="App ID" required>
                          <input
                              type="text"
                              id="app_id"
                              name="app_id"
                              placeholder="Enter app id"
                              className="form-control"
                              required
                          />
                      </Field>
                  </div>

                  <div className="col-md-6">
                      <Field label="App secret key" required>
                          <input
                              type="text"
                              id="secret_key"
                              name="secret_key"
                              placeholder="Enter app secret key"
                              className="form-control"
                              required
                          />
                      </Field>
                  </div>

                  <div className="col-md-6">
                      <Field label="Business portfolio name" required>
                          <input
                              type="text"
                              id="campaignName"
                              placeholder="Enter your business portfolio name"
                              className="form-control"
                              required
                          />
                      </Field>
                  </div>

                  <div className="col-md-6">
                      <Field label="WhatsApp Phone Number ID" required>
                          <input
                              type="text"
                              id="sender"
                              placeholder="Enter phone number id"
                              className="form-control"
                              required
                          />
                      </Field>
                  </div>

                  <div className="col-md-6">
                      <Field label="WhatsApp Business Account ID" required>
                          <input
                              type="text"
                              id="sender"
                              placeholder="Enter business account id"
                              className="form-control"
                              required
                          />
                      </Field>
                  </div>

                  <div className="col-md-6">
                      <Field label="Permanent access token" required>
                          <input
                              type="text"
                              id="sender"
                              placeholder="Enter permanent access token"
                              className="form-control"
                              required
                          />
                      </Field>
                  </div>
              </div>

              <div className="d-flex align-items-center justify-content-end mt-4">
                  <Button
                      type="submit"
                      className="i-btn btn--primary btn--lg rounded-3"
                  >
                      Save
                  </Button>
              </div>
          </form>
      </>
  );
}

export default WhatsappSetting