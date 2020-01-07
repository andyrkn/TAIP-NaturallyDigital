import React from "react";
import "./request.styles.css";

const Request = ({ institution, requestType, title }) => (
    <React.Fragment>
        <h2>{title || 'Request'}</h2>
        <div><span className="key">Institution: </span><span className="institution">{institution}</span></div>
        <div><span className="key">Request type: </span><span className="type">{requestType}</span></div>
    </React.Fragment>
);

export default Request;