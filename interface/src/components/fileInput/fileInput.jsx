import React from "react";
import './fileInput.css';

const noop = () => { };

const FileInput = ({ onChange = noop, file }) => (
    <div className="fileInputContainer">
        <input id="hiddenInput" type="file" onChange={onChange} />
        <label id="input" htmlFor="hiddenInput">Choose file</label>
    </div>
);

export default FileInput;