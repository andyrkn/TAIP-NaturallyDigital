import React from "react";
import "./request.styles.css";

const Request = ({ institution, requestType }) => (
    <React.Fragment>
        <h2>Request</h2>
        <div><span className="key">Institution: </span><span>{institution}</span></div>
        <div><span className="key">Request type: </span><span>{requestType}</span></div>
    </React.Fragment>
);

export default Request;