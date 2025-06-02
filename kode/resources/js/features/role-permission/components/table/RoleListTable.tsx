
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  BsBan,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3,
  BsVolumeMute
} from "react-icons/bs";
import Button from '../../../../components/common/button/Button';

const RoleListTable: React.FC = () => {
  return (
    <>
      <thead>
        <tr>
          <th>
            <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
              <input type="checkbox" id="roleId" />
              Name
            </div>
          </th>
          <th>Status</th>
          <th>Created By</th>
          <th>Updated By</th>
          <th>Actions</th>
        </tr>
      </thead>
      
      <tbody>
        {Array.from({ length: 7 }).map((_, ind) => (
          <tr key={ind}>
            <td>
              <div className="d-flex justify-content-start align-items-start gap-3">
                <input type="checkbox" name="contactCheckbox" id={ind} />
                <h6 className="fs-15">Jane Cooper</h6>
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
              <span className="i-badge pill info-soft">Admin</span>
            </td>

            <td>
              <span className="i-badge pill info-soft">Admin</span>
            </td>

            <td>
              <div className="d-flex align-items-center justify-content-end gap-1">
                <Button
                  iconBtn={true}
                  tooltipText="Edit"
                  icon={BsPencilSquare}
                  href={`/roles/create`}
                  className="warning-soft btn-ghost hover btn-md rounded-3"
                />

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
    </>
  );
}

export default RoleListTable;