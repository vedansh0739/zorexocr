import React from 'react';
import '../App.css'
import { useRecoilState } from 'recoil';
import { pdfUrlsState, selectedNamesState } from './atoms';
const ButtonList = ({ fileUrls, onFileSelected }) => {
    const [selectedNames, setSelectedNames] = useRecoilState(selectedNamesState);

    return (
        <div >
            <h1>Zorex</h1>
            {fileUrls.map((fileUrl, index) => (
                <button 
                    key={index} 
                    className='a4' 
                    onClick={() => onFileSelected(fileUrl)}
                >
                    {selectedNames[index]} 
                </button>
            ))}
        </div>
    );
};


export default ButtonList;
