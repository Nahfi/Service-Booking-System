

import userProfile from "@/assets/images/user/user-1.png";
import { Dropdown } from "react-bootstrap";
import { BsPlugin } from "react-icons/bs";
import { LuEllipsisVertical, LuLayoutTemplate, LuLink2Off, LuRefreshCw, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";
import Button from "../../../../../../components/common/button/Button";

const ChannelsTable: React.FC = ({ actions }) => {
  
  return (
    <>
      <thead>
        <tr>
          <th>
            <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
              <b>#</b>
              <span>Account info</span>
            </div>
          </th>
          <th>Status</th>
          <th>Connection Status</th>
          <th>Templates</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 7 }).map((_, ind) => (
          <tr key={ind}>
            <td>
              <div className="d-flex justify-content-start align-items-start gap-3">
                <b className="fs-15">{ind + 1}.</b>
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <div className="flex-shrink-0 avatar avatar-md circle">
                    <img
                      src={userProfile}
                      alt="user profile image"
                      className="w-100 h-100"
                    />
                  </div>

                    <h6 className="fs-15">
                      {`John`}
                    </h6>
                </div>
              </div>
            </td>

            <td>
              <span className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`attribute-${ind}`}
                />
              </span>
            </td>

            <td>
                <span className="i-badge pill danger-soft lh-1 py-2">
                   <LuLink2Off className="me-1 fs-14" />
                    Disconnected
                </span>
            </td>

            <td>
              <div className="d-flex align-items-center gap-2">
                <Link className="i-badge pill dark-soft lh-1 py-2" to={`/conversation/templates?type=whatsapp`}>
                  <LuLayoutTemplate className="me-1 fs-14" />
                  View all (12)
                </Link>

                <Button
                  iconBtn={true}
                  tooltipText="Sync business account template"
                  icon={LuRefreshCw}
                  className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                />
              </div>
            </td>

            <td>
              <span>2024-01-10</span>
            </td>

            <td>
              <div className="d-flex align-items-center justify-content-end gap-1">
                <Button
                  iconBtn={true}
                  tooltipText="Reconnect"
                  icon={BsPlugin}
                  className="warning-soft btn-ghost hover btn-sm rounded-circle fs-18"
                />
                <Dropdown className="icon-dropdown">
                  <Dropdown.Toggle
                    id="dropdown-5"
                    className="icon-btn dark-soft btn-ghost hover btn-md circle fs-18 p-0"
                  >
                    <LuEllipsisVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align={`end`}>
                    <div className="dropdown-content">
                      <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                        actions.modal.modalUid,
                        "EDIT",
                        "Update channel",
                        "lg"
                      )
                      }
                      >
                        <LuSquarePen />
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                        actions.modal.modalUid,
                        "DELETE",
                        "",
                        ""
                      )
                      }>
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

export default ChannelsTable