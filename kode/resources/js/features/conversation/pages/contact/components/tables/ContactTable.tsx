import { Dropdown } from "react-bootstrap"
import { LuEllipsisVertical, LuSquarePen, LuTrash2 } from "react-icons/lu"

const ContactTable = ({ actions }) => {
  return (
      <>
          <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                            <input
                                type="checkbox"
                            />
                            Name
                        </div>
                    </th>
                    <th>Phone Number</th>
                    <th>Status</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
          </thead>

          <tbody>
              {Array.from({ length: 7 }).map((_, ind) => (
                  <tr key={ind}>
                      <td>
                          <div className="d-flex justify-content-start align-items-start gap-3">
                              <input
                                  type="checkbox"
                                  name="contactCheckbox"
                                  id={ind}
                              />
                              <h6 className="fs-15">
                                  Jane Cooper
                              </h6>
                          </div>
                      </td>

                      <td>
                          <span className="text--primary">
                              5146846548465
                          </span>
                      </td>

                      <td>
                          <span className="i-badge pill success-soft">
                              Subscribed
                          </span>
                      </td>

                      <td>
                          <span className="text--primary">
                              25/06/2024
                          </span>
                      </td>

                      <td>
                          <div className="d-flex align-items-center justify-content-end gap-1">
                              <Dropdown className="icon-dropdown">
                                  <Dropdown.Toggle
                                      id="dropdown-5"
                                      className="icon-btn dark-soft btn-ghost hover btn-md fs-18 rounded-3 p-0"
                                  >
                                      <LuEllipsisVertical />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu align={`end`}>
                                      <div className="dropdown-content">
                                          <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                                              "EDIT",
                                              "Update contact",
                                              "lg")}>
                                              <LuSquarePen />
                                              Edit
                                          </Dropdown.Item>

                                          <Dropdown.Item as="button">
                                              <LuTrash2 />
                                              Delete
                                          </Dropdown.Item>
                                      </div>
                                  </Dropdown.Menu>
                              </Dropdown>
                          </div>
                      </td>
                  </tr>
              ))}
          </tbody>
      </>
  )
}

export default ContactTable