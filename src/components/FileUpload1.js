import React, { useRef } from "react";
import { useRecoilState,useRecoilValue } from 'recoil';
import { pdfUrlsState, selectedNamesState,ocrAtom, resultsState, fileNamesState,isLoadingState} from './atoms';

const FileUpload = ({ onFilesSelected , onClose}) => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const [results, setResults] = useRecoilState(resultsState);
    const [fileNames, setFileNames]=useRecoilState(fileNamesState)
    const fileInputRef = React.useRef();
    const [selectedNames, setSelectedNames] = useRecoilState(selectedNamesState);
    const isOcrEnabled = useRecoilValue(ocrAtom); 

    const handleFileChange = async (event) => {

        const files = event.target.files;
        const filenames = Array.from(event.target.files).map(file => file.name);
        setSelectedNames(filenames);

        
        const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
        onFilesSelected(fileUrls);

        onClose();
        setIsLoading(true);


        let postfiles = Array.from(event.target.files);

        const formData = new FormData();
        postfiles.forEach(file => {
            formData.append('files', file);
        });
        const requestUrl = isOcrEnabled ? 'https://127.0.0.1:8000/rag/uploadocr/' : 'https://127.0.0.1:8000/rag/upload/';
        try {

            const response = await fetch(requestUrl, {
                method: 'POST',
                body: formData,
                credentials: 'include' ,
            });
            const data = await response.json();
            console.log('Success:', data);

            if (data.results) {
              setResults(data.results);
              setFileNames(data.filenames);
            }


            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }


            console.log('Files uploaded successfully');
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
          setIsLoading(false); // Stop loading
        }



        
  };

  

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div >
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
