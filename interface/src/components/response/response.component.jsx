import React from "react";
import "./response.styles.css";

const Response = ({ payload }) => {
    const populatFields = (payload) => {
        let fields = [];
        for (let [key, value] of Object.entries(payload)) {
            if (typeof value === 'object') {
                fields.push(<div className="key">{key}</div>);
                for (let [subkey, subvalue] of Object.entries(value)) {
                    fields.push(<div>{subkey}:  {subvalue}</div>)
                }
            } else {
                fields.push(<div><span className="key">{key}</span><span>:  {value}</span></div>);
            }
        }
        return fields;
    }

    let fields = populatFields(payload);

    return (
        <React.Fragment>
            <h3>Response</h3>
            {fields}
        </React.Fragment>
    );
}

export default Response;