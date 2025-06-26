import { useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
    BsCheck2All,
    BsEmojiSmile,
    BsEmojiSurprise,
    BsEmojiTear,
    BsFiletypePdf,
    BsThreeDotsVertical
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import {
    LuCopy,
    LuHeart,
    LuMessageSquareDashed,
    LuRedo2,
    LuThumbsDown,
    LuThumbsUp,
    LuTrash2,
    LuUndo2
} from "react-icons/lu";

import userOne from "@/assets/images/user/user-1.png";
import { useLocation } from "react-router";

const Message = ({ ...props }) => {
    const location = useLocation();
    const pathValue = location.pathname.split("/").pop();

  const modalRef = useRef();
  const attributes = {
    ...props,
    className: `message ${props.className || ""}`,
  };



  return (
      <li {...attributes}>
          <div className="message-wrapper">
              <div className="flex-shrink-0 align-self-end">
                  <img
                      src={userOne}
                      alt=""
                      className="avatar avatar-sm circle"
                  />
              </div>

              <div className="message-body">
                  <div className="message-container">
                      <div className="message-content position-relative">
                          <p>
                              After it is possible to send the client messages,
                              The input box will be present (Otherwise it needs
                              to be hidden). The input field must contain the
                              basics that WhatsApp already provides. Such as
                              sending plain text, adding emojis, text to speech,
                              adding files, photos, audio, location, create
                              buttons.
                          </p>
                          <span className="given-react">
                              <FaHeart className="text-danger" />
                          </span>
                      </div>

                      <div className="flex-shrink-0">
                          <Dropdown className="icon-dropdown">
                              <Dropdown.Toggle
                                  id="dropdown-basic"
                                  className="icon-btn dark-soft btn-ghost circle fs-18 p-1"
                              >
                                  <BsThreeDotsVertical />
                              </Dropdown.Toggle>

                              <Dropdown.Menu align="start">
                                  <ul className="dropdown-content">
                                      <li>
                                          <Dropdown.Item as={"button"}>
                                              <LuCopy /> Copy
                                          </Dropdown.Item>
                                      </li>

                                      <li>
                                          <Dropdown.Item as={"button"}>
                                              <LuMessageSquareDashed /> Mark as
                                              Unread
                                          </Dropdown.Item>
                                      </li>

                                      <li>
                                          <Dropdown.Item as={"button"}>
                                              <LuUndo2 /> Reply
                                          </Dropdown.Item>
                                      </li>

                                      <li>
                                          <Dropdown.Item as={"button"}>
                                              <LuRedo2 />
                                              Forward
                                          </Dropdown.Item>
                                      </li>

                                      <li>
                                          <Dropdown.Item as={"button"}>
                                              <LuTrash2 />
                                              Delete message
                                          </Dropdown.Item>
                                      </li>
                                  </ul>
                              </Dropdown.Menu>
                          </Dropdown>

                          <Dropdown className="icon-dropdown mt-1">
                              <Dropdown.Toggle
                                  id="dropdown-react"
                                  className="icon-btn info-soft btn-ghost circle fs-18 p-1"
                              >
                                  <BsEmojiSmile />
                              </Dropdown.Toggle>

                              <Dropdown.Menu align="start">
                                  <div className="dropdown-content user-react-dropdown">
                                      <div className="d-flex align-items-center justify-content-between gap-1">
                                          <Dropdown.Item
                                              as={"button"}
                                              eventKey="1"
                                              className="user-react-btn"
                                          >
                                              <LuThumbsUp />
                                          </Dropdown.Item>

                                          <Dropdown.Item
                                              as={"button"}
                                              eventKey="2"
                                              className="user-react-btn"
                                          >
                                              <LuThumbsDown />
                                          </Dropdown.Item>

                                          <Dropdown.Item
                                              as={"button"}
                                              eventKey="3"
                                              className="user-react-btn"
                                          >
                                              <LuHeart />
                                          </Dropdown.Item>

                                          <Dropdown.Item
                                              as={"button"}
                                              eventKey="4"
                                              className="user-react-btn"
                                          >
                                              <BsEmojiSurprise />
                                          </Dropdown.Item>

                                          <Dropdown.Item
                                              as={"button"}
                                              eventKey="5"
                                              className="user-react-btn"
                                          >
                                              <BsEmojiTear />
                                          </Dropdown.Item>
                                      </div>
                                  </div>
                              </Dropdown.Menu>
                          </Dropdown>
                      </div>
                  </div>

                  {!pathValue === "sms" && (
                      <div className="message-container">
                          <div className="message-file position-relative">
                              <span className="message-file-type">
                                  <BsFiletypePdf />
                              </span>
                              <div className="message-file-info">
                                  <h6 className="line-clamp-1">
                                      File Title.pdf
                                  </h6>
                                  <span>313 KB</span>
                              </div>
                              <span className="given-react">
                                  <FaHeart className="text-danger" />
                              </span>
                          </div>

                          <div className="flex-shrink-0">
                              <Dropdown className="icon-dropdown">
                                  <Dropdown.Toggle
                                      id="dropdown-basic"
                                      className="icon-btn dark-soft btn-ghost circle fs-18 p-1"
                                  >
                                      <BsThreeDotsVertical />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu align="start">
                                      <ul className="dropdown-content">
                                          <li>
                                              <Dropdown.Item eventKey="1">
                                                  <LuCopy /> Copy
                                              </Dropdown.Item>
                                          </li>

                                          <li>
                                              <Dropdown.Item eventKey="2">
                                                  <LuMessageSquareDashed /> Mark
                                                  as Unread
                                              </Dropdown.Item>
                                          </li>

                                          <li>
                                              <Dropdown.Item eventKey="3">
                                                  <LuUndo2 /> Reply
                                              </Dropdown.Item>
                                          </li>

                                          <li>
                                              <Dropdown.Item
                                                  eventKey="4"
                                                  onClick={handleModalShow}
                                              >
                                                  <LuRedo2 />
                                                  Forward
                                              </Dropdown.Item>
                                          </li>

                                          <li>
                                              <Dropdown.Item eventKey="5">
                                                  <LuTrash2 />
                                                  Delete message
                                              </Dropdown.Item>
                                          </li>
                                      </ul>
                                  </Dropdown.Menu>
                              </Dropdown>

                              <Dropdown className="icon-dropdown mt-1">
                                  <Dropdown.Toggle
                                      id="dropdown-react"
                                      className="icon-btn info-soft btn-ghost circle fs-18 p-1"
                                  >
                                      <BsEmojiSmile />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu align="start">
                                      <div className="dropdown-content user-react-dropdown">
                                          <div className="d-flex align-items-center justify-content-between gap-2">
                                              <Dropdown.Item
                                                  eventKey="1"
                                                  className="user-react-btn"
                                              >
                                                  <LuThumbsUp />
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                  eventKey="2"
                                                  className="user-react-btn"
                                              >
                                                  <LuThumbsDown />
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                  eventKey="3"
                                                  className="user-react-btn"
                                              >
                                                  <LuHeart />
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                  eventKey="4"
                                                  className="user-react-btn"
                                              >
                                                  <BsEmojiSurprise />
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                  eventKey="5"
                                                  className="user-react-btn"
                                              >
                                                  <BsEmojiTear />
                                              </Dropdown.Item>
                                          </div>
                                      </div>
                                  </Dropdown.Menu>
                              </Dropdown>
                          </div>
                      </div>
                  )}

                  <span className="message-time fs-12">
                      05:30 pm
                      <BsCheck2All className="fs-16 text-success" />
                  </span>
              </div>
          </div>
      </li>
  );
};

export default Message;

