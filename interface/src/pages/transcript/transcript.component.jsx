import React from 'react';
import Navbar from '../../components/navbar';
import Loader from '../../components/loader';

import "./transcript.styles.css";


export default class Transcript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            transcript: {
                "id": 1,
                "fullName": "Politia Rutiera Iasi",
                "transcript": "istoric-amenzi",
                "content":
                {
                    "date": "10.09.2019",
                    "amount": "$300",
                    "reason": "Speeding",
                    "officer": "Capraru Daniel"
                },

            },
            selectedFile: '',
            filename: 'Choose file',
            loading: false,
            fileRegex: new RegExp('[^.]+(.png|.jpeg|.gif|.tiff|.bmp|.jpg)'),
            fileError: '',
            fileContent: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    readFile = (file, onSuccessCallback, onFailCallback) => {
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function () {
            onSuccessCallback(reader.result);
        };
        reader.onerror = function (error) {
            onFailCallback(error.message);
        };
    }

    onRead = (file) => {
        console.log(file);
        const jsonFile = JSON.parse(file);
        console.log(jsonFile);
        this.setState({ fileContent: jsonFile });
    };

    onChange = (event) => {
        const file = event.target.files[0];
        this.setState({ selectedFile: file.name })
        this.readFile(file, this.onRead);
    }

    onSubmit() {
        this.setState({ loading: true });
        // put la db
    }

    populatFields() {
        let fields = [];
        for (let [key, value] of Object.entries(this.state.fileContent)) {
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

    render() {
        let fields = this.populatFields();

        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                    <h2>Request</h2>
                    {fields}
                    {/* <label htmlFor="fileInput">Choose a profile picture:</label> */}
                    <input type="file" id="fileInput" name="fileInput" onChange={this.onChange} />
                    <div><button type="button" className="button button2" onClick={this.onSubmit}>Upload</button></div>
                    {this.state.loading ? <Loader /> : null}
                </main>
            </React.Fragment >
        )
    }
}