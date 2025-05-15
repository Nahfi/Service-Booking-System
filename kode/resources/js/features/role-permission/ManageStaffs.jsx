import { useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  BsBan,
  BsPencilSquare,
  BsPlusLg,
  BsRecycle,
  BsThreeDotsVertical,
  BsTrash3,
  BsVolumeMute,
} from "react-icons/bs";
import { Link } from "react-router-dom";



import userImg from "@/assets/images/user/user-1.png";
import BaseLayout from "@/components/layouts/BaseLayout";
import Filter from "../../components/common/filter/Filter";
import Field from "../../components/common/from/Field";
import ModalWrapper from "../../components/common/modal/ModalWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PaginationWrapper from "../../components/common/pagination/PaginationWrapper";
import Table from "../../components/common/table/Table";

const ManageStaffs = () => {
  const modalRef = useRef();

  const handleShowModal = () => {
    modalRef.current.open();
  };

  const handleHideModal = () => {
    modalRef.current.hide();
  };
  return (
      <>
          <BaseLayout>
              <PageHeader
                  title={"Manage Staffs"}
                  shortTitle={"Manage your Staff"}
              >
                  <>
                      <button
                          onClick={handleShowModal}
                          className="i-btn btn--primary btn--lg rounded-3"
                      >
                          <BsPlusLg className="fs-16" /> Add New staff
                      </button>

                      <button className="i-btn btn--danger btn--lg rounded-3">
                          <BsRecycle className="fs-16" />
                          Recycle Bin
                      </button>
                  </>
              </PageHeader>

              <div>
                  <div className="mb-4">
                      <Filter />
                  </div>

                  <Table>
                      <thead>
                          <tr>
                              <th>
                                  <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                                      <input type="checkbox" id="roleId" />
                                      Profile Details
                                  </div>
                              </th>
                              <th>Status</th>
                              <th>Created By</th>
                              <th>Role Type</th>
                              <th>Last Login</th>
                              <th>Actions</th>
                          </tr>
                      </thead>

                      <tbody>
                          {Array.from({ length: 7 }).map((_, ind) => (
                              <tr key={ind}>
                                  <td>
                                      <div className="d-flex justify-content-start align-items-center gap-3">
                                          <input
                                              type="checkbox"
                                              name="contactCheckbox"
                                              id={ind}
                                          />

                                          <div className="d-flex justify-content-start align-items-center gap-3">
                                              <div className="flex-shrink-0 avatar avatar-md circle">
                                                  <img src={userImg} alt="" />
                                              </div>

                                              <div>
                                                  <h6 className="fs-15">
                                                      Jane Cooper
                                                  </h6>
                                                  <div>
                                                      <Link
                                                          to="mailto:Alanrebeca@kodepixel.com"
                                                          className="fs-14 text-ternary d-inline-block"
                                                      >
                                                          Alanrebeca@kodepixel.com
                                                      </Link>

                                                      <Link
                                                          to="tel:Alanrebeca@kodepixel.com"
                                                          className="fs-14 text-ternary d-block"
                                                      >
                                                          +1(555) 678-9012
                                                      </Link>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </td>

                                  <td>
                                      <div className="form-check form-switch">
                                          <input
                                              className="form-check-input"
                                              type="checkbox"
                                              role="switch"
                                              id={`switch-${ind + 1}`}
                                          />
                                      </div>
                                  </td>

                                  <td>
                                      <span className="i-badge pill info-soft">
                                          Admin
                                      </span>
                                  </td>

                                  <td>
                                      <span className="i-badge pill info-soft">
                                          Admin
                                      </span>
                                  </td>

                                  <td>
                                      <span className="">3 days ago</span>
                                  </td>

                                  <td>
                                      <div className="d-flex align-items-center justify-content-end gap-1">
                                          <button className="icon-btn warning-soft btn-ghost hover btn-md rounded-3 fs-18">
                                              <BsPencilSquare />
                                          </button>

                                          <Dropdown className="icon-dropdown">
                                              <Dropdown.Toggle
                                                  id="dropdown-5"
                                                  className="icon-btn dark-soft btn-ghost hover btn-md fs-18 rounded-3 p-0"
                                              >
                                                  <BsThreeDotsVertical />
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu align={`end`}>
                                                  <ul className="dropdown-content">
                                                      <li>
                                                          <Dropdown.Item>
                                                              <BsVolumeMute />
                                                              Mute
                                                          </Dropdown.Item>
                                                      </li>

                                                      <li>
                                                          <Dropdown.Item>
                                                              <BsBan />
                                                              Blocked
                                                          </Dropdown.Item>
                                                      </li>

                                                      <li>
                                                          <Dropdown.Item>
                                                              <BsTrash3 />
                                                              Delete Chat
                                                          </Dropdown.Item>
                                                      </li>
                                                  </ul>
                                              </Dropdown.Menu>
                                          </Dropdown>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>

                  <div className="mt-4">
                      <PaginationWrapper />
                  </div>
              </div>
          </BaseLayout>

          {/* Add Staff Modal */}
          <ModalWrapper
              title="Add staff"
              onHide={handleHideModal}
              ref={modalRef}
              scrollable
              centered
              size="lg"
          >
              <form action="">
                  <div className="row g-lg-4 g-3">
                      <div className="col-md-6">
                          <Field label="Name" required>
                              <input
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  placeholder="Enter name"
                              />
                          </Field>
                      </div>

                      <div className="col-md-6">
                          <Field label="Username" required>
                              <input
                                  type="text"
                                  id="userName"
                                  className="form-control"
                                  placeholder="Enter username"
                              />
                          </Field>
                      </div>

                      <div className="col-md-6">
                          <Field label="Email" required>
                              <input
                                  type="email"
                                  id="userEmail"
                                  className="form-control"
                                  placeholder="Enter Email"
                              />
                          </Field>
                      </div>

                      <div className="col-md-6">
                          <Field label="Phone" required>
                              <input
                                  type="tel"
                                  id="userEmail"
                                  className="form-control"
                                  placeholder="Enter Phone"
                              />
                          </Field>
                      </div>

                      <div className="col-md-6">
                          <Field label="Status" required>
                              <select
                                  name="status"
                                  id="status"
                                  className="form-select"
                              >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                              </select>
                          </Field>
                      </div>

                      <div className="col-md-6">
                          <Field label="Select Role" required>
                              <select
                                  name="role"
                                  id="role"
                                  className="form-select"
                              >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                              </select>
                          </Field>
                      </div>

                      <div className="col-12">
                          <Field label="Profile Image">
                              <input
                                  type="file"
                                  id="staffImage"
                                  className="form-control"
                                  placeholder="Enter Phone"
                              />
                          </Field>
                      </div>

                      <div className="col-12">
                          <Field label="Password" required>
                              <input
                                  type="password"
                                  id="password"
                                  className="form-control"
                                  placeholder="Enter Phone"
                              />
                          </Field>
                      </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-5">
                      <button
                          type="button"
                          className="i-btn btn--dark btn--lg outline rounded-3"
                          onClick={handleHideModal}
                      >
                          Cancel
                      </button>

                      <button
                          type="submit"
                          className="i-btn btn--primary btn--lg rounded-3"
                          onClick={handleHideModal}
                      >
                          Save
                      </button>
                  </div>
              </form>
          </ModalWrapper>
      </>
  );
};

export default ManageStaffs;
