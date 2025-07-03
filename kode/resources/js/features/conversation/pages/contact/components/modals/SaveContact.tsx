import type React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { LuDownload } from 'react-icons/lu'
import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'
import FileUploader from '../../../../../../components/common/from/FileUploader'
import SelectBox from '../../../../../../components/common/from/SelectBox'

const SaveContact: React.FC = ({ onHide }) => {
  return (
      <form action="#">
          <Tabs
              defaultActiveKey="single_contact"
              id="add-contact-tab"
              className="mb-4 style-1"
          >
              <Tab eventKey="single_contact" title="Single Contact">
                  <div className="row g-3">

                      <div className="col-lg-6">
                          <Field label={"First Name"} required>
                              <input
                                  type="text"
                                  id="name"
                                  name='name'
                                  placeholder="Enter first name"
                                  className="form-control"
                                  required
                              />
                          </Field>  
                      </div>

                      <div className="col-lg-6">
                          <Field label={"Last Name"} required>
                              <input
                                  type="text"
                                  id="name"
                                  name='name'
                                  placeholder="Enter last name"
                                  className="form-control"
                                  required
                              />
                          </Field>
                      </div>

                      <div className="col-lg-6">
                          <Field label={"Phone Number"} required>
                              <input
                                  type="tel"
                                  id="name"
                                  name='name'
                                  placeholder="Enter phone number"
                                  className="form-control"
                                  required
                              />
                          </Field>
                      </div>

                      <div className="col-lg-6">
                          <Field label={"Email"} required>
                              <input
                                  type="email"
                                  id="name"
                                  name='name'
                                  placeholder="Enter email"
                                  className="form-control"
                                  required
                              />
                          </Field>
                      </div>

                      <div className="col-12">
                          <Field label={"Choose Group"} required>
                             <SelectBox />
                          </Field>
                      </div>
                  </div>
              </Tab>

              <Tab eventKey="bulk_upload" title="Bulk Upload">
                  <div className="row g-3">
                      <div className="col-12">   
                            <Field label={"Choose Group"} required>
                                    <SelectBox />
                            </Field>
                      </div>

                      <div className='col-12'>
                            <div>
                                <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                                    <div>
                                        <h6 className="fs-16">Upload your file</h6>
                                        <p className="fs-14">
                                            Add your documents here, and you can upload up
                                            to 5 files max
                                        </p>
                                    </div>
                                    <span className="i-badge pill dark-soft cursor-pointer lh-1 py-2 px-3">
                                        <LuDownload className="me-1 fs-14" />
                                        Download demo file
                                    </span>
                                </div>

                                <FileUploader
                                    uploadText="Drag your file(s) or Browse"
                                    maxFile="Max 20 MB files are allowed"
                                />

                                <p className="fs-13 mt-1">
                                    Only support extension of{" "}
                                    <span className="text-info">.csv</span>,
                                    <span className="text-info">.dsv</span>,
                                    <span className="text-info">.txt</span> or
                                    <span className="text-info">.xlsx.</span>
                                </p>
                            </div>
                      </div>
                  </div>
              </Tab>
          </Tabs>


          <div className="modal-custom-footer mt-4">
              <Button
                  className="btn--dark outline btn--lg rounded-3"
                  type="button"
                  onClick={onHide}
              >
                  Cancel
              </Button>

              <Button
                  type="submit"
                  className="btn--primary btn--lg rounded-3"
              >
                  Save
              </Button>
          </div>
      </form>
  )
}

export default SaveContact