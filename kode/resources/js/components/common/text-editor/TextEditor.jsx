import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef } from "react";
import "./text-editor.scss";
import ToolButtonBlockquote from "./toolButtons/ToolButtonBlockquote";
import ToolButtonBold from "./toolButtons/ToolButtonBold";
import ToolButtonBulletList from "./toolButtons/ToolButtonBulletList";
import ToolButtonCode from "./toolButtons/ToolButtonCode";
import ToolButtonCodeBlock from "./toolButtons/ToolButtonCodeBlock";
import ToolButtonHeading from "./toolButtons/ToolButtonHeading";
import ToolButtonHorizontalRule from "./toolButtons/ToolButtonHorizontalRule";
import ToolButtonItalic from "./toolButtons/ToolButtonItalic";
import ToolButtonOrderedList from "./toolButtons/ToolButtonOrderedList";
import ToolButtonParagraph from "./toolButtons/ToolButtonParagraph";
import ToolButtonRedo from "./toolButtons/ToolButtonRedo";
import ToolButtonStrike from "./toolButtons/ToolButtonStrike";
import ToolButtonUndo from "./toolButtons/ToolButtonUndo";

const TextEditor = forwardRef((props, ref) => {
    const {
        content = "",
        customToolBar,
        invalid,
        onChange,
        editorContentClass,
        customEditor,
        ...rest
    } = props;

    const editor =
        customEditor ||
        useEditor({
            extensions: [
                StarterKit.configure({
                    bulletList: { keepMarks: true },
                    orderedList: { keepMarks: true },
                }),
            ],
            editorProps: {
                attributes: {
                    class: "editor-content",
                },
            },
            content,
            onUpdate({ editor }) {
                onChange?.({
                    text: editor.getText(),
                    html: editor.getHTML(),
                    json: editor.getJSON(),
                });
            },
        });

    if (!editor) return null;

    const containerClass = [
        "rich-text-editor",
        editor.isFocused && "focused",
        invalid && "invalid",
        editor.isFocused && invalid && "focused-invalid",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={containerClass}>
            <div className="toolbar">
                {customToolBar ? (
                    customToolBar(editor, {
                        ToolButtonBold,
                        ToolButtonItalic,
                        ToolButtonStrike,
                        ToolButtonCode,
                        ToolButtonBlockquote,
                        ToolButtonHeading,
                        ToolButtonBulletList,
                        ToolButtonOrderedList,
                        ToolButtonCodeBlock,
                        ToolButtonHorizontalRule,
                        ToolButtonParagraph,
                        ToolButtonUndo,
                        ToolButtonRedo,
                    })
                ) : (
                    <>
                        <ToolButtonBold editor={editor} />
                        <ToolButtonItalic editor={editor} />
                        <ToolButtonStrike editor={editor} />
                        <ToolButtonCode editor={editor} />
                        <ToolButtonBlockquote editor={editor} />
                        <ToolButtonHeading editor={editor} />
                        <ToolButtonBulletList editor={editor} />
                        <ToolButtonOrderedList editor={editor} />
                        <ToolButtonCodeBlock editor={editor} />
                        <ToolButtonHorizontalRule editor={editor} />
                    </>
                )}
            </div>

            <EditorContent
                ref={ref}
                className={`editor-scrollable ${editorContentClass || ""}`}
                editor={editor}
                {...rest}
            />
        </div>
    );
});

TextEditor.displayName = "TextEditor";
export default TextEditor;
