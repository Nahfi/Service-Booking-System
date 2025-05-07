import { useRef, useState } from "react";
import Filter from "../../../../components/common/filter/Filter";
import Field from "../../../../components/common/from/Field";
import ImageUpload from "../../../../components/common/from/ImageUpload";
import SelectBox from "../../../../components/common/from/SelectBox";
import ModalWrapper from "../../../../components/common/modal/ModalWrapper";
import PaginationWrapper from "../../../../components/common/pagination/PaginationWrapper";
import Table from "../../../../components/common/table/Table";


const AllContacts = () => {
  const [contactData, setContactData] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const selectAllContact = useRef();
  const modalRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactData("");
  };

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
      {contactData === null ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-20">
            <h6 className="fs-18">Upload your file</h6>
            <p className="fs-14">
              Add your documents here, and you can upload up to 5 files max
            </p>
          </div>

          <ImageUpload
            uploadText="Drag your file(s) or Browse"
            maxFile="Max 20 MB files are allowed"
          />

          <p className="fs-14 mt-2">
            Only support extension of <span className="text-info">.csv</span>,
            <span className="text-info">.dsv</span>,
            <span className="text-info">.txt</span> or
            <span className="text-info">.xlsx.</span>
          </p>

          <div className="mt-4">
            <button className="i-btn btn--primary btn--lg rounded-3">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="row row-cols-xl-3 g-4">
            <div className="col">
              <div className="contact-status-card">
                <p>Total Contacts</p>
                <h6>2105</h6>
              </div>
            </div>

            <div className="col">
              <div className="contact-status-card">
                <p>Active contacts</p>
                <h6>75.25%</h6>
              </div>
            </div>

            <div className="col">
              <div className="contact-status-card">
                <p>Contact Blacklisted</p>
                <h6>150</h6>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-4">
              <Filter />
            </div>

            <Table>
              <thead>
                {selectedContacts.length >= 1 ? (
                  <tr>
                    <th>
                      <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                        <input
                          type="checkbox"
                          ref={selectAllContact}
                          onChange={handleSelectAll}
                        />
                        <div className="d-flex align-items-center gap-4">
                          <button
                            className="bg--transparent text-primary fw-bold"
                            onClick={handleShowModal}
                          >
                            Add to Group
                          </button>

                          <button className="bg--transparent text-primary fw-bold">
                            More Action
                          </button>
                        </div>
                      </div>
                    </th>
                    <th colSpan="2"></th>
                    <th>
                      <span className="fw-normal">
                        {selectedContacts.length} Contact Selected
                      </span>
                    </th>
                  </tr>
                ) : (
                  <tr>
                    <th>
                      <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                        <input
                          type="checkbox"
                          ref={selectAllContact}
                          onChange={handleSelectAll}
                        />
                        Name
                      </div>
                    </th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Date Added</th>
                  </tr>
                )}
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
                        <h6 className="fs-15">Jane Cooper</h6>
                      </div>
                    </td>

                    <td>
                      <span className="text--primary">5146846548465</span>
                    </td>

                    <td>
                      <span className="i-badge pill success-soft">
                        Subscribed
                      </span>
                    </td>

                    <td>
                      <span className="text--primary">25/06/2024</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="mt-4">
              <PaginationWrapper />
            </div>
          </div>
        </>
      )}

      <ModalWrapper
        title="Add to a Group"
        onHide={handleHideModal}
        ref={modalRef}
        centered
      >
        <form action="#">
          <Field label={"Choose Group"}>
            <SelectBox />
          </Field>
          <p className="mt-2">
            Select the members of your group where you want to send this
            campaign.
          </p>

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

export default AllContacts;
