import Button from "@/components/common/button/Button";
import { ThemeContext } from "@/context";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { BsEmojiSmileFill, BsMic } from "react-icons/bs";
import { LuPaperclip, LuSendHorizontal } from "react-icons/lu";

const ChatComposer = () => {
  const { themeSettings } = useContext(ThemeContext);
  return (
      <div className="chat-body-footer">
          <form action="#" className="d-flex align-items-center gap-3 w-100">
              <div className="d-flex align-items-center gap-3 flex-shrink-0">
                  <Dropdown className="icon-dropdown">
                      <Dropdown.Toggle
                          id="dropdown-5"
                          className="bg--transparent text-muted fs-20 lh-1fs-20 p-0"
                      >
                          <LuPaperclip />
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                          align={`${themeSettings.dir === "ltr" ? "end" : ""}`}
                      >
                          <ul className="dropdown-content">
                              <li className="d-xxl-none">
                                  <Dropdown.Item>New Group</Dropdown.Item>
                                  <Dropdown.Item>Archived</Dropdown.Item>
                                  <Dropdown.Item>Starred message</Dropdown.Item>
                                  <Dropdown.Item>Select chats</Dropdown.Item>
                              </li>
                          </ul>
                      </Dropdown.Menu>
                  </Dropdown>

                  <Button className="bg--transparent text-muted fs-20 lh-1">
                      <BsMic />
                  </Button>
              </div>

              <input
                  type="text"
                  placeholder="Write a message…"
                  className="w-100 border-0 py-1 bg--transparent"
              />

              <div className="d-flex align-items-center gap-3 flex-shrink-0">
                  <Button
                      type="button"
                      className="bg--transparent text-warning fs-20 lh-1"
                  >
                      <BsEmojiSmileFill />
                  </Button>

                  <Button
                      className="icon-btn primary-solid btn-sm  circle fs-18"
                      type="submit"
                  >
                      <LuSendHorizontal />
                  </Button>
              </div>
          </form>
      </div>
  );
};

export default ChatComposer;
