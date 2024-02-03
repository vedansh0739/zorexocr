import "./style1.css"
import FileUpload from "./FileUpload1";
import { Font } from "pspdfkit";
const GreetingModal = ({ isOpen, onClose,onFilesSelected}) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <h2>Welcome to Zorex!</h2>
          <br></br>
          <p style={{fontSize: '14px', margin: '20px', padding: '10px'}}>Please upload the documents you want to rummage through</p>
          <br></br>

          <FileUpload onFilesSelected= { onFilesSelected } onClose={onClose}/>
          <br></br>

        </div>
      </div>
    );
  };
export default GreetingModal  