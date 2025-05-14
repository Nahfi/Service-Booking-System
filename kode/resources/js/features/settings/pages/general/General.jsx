import Field from "@/components/common/from/Field";
import PageHeader from "@/components/common/Page-header/PageHeader";

const General = () => {
  return (
      <>
          <PageHeader
              title={"General"}
              shortTitle={"You can manage your general settings here."}
          />

          <div>
              <div className="row g-4">
                  <div className="col-12">
                      <Field label="Campaign name">
                          <input
                              type="text"
                              id="campaignName"
                              placeholder="Enter your campaign name"
                              className="form-control"
                          />
                      </Field>
                  </div>
          
                  <div className="col-md-6">
                      <Field label="Sender name">
                          <input
                              type="text"
                              id="sender"
                              placeholder="Enter your sender name"
                              className="form-control"
                          />
                      </Field>
                  </div>
          
                  <div className="col-md-6">
                      <Field label="Choose Gateway">
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
                      <Field label="Phone Number" required>
                          <div className="row g-1">
                              <div className="col-2">
                                  <select
                                      className="form-select"
                                      id="country"
                                      aria-label="State"
                                  >
                                      <option selected>
                                          Choose your state
                                      </option>
                                      <option value="1">Spain</option>
                                      <option value="2">England</option>
                                      <option value="3">Bangladesh</option>
                                      <option value="3">Dhaka</option>
                                  </select>
                              </div>
                              <div className="col-10">
                                  <input
                                      type="number"
                                      className="form-control"
                                      placeholder="+1 (000) 000-0000"
                                      id="phone-input"
                                  />
                              </div>
                          </div>
                      </Field>
                  </div>
              </div>
          </div>
      </>
  );
}

export default General