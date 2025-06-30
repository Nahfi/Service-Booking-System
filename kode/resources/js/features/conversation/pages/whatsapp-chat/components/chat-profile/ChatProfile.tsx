import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  BsArrowRight,
  BsPencilSquare
} from "react-icons/bs";
import "./chat-profile.scss";

import userOne from "@/assets/images/user/user-1.png";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import Button from "../../../../../../components/common/button/Button";
import CollapseItem from "../../../../../../components/common/collapse/CollapseItem";


const ChatProfile = ({ profileAction }) => {
  const [activeModal, setActiveModal] = useState(null);
  const modalRef = useRef();
  const { handleHideProfile, showProfile, openModal } = profileAction;

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
                      <img
                          src={userOne}
                          alt=""
                          className="avatar avatar-xxl circle"
                      />
                      <h5 className="mt-20">Jane Doe</h5>
                      <p className="text-ternary mt-2">jane.doe@gmail.com</p>
                  </div>

                  <div className="d-flex flex-column gap-3">
                      <CollapseItem
                          title="Personal Info"
                          className="profile-collapse"
                      >
                          <div className="collapse-body-content">
                              <ul className="d-flex flex-column gap-3">
                                  <li className="d-flex flex-column">
                                      <span className="fs-14">Email</span>
                                      <Link
                                          to="mailto:jane.doe@gmail.com"
                                          className="text-dark"
                                      >
                                          jane.doe@gmail.com
                                      </Link>
                                  </li>

                                  <li className="d-flex flex-column">
                                      <span className="fs-14">
                                          Phone Number
                                      </span>
                                      <Link
                                          to="tel:+1 234 567 8900"
                                          className="text-dark"
                                      >
                                          +1 234 567 8900
                                      </Link>
                                  </li>

                                  <li className="d-flex flex-column">
                                      <span className="fs-14">Address</span>
                                      <p className="text-dark">
                                          Mirpur -1, Peacy Park, Dhaka
                                      </p>
                                  </li>
                              </ul>
                          </div>
                      </CollapseItem>

                      <CollapseItem title="Notes" className="profile-collapse">
                          <div className="collapse-body-content">
                              <div className="mb-3 d-flex flex-column gap-2 note-container scroll scroll-3">
                                  <div className="p-2 bg-white rounded-2">
                                      <p className="fs-14 text-dark fw-medium">
                                          In some other cases, a note can also
                                          be used as an agreement for financial
                                          purposes
                                      </p>

                                      <div className="d-flex align-items-center gap-1 lh-1 mt-2">
                                          <Button
                                              iconBtn={true}
                                              tooltipText="Edit Note"
                                              icon={BsPencilSquare}
                                              className="info-soft btn-sm btn-ghost circle fs-16"
                                              onClick={() =>
                                                  openModal(
                                                      "EDIT_NOTE",
                                                      "Edit Note",
                                                      ""
                                                  )
                                              }
                                          />
                                          <Button
                                              iconBtn={true}
                                              tooltipText="Delete Note"
                                              icon={LuTrash2}
                                              className="danger-soft btn-sm btn-ghost circle fs-16"
                                              onClick={() =>
                                                  openModal("DELETE", "", "")
                                              }
                                          />
                                      </div>
                                  </div>
                              </div>

                              <Button
                                  className="btn--primary btn--sm rounded-3"
                                  onClick={() =>
                                      openModal("ADD_NOTE", "Add Note", "")
                                  }
                              >
                                  Add notes <LuPlus />
                              </Button>
                          </div>
                      </CollapseItem>

                      <CollapseItem title="Tags" className="profile-collapse">
                          <div className="collapse-body-content">
                              <div className="d-flex gap-2 flex-wrap">
                                  <Link
                                      to=""
                                      className="text-dark fs-14 py-0 px-2 bg-white rounded-2 border"
                                  >
                                      #Birthday
                                  </Link>

                                  <Link
                                      to=""
                                      className="text-dark fs-14 py-0 px-2 bg-white rounded-2 border"
                                  >
                                      #Anniversary
                                  </Link>

                                  <Link
                                      to=""
                                      className="text-dark fs-14 py-0 px-2 bg-white rounded-2 border"
                                  >
                                      #Hangout
                                  </Link>
                              </div>
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
      </>
  );
};

export default ChatProfile;
