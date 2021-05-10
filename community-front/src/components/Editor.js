import React, {useState, Component} from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const DraftEditor = () => {
  const editorRef = React.createRef();
  const [content, setContent] = useState("");

  const handleClick = () => {
    setContent({
      content: editorRef.current.getInstance().getHtml(),
    });
  };
  return (
    <>
      <Editor
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        placeholder="글쓰기"
        ref={editorRef}
      />
      <button onClick={handleClick}>저장</button>
    </>
  );
};
export default DraftEditor;