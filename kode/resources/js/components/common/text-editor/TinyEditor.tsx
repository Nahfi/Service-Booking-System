
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const TinyEditor = ({
    onHandleChange,
    defaultValue = "",
    guest_config = null,
}) => {
    const editorRef = useRef(null);

    const handleEditorChange = (content, editor) => {
        onHandleChange?.(content);
    };
    return (
        <div className="tiny-editor">
            <Editor
                apiKey={
                    guest_config && guest_config.tinymce_api_key
                        ? guest_config.tinymce_api_key
                        : "ujmnreu71qu06cb4jhsj6g3rrvck5g1iie0bd8upkfwgc1y4"
                }
                value={defaultValue}
                onEditorChange={handleEditorChange}
                init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                        "anchor",
                        "autolink",
                        "charmap",
                        "codesample",
                        "emoticons",
                        "image",
                        "link",
                        "lists",
                        "media",
                        "searchreplace",
                        "table",
                        "visualblocks",
                        "wordcount",

                        // 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf,code'
                    ],
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code",
                    
                    content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
        </div>
    );
};

export default TinyEditor;
