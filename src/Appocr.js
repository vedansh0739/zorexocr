import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import ButtonList from "./components/ButtonList"; // Adjust the import path as necessary
import ChatInterface from "./components/ChatInterface";
import PdfViewerComponent from "./components/PdfViewerComponent";
import "./App.css";
import GreetingModal from "./components/GreetingModal"; 
import "./components/style1.css"
  import posthog from 'posthog-js'
  import { RecoilRoot, useSetRecoilState } from 'recoil';
  import { ocrAtom } from './components/atoms';

function Appocr() {
  const handleCloseGreeting = () => {
    setShowGreeting(false); // Function to close the greeting modal
  };
  const [showGreeting, setShowGreeting] = useState(true);
  const setOcrState = useSetRecoilState(ocrAtom);

  useEffect(() => {
    // Set the ocrAtom to true when the component mounts
    setOcrState(true);
  }, []);

  const [selectedNames, setSelectedNames] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [currentPdf, setCurrentPdf] = useState(null);

  posthog.init('phc_tMD75aa2PGdTWMDknYoxhYVk8pbOfkzmVwja1dOAr8M', { api_host: 'https://us.posthog.com' })
  posthog.capture('my event', { property: 'value' })

  
  return (

    <div className="App">
       <GreetingModal isOpen={showGreeting} onClose={handleCloseGreeting} onFilesSelected={setPdfUrls}/>


      <div className="a1" style={{ display: "flex", height: "100vh" }}>
        <div className='box' style={{ float: "left", width: "10%", height: "100vh" }}>
          <div className="App-viewer">
            <ButtonList fileUrls={pdfUrls} onFileSelected={setCurrentPdf}/>
          </div>
        </div>

        <div class ame="a3" style={{ width: "50%" }}>
          <PdfViewerComponent document={currentPdf} />
        </div>

        <div className="a1" style={{ width: "40%", height: "100vh" }}>
          <ChatInterface  onFilesSelected={setPdfUrls}/>
        </div>
      </div>
    </div>

  );
}

export default Appocr;
