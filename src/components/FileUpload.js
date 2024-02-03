import React, { useState } from "react";
import { useRecoilState } from 'recoil';
import { pdfUrlsState, selectedNamesState } from './atoms';
const FileUpload = ({ onFilesSelected }) => {

    const [selectedNames, setSelectedNames] = useRecoilState(selectedNamesState);

  const handleFileChange = (event) => {
    const files1 = Array.from(event.target.files).map(file => file.name);
    setSelectedNames(files1);
    const files = event.target.files;
    const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
    onFilesSelected(fileUrls);
  };

  const fileInputRef = React.useRef();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <svg
        onClick={handleIconClick}
        style={{ cursor: "pointer" }}
        width="24px" // Adjust the size as needed
        height="24px" // Adjust the size as needed
        viewBox="0 -3.34 50 49.68" // Your SVG's viewBox
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={`M36.025,19.506L20.202,35.329
            c-7.823,7.823-18.078-1.494-9.786-9.785c2.753-2.753,20.716-20.716,20.716-20.716
            c10.16-10.16,23.429,3.482,13.456,13.455c-3.363,3.364-20.716,20.715-20.716,20.715
            C10.519,52.351-6.795,35.974,7.025,22.154L22.849,6.331`}
        />
      </svg>
    </div>
  );
};

export default FileUpload;
