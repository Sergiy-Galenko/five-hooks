import React, { useState } from "react";
import FileTable from "./FileTable";

const FileManager = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelectionChange = (selectedRowKeys, selectedRows) => {
    setSelectedFiles(selectedRows);
  };

  const handleDelete = () => {
    console.log("Deleting files: ", selectedFiles);
    setSelectedFiles([]);
  };

  return (
    <div>
      <FileTable onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default FileManager;
