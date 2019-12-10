import React from "react";
import './fileInput.css';

const FileInput = ({ onRead }) => {

    const onChange = (event) => {
        const file = event.target.files[0];
        readFile(file, onRead);
    }
    
    const readFile = (file, onSuccessCallback, onFailCallback) => {
        let reader = new FileReader();
        reader.readAsText(file);
    
        reader.onloadend = function () {
            onSuccessCallback(reader.result);
        };
        reader.onerror = function (error) {
            onFailCallback(error.message);
        };
    }

    return (
    <input type="file" id="fileInput" name="fileInput" className="custom-file-input" onChange={onChange} />
);}

export default FileInput;