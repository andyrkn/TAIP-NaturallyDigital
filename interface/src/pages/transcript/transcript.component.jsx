import React from 'react';
import Navbar from '../../components/navbar';
import Loader from '../../components/loader';

import "./transcript.styles.css";
import axios from 'axios';
import { uploadContent, getContent } from '../../components/ipfs/ipfs';
import { encrypt, decrypt } from '../../components/crypto';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders, createIdentityProvider } from '../../components/ethereum/ethereum';

const privateKey = '123';

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
            request: '',
            selectedFile: '',
            filename: 'Choose file',
            loading: false,
            fileRegex: new RegExp('[^.]+(.png|.jpeg|.gif|.tiff|.bmp|.jpg)'),
            fileError: '',
            fileContent: '',
            ipfsHash: '',
            identityProvider: "0x9eE22087c9C06922145c3F7D6aEBd8e486f3A18e",
            txHash: '',
            requests: [],
            encryptedFile: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;

        let accountAddress = await getAccountAddress();
        this.setState({ accountAddress: accountAddress });
        axios.get(`http://109.100.27.188:5000/api/Requests/users?userAdress=${this.state.accountAddress}`)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ identityProvider: response.data[1].identityProviderAdress, request: response.data[1].payload });
            });
        let requests = await getAllIdentities(accountAddress);
        this.setState({ requests: requests });
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
        const jsonFile = JSON.parse(file);
        console.log(jsonFile);
        this.setState({ fileContent: jsonFile });
    };

    onChange = (event) => {
        const file = event.target.files[0];
        this.setState({ selectedFile: file.name })
        this.readFile(file, this.onRead);
    }

    async onSubmit() {
        this.setState({ loading: true });
        // put la db
        const encrypted = encrypt({ name: this.state.fileContent }, privateKey);
        console.log(encrypted);
        const ipfsHash = await uploadContent(JSON.stringify({ encryptedContent: encrypted }));
        console.log(ipfsHash);
        this.setState({ ipfsHash: ipfsHash });
        const file = JSON.parse(await getContent(ipfsHash));
        console.log(file);
        this.setState({ encryptedFile: JSON.stringify(file) });
        const res = decrypt(file.encryptedContent, privateKey);
        console.log(res);
        let ide = await createIdentity(this.state.accountAddress, ipfsHash, this.state.identityProvider);
        console.log(ide);
        let requests = await getAllIdentities(this.state.accountAddress);
        this.setState({ txHash: ide, loading: false, requests: requests });
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
                    {this.state.request}
                    {/* <label htmlFor="fileInput">Choose a profile picture:</label> */}
                    <div>Please choose response</div>
                    <input type="file" id="fileInput" name="fileInput" onChange={this.onChange} />
                    <h3>Your response</h3>
                    {fields}
                    <div><button type="button" className="button button2" onClick={this.onSubmit}>Upload</button></div>
                    {this.state.loading ? <Loader /> : null}
                    <div>Encrypted file {this.state.encryptedFile}</div>
                    <div>IPFS Hash: {this.state.ipfsHash}</div>
                    <div>TX Hash: {this.state.txHash}</div>
                    <h3>User identities saved in Ethereum</h3>
                    {JSON.stringify(this.state.requests)}
                </main>
            </React.Fragment >
        )
    }
}