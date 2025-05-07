import { useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  BsBan,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3,
  BsVolumeMute,
} from "react-icons/bs";
import Filter from "../../../../components/common/filter/Filter";
import Field from "../../../../components/common/from/Field";
import SelectBox from "../../../../components/common/from/SelectBox";
import ModalWrapper from "../../../../components/common/modal/ModalWrapper";
import PaginationWrapper from "../../../../components/common/pagination/PaginationWrapper";
import Table from "../../../../components/common/table/Table";


const Attribute = () => {
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
      <>
        <div className="mb-4">
          <Filter />
        </div>

        <Table>
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
              <th>Attribute Name</th>
              <th>Attribute Type</th>
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
                  <span className="text--primary">Team {ind + 1}</span>
                </td>

                <td>
                  <span className="i-badge pill success-soft">Subscribed</span>
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
      </>

      <ModalWrapper
        title="Add attribute"
        onHide={handleHideModal}
        ref={modalRef}
        centered
      >
        <form action="#">
          <div>
            <Field label={"Attribute Name"}>
              <input
                type="text"
                id="search"
                placeholder="Enter group name"
                className="form-control"
              />
            </Field>
            <p className="mt-2">Enter the name to create a group.</p>
          </div>

          <div className="mt-4">
            <Field label={"Choose Group"}>
              <SelectBox />
            </Field>
            <p className="mt-2">Enter the name to create a group.</p>
          </div>

          <div className="d-flex align-items-center gap-3 mt-5">
            <button
              type="button"
              className="i-btn btn--dark outline btn--lg rounded-3"
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

export default Attribute;
