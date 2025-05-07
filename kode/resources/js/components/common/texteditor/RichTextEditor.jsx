// RichTextEditor.js
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../texteditor/texteditor.scss";

const RichTextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ bold: true }, { italic: true }, { underline: true }],

      [{ link: true }, { image: true }],
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder="Write your message..."
    />
  );
};

export default RichTextEditor;
