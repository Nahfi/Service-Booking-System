import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  BsArrowRight,
  BsPencilSquare,
  BsPlusLg,
  BsTrash3,
} from "react-icons/bs";
import "./chat-profile.scss";

import userOne from "@/assets/images/user/user-1.png";
import CollapseItem from "../../../../../../components/common/collapse/CollapseItem";


const ChatProfile = ({ profileAction }) => {
  const [activeModal, setActiveModal] = useState(null);
  const modalRef = useRef();
  const { handleHideProfile, showProfile } = profileAction;

  const MODAL_TYPES = {
    ADD: "add",
    EDIT: "edit",
    DELETE: "delete",
  };

  const handleModalClose = () => {
    setActiveModal(null);
    if (modalRef.current) {
      modalRef.current.hide();
    }
  };

  const handleModalShow = (modalType) => {
    setActiveModal(modalType);
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  // Add a useEffect to check modalRef readiness
  useEffect(() => {
    if (modalRef.current && activeModal) {
      modalRef.current.open();
    }
  }, [activeModal]);

  return (
    <>
      <div
        className="col-auto chat-profile"
        style={{
          transform: showProfile ? "translateX(0)" : "",
        }}
      >
        <div className="chat-header profile-header">
          <h6>Profile Details</h6>
          <button
            className="bg--transparent text-muted fs-20 lh-1 d-xxl-none d-block"
            onClick={handleHideProfile}
          >
            <BsArrowRight />
          </button>
        </div>

        <div className="profile-body scroll scroll-3">
          <div className="text-center mb-4">
            <img src={userOne} alt="" className="avatar avatar-xxl circle" />
            <h5 className="mt-20">Jane Doe</h5>
            <p className="text-ternary mt-2">jane.doe@gmail.com</p>
          </div>

          <div className="d-flex flex-column gap-3">
            <CollapseItem title="Notes" className="profile-collapse">
              <div className="collapse-body-content">
                <p className="fs-12 text-dark fw-medium">
                  In some other cases, a note can also be used as an agreement
                  for financial purposes
                </p>

                <span className="fs-12">by Jane Doe on 12 May 2024</span>
                <div className="d-flex align-items-center gap-3 lh-1 mt-4">
                  <button
                    className="i-btn btn--primary btn--md rounded-3"
                    onClick={() => handleModalShow(MODAL_TYPES.ADD)}
                  >
                    Add notes <BsPlusLg className="fs-16" />
                  </button>

                  <button
                    className="bg--transparent text-danger fs-18"
                    onClick={() => handleModalShow(MODAL_TYPES.DELETE)}
                  >
                    <BsTrash3 />
                  </button>

                  <button
                    className="bg--transparent text-info fs-18"
                    onClick={() => handleModalShow(MODAL_TYPES.EDIT)}
                  >
                    <BsPencilSquare />
                  </button>
                </div>
              </div>
            </CollapseItem>

            <CollapseItem title="Tags" className="profile-collapse">
              <div className="collapse-body-content">
                <div className="d-flex gap-2 flex-wrap">
                  <Link to="" className="text-dark fs-14 py-0 px-2 bg-white rounded-2 border">
                    #Birthday
                  </Link>

                  <Link to="" className="text-dark fs-14 py-0 px-2 bg-white rounded-2 border">
                    #Anniversary
                  </Link>

                  <Link to="" className="text-dark fs-14 py-0 px-2 bg-white rounded-2 border">
                    #Hangout
                  </Link>
                </div>
              </div>
            </CollapseItem>

            <CollapseItem title="Personal Info" className="profile-collapse">
              <div className="collapse-body-content">
                <ul className="d-flex flex-column gap-3">
                  <li className="d-flex flex-column">
                    <span className="fs-14">Email</span>
                    <Link to="mailto:jane.doe@gmail.com" className="text-dark">
                      jane.doe@gmail.com
                    </Link>
                  </li>

                  <li className="d-flex flex-column">
                    <span className="fs-14">Phone Number</span>
                    <Link to="tel:+1 234 567 8900" className="text-dark">
                      +1 234 567 8900
                    </Link>
                  </li>

                  <li className="d-flex flex-column">
                    <span className="fs-14">Address</span>
                    <p className="text-dark">Mirpur -1, Peacy Park, Dhaka</p>
                  </li>
                </ul>
              </div>
            </CollapseItem>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      {showProfile && (
        <div
          id="sidebar-overlay"
          className="sidebar-overlay"
          role="button"
          onClick={handleHideProfile}
        ></div>
      )}

      {/* Modal */}
      {activeModal === MODAL_TYPES.ADD || activeModal === MODAL_TYPES.EDIT ? (
        <ModalWrapper
          title={activeModal === MODAL_TYPES.ADD ? "Add Note" : "Edit Note"}
          ref={modalRef}
          onHide={handleModalClose}
          backdrop="static"
          scrollable
          centered
        >
          <AddNote onModalClose={handleModalClose} />
        </ModalWrapper>
      ) : (
        activeModal === MODAL_TYPES.DELETE && (
          <ModalWrapper
            ref={modalRef}
            title=""
            onHide={handleModalClose}
            centered
          >
            <div className="text-center">
              <h3 className="fs-24 mb-2">Delete this note</h3>
              <p>Are you sure you want to delete this note?</p>
              <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                <button
                  className="i-btn btn--dark btn--lg outline rounded-3"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  className="i-btn btn--danger btn--lg rounded-3"
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </ModalWrapper>
        )
      )}
    </>
  );
};

export default ChatProfile;
