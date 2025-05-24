import Editor from "@/components/novel-editor";
import React from "react";
import EditInfo from "./edit-info-blog";

const page = () => {
  return (
    <div>
      <div className="min-w-full border-8 ">
        <EditInfo />
      </div>
      <Editor />
    </div>
  );
};

export default page;
