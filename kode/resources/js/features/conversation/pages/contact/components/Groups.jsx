import { useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  BsBan,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3,
  BsVolumeMute,
} from "react-icons/bs";

import empty from "@/assets/images/empty.svg";
import { LuUser } from "react-icons/lu";
import Filter from "../../../../../components/common/filter/Filter";
import Field from "../../../../../components/common/from/Field";
import ModalWrapper from "../../../../../components/common/modal/ModalWrapper";
import PaginationWrapper from "../../../../../components/common/pagination/PaginationWrapper";

const Groups = () => {
  const [contactData, setContactData] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const selectAllContact = useRef();
  const modalRef = useRef();

  const handleSelectAll = () => {
    const isChecked = selectAllContact.current.checked;
    const checkboxes = document.querySelectorAll(
      "input[name='contactCheckbox']"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    if (isChecked) {
      setSelectedContacts(Array.from({ length: 7 }, (_, i) => i));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleCheckboxChange = (e, contactId) => {
    if (e.target.checked) {
      setSelectedContacts([...selectedContacts, contactId]);
    } else {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    }
  };

  const handleShowModal = () => {
    modalRef.current.open();
  };

  const handleHideModal = () => {
    modalRef.current.hide();
  };

  return (
    <>
      {contactData === "null" ? (
        <div className="h-100 d-flex align-items-center justify-content-center flex-column mt-120 gap-4">
          <div>
            <img src={empty} alt="Empty Group" />
          </div>

          <div className="text-center">
            <h5 className="mb-2">You don’t have any group!</h5>
            <p>Add new group and continue enriching your contact database.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Filter />
          </div>

          <TableWrapper>
            <thead>
              <tr>
                <th>
                  <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                    <input
                      type="checkbox"
                      ref={selectAllContact}
                      onChange={handleSelectAll}
                    />
                    No
                  </div>
                </th>
                <th>Group Name</th>
                <th>Contacts </th>
                <th>Status</th>
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
                        onChange={(e) => handleCheckboxChange(e, ind)}
                      />
                      <h6 className="fs-15">{ind + 1}</h6>
                    </div>
                  </td>

                  <td>
                    <span className="text--primary">Team {ind + 1}</span>
                  </td>

                  <td>
                    <span className="i-badge pill success-soft">View All</span>
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
                    <div className="d-flex align-items-center justify-content-end gap-1">
                      <button
                        onClick={handleShowModal}
                        className="icon-btn warning-soft btn-ghost hover btn-md rounded-3 fs-18"
                      >
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
                            <li className="d-xxl-none">
                              <Dropdown.Item>
                                <LuUser />
                                Profile
                              </Dropdown.Item>
                            </li>

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
          </TableWrapper>

          <div className="mt-4">
            <PaginationWrapper />
          </div>
        </>
      )}

      <ModalWrapper
        title="Create a Group Name"
        onHide={handleHideModal}
        ref={modalRef}
        centered
      >
        <form action="#">
          <Field label={"Group Name"}>
            <input
              type="text"
              id="search"
              placeholder="Enter group name"
              className="form-control"
            />
          </Field>
          <p className="mt-2">Enter the name to create a group.</p>

          <div className="d-flex align-items-center gap-3 mt-5">
            <button className="i-btn btn--dark outline btn--lg rounded-3">
              Cancel
            </button>

            <button
              type="submit"
              className="i-btn btn--primary btn--lg rounded-3"
            >
              Save
            </button>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default Groups;
