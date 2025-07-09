
import { ThemeContext } from "@/context";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { BsEmojiSmileFill } from "react-icons/bs";
import { LuPaperclip, LuSendHorizontal } from "react-icons/lu";

import EmojiPicker from "emoji-picker-react";
import Button from "../../../../../../components/common/button/Button";
import type { ThemeContextType } from "../../../../../../utils/types";


const ChatComposer = () => {
    const { themeSettings } = useContext(ThemeContext) as ThemeContextType;
    return (
        <div className="chat-body-footer">
            <form
                className="d-flex align-items-center gap-3 w-100"
            >
                <>
                    <div className="d-flex align-items-center gap-3 flex-shrink-0">
                        <Dropdown className="icon-dropdown">
                            <Dropdown.Toggle
                                id="dropdown-5"
                                className="bg--transparent text-muted fs-20 lh-1fs-20 p-0"
                            >
                                <LuPaperclip />
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                align={`${
                                    themeSettings.dir === "ltr" ? "end" : ""
                                }`}
                            >
                                <div className="dropdown-content">
                                    <Dropdown.Item
                                        as={"button"}
                                        type="button"
                                    >
                                        Document
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as={"button"}
                                        type="button"
                                    >
                                        Photo & Video
                                    </Dropdown.Item>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <input
                        type="text"
                        placeholder="Write a message…"
                        className="w-100 border-0 py-1 bg--transparent"
                    />
                </>

                <div className="d-flex align-items-center gap-3 flex-shrink-0">
                    <Dropdown className="icon-dropdown" drop={"up"}>
                        <Dropdown.Toggle
                            id="dropdown-5"
                            className="bg--transparent fs-20 lh-1 p-0"
                        >
                            <BsEmojiSmileFill className="text-warning" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            align={`${
                                themeSettings.dir === "ltr" ? "end" : ""
                            }`}
                            className="py-0"
                        >
                            <EmojiPicker size="25" height={350} />
                        </Dropdown.Menu>
                    </Dropdown>

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
