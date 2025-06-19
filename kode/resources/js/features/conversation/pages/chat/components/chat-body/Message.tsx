import { useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  BsCheck2All,
  BsEmojiSmile,
  BsEmojiSurprise,
  BsEmojiTear,
  BsFiletypePdf,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import {
  LuCopy,
  LuHeart,
  LuMessageSquareDashed,
  LuRedo2,
  LuSearch,
  LuThumbsDown,
  LuThumbsUp,
  LuTrash2,
  LuUndo2,
} from "react-icons/lu";

import userOne from "@/assets/images/user/user-1.png";
import SelectBox from "@/components/common/from/SelectBox";
import ModalWrapper from "@/components/common/modal/ModalWrapper";

const Message = ({ ...props }) => {
  const modalRef = useRef();
  const attributes = {
    ...props,
    className: `message ${props.className || ""}`,
  };

  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.hide();
    }
  };

  const handleModalShow = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  return (
    <>
      <li {...attributes}>
        <div className="message-wrapper">
          <div className="flex-shrink-0 align-self-end">
            <img src={userOne} alt="" className="avatar avatar-sm circle" />
          </div>

          <div className="message-body">
            <div className="message-content">
              <p>
                After it is possible to send the client messages, The input box
                will be present (Otherwise it needs to be hidden). The input
                field must contain the basics that WhatsApp already provides.
                Such as sending plain text, adding emojis, text to speech,
                adding files, photos, audio, location, create buttons.
              </p>
            </div>

            <div className="message-file">
              <span className="message-file-type">
                <BsFiletypePdf />
              </span>
              <div className="message-file-info">
                <h6 className="line-clamp-1">File Title.pdf</h6>
                <span>313 KB</span>
              </div>
            </div>

            <span className="given-react">
              <FaHeart className="text-danger" />
            </span>

            <span className="message-time fs-12">
              05:30 pm
              <BsCheck2All className="fs-16 text-success" />
            </span>
          </div>

          <div className="flex-shrink-0">
            <Dropdown className="icon-dropdown">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="icon-btn dark-soft btn-sm btn-ghost circle fs-18 p-0"
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
                      <LuMessageSquareDashed /> Mark as Unread
                    </Dropdown.Item>
                  </li>

                  <li>
                    <Dropdown.Item eventKey="3">
                      <LuUndo2 /> Reply
                    </Dropdown.Item>
                  </li>

                  <li>
                    <Dropdown.Item eventKey="4" onClick={handleModalShow}>
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

            <Dropdown className="mt-1 icon-dropdown">
              <Dropdown.Toggle
                id="dropdown-react"
                className="icon-btn dark-soft btn-sm btn-ghost circle fs-18 p-0"
              >
                <BsEmojiSmile />
              </Dropdown.Toggle>

              <Dropdown.Menu align="start">
                <div className="dropdown-content user-react-dropdown">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <Dropdown.Item eventKey="1" className="user-react-btn">
                      <LuThumbsUp />
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="2" className="user-react-btn">
                      <LuThumbsDown />
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="3" className="user-react-btn">
                      <LuHeart />
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="4" className="user-react-btn">
                      <BsEmojiSurprise />
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="5" className="user-react-btn">
                      <BsEmojiTear />
                    </Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </li>

      <ModalWrapper
        ref={modalRef}
        title={`Forward this message`}
        onHide={handleModalClose}
        scrollable
        centered
      >
        <div>
          <SelectBox options={""} isMulti icon={<LuSearch />} />

          <div className="mt-4">
            <h6 className="mb-2">Suggested</h6>

            <ul className="ul-list">
              {Array.from({ length: 6 }).map((item, ind) => (
                <li
                  key={ind}
                  className="d-flex align-items-center justify-content-between gap-4 py-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="avatar avatar-md circle flex-shrink-0">
                      <img src={userOne} alt="" className="w-100" />
                    </span>

                    <h6>Clara Mendis</h6>
                  </div>

                  <div>
                    <button className="i-btn btn--primary btn--md outline rounded-3">
                      Send Message
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default Message;
