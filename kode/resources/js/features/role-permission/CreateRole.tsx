

import type React from "react";
import Button from "../../components/common/button/Button";
import Field from "../../components/common/from/Field";
import SwitchWrapper from "../../components/common/from/SwitchWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";


const CreateRole:React.FC = () => {
  return (
      <BaseLayout>
          <>
              <PageHeader
                  title={"Create Role"}
                  breadcrumbs={[
                      { title: "Manage Role", path: "/roles" },
                      { title: "Create", },
                  ]}
              />

              <form>
                  <div className="form-element">
                      <div className="row g-3">
                          <div className="col-xl-2 col-lg-3">
                              <h6 className="title--sm">Role Name</h6>
                          </div>

                          <div className="col-xl-10 col-lg-9">
                              <Field required>
                                  <input
                                      type="text"
                                      id="firstName"
                                      className="form-control"
                                      placeholder="Enter Role Name"
                                  />
                              </Field>
                          </div>
                      </div>
                  </div>

                  <div className="form-element">
                      <div className="row g-3">
                          <div className="col-xl-2 col-lg-3">
                              <h6 className="title--sm">Language</h6>
                          </div>

                          <div className="col-xl-10 col-lg-9">
                              <div className="row row-cols-xl-3 row-cols-sm-2 row-cols-1 g-md-4 g-3">
                                  {Array.from({ length: 7 }).map((_, ind) => (
                                      <div className="col" key={ind}>
                                          <SwitchWrapper
                                              label="View Language"
                                              id={`lang-${ind}`}
                                          />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="form-element">
                      <div className="row g-3">
                          <div className="col-xl-2 col-lg-3">
                              <h6 className="title--sm">Staffs</h6>
                          </div>

                          <div className="col-xl-10 col-lg-9">
                              <div className="row row-cols-xl-3 row-cols-sm-2 row-cols-1 g-md-4 g-3">
                                  {Array.from({ length: 5 }).map((_, ind) => (
                                      <div className="col" key={ind}>
                                          <SwitchWrapper
                                              label="View Language"
                                              id={`staff-${ind}`}
                                          />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="form-element">
                      <div className="row g-3">
                          <div className="col-xl-2 col-lg-3">
                              <h6 className="title--sm">Withdraw Method</h6>
                          </div>

                          <div className="col-xl-10 col-lg-9">
                              <div className="row row-cols-xl-3 row-cols-sm-2 row-cols-1 g-md-4 g-3">
                                  {Array.from({ length: 4 }).map((_, ind) => (
                                      <div className="col" key={ind}>
                                          <SwitchWrapper
                                              label={`Method-${ind + 1}`}
                                              id={`method-${ind}`}
                                          />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-5">
                      <Button
                          type="submit"
                          className="btn--primary btn--lg rounded-3"
                      >
                          Submit
                      </Button>
                  </div>
              </form>
          </>
      </BaseLayout>
  );
};

export default CreateRole;
