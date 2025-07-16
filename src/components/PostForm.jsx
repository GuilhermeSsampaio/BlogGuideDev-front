import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";

export default function PostForm() {
  return (
    <div className="border">
      <Editor />
    </div>
  );
}
