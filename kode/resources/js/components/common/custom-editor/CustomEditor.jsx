import { useEffect, useState } from "react";
import { Button, Dropdown, OverlayTrigger } from "react-bootstrap";

import "./text-editor.scss";

const CustomEditor = ({ onContentChange }) => {
    const [html, setHtml] = useState("");
    const editorRef = useRef(null);
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (editorRef.current && isInitialRender.current) {
            editorRef.current.focus();
            isInitialRender.current = false;
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, []);

    useEffect(() => {
        if (
            editorRef.current &&
            !isInitialRender.current &&
            html !== editorRef.current.innerHTML
        ) {
            if (html === "" && editorRef.current.innerHTML === "") {
                editorRef.current.innerHTML = html;
            }
        }
    }, [html]);

    useEffect(() => {
        if (onContentChange) {
            onContentChange(html);
        }
    }, [html, onContentChange]);

    const execCommand = (command, value = "") => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
            if (range && selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        if (editorRef.current) {
            setHtml(editorRef.current.innerHTML);
        }
    };

    const formatBlock = (block) => {
        execCommand("formatBlock", block);
    };

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "b") {
            e.preventDefault();
            execCommand("bold");
        } else if ((e.ctrlKey || e.metaKey) && e.key === "i") {
            e.preventDefault();
            execCommand("italic");
        } else if ((e.ctrlKey || e.metaKey) && e.key === "u") {
            e.preventDefault();
            execCommand("underline");
        }
    };

    const handleInput = (e) => {
        setHtml(e.currentTarget.innerHTML);
    };

    const createLink = () => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const url = prompt("Enter URL:", "https://");
        if (url) {
            execCommand("createLink", url);
        }
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const renderTooltip = (text) => (
        <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>
    );

    return (
        <div className="container mt-4">
            <div className="text-editor-container">
                <div className="toolbar">
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Undo")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("undo")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 7v6h6" />
                                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Redo")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("redo")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 7v6h-6" />
                                <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <div className="separator" />
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Headings")}
                    >
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                id="dropdown-headings"
                            >
                                Headings
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => formatBlock("h1")}
                                >
                                    Heading 1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => formatBlock("h2")}
                                >
                                    Heading 2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => formatBlock("h3")}
                                >
                                    Heading 3
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => formatBlock("h4")}
                                >
                                    Heading 4
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => formatBlock("h5")}
                                >
                                    Heading 5
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => formatBlock("h6")}
                                >
                                    Heading 6
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </OverlayTrigger>
                    <div className="separator" />
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Bold")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("bold")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6" />
                                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Italic")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("italic")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="19" x2="10" y1="4" y2="4" />
                                <line x1="14" x2="5" y1="20" y2="20" />
                                <line x1="15" x2="9" y1="4" y2="20" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Underline")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("underline")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                                <line x1="4" x2="20" y1="20" y2="20" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Ordered List")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("insertOrderedList")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="10" x2="21" y1="6" y2="6" />
                                <line x1="10" x2="21" y1="12" y2="12" />
                                <line x1="10" x2="21" y1="18" y2="18" />
                                <path d="M4 6h1v4" />
                                <path d="M4 10h2" />
                                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Bullet List")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("insertUnorderedList")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="8" x2="21" y1="6" y2="6" />
                                <line x1="8" x2="21" y1="12" y2="12" />
                                <line x1="8" x2="21" y1="18" y2="18" />
                                <line x1="3" x2="3.01" y1="6" y2="6" />
                                <line x1="3" x2="3.01" y1="12" y2="12" />
                                <line x1="3" x2="3.01" y1="18" y2="18" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <div className="separator" />
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Align Left")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("justifyLeft")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="21" x2="3" y1="6" y2="6" />
                                <line x1="15" x2="3" y1="12" y2="12" />
                                <line x1="17" x2="3" y1="18" y2="18" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Align Center")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("justifyCenter")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="21" x2="3" y1="6" y2="6" />
                                <line x1="17" x2="7" y1="12" y2="12" />
                                <line x1="19" x2="5" y1="18" y2="18" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Align Right")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => execCommand("justifyRight")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="21" x2="3" y1="6" y2="6" />
                                <line x1="21" x2="9" y1="12" y2="12" />
                                <line x1="21" x2="7" y1="18" y2="18" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                    <div className="separator" />
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip("Insert Link")}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={createLink}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                        </Button>
                    </OverlayTrigger>
                </div>
                <div
                    ref={editorRef}
                    className="editor"
                    contentEditable={true}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    data-placeholder="Start typing here..."
                />
                <div className="footer">
                    <span>Custom Text Editor</span>
                    <span>{html.length} characters</span>
                </div>
            </div>
            <div
                className="preview"
                dangerouslySetInnerHTML={{ __html: html || "" }}
            />
        </div>
    );
};


export default CustomEditor;