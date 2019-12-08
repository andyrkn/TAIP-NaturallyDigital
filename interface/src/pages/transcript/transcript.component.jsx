import React from 'react';
import Navbar from '../../components/navbar';
import Loader from '../../components/loader';

import "./transcript.styles.css";
import axios from 'axios';
import { uploadContent, getContent } from '../../components/ipfs/ipfs';
import { encrypt, decrypt } from '../../components/crypto';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders, createIdentityProvider } from '../../components/ethereum/ethereum';
import centralDatabaseAPI from '../../shared/centralDatabase';

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
            request: {
                "userAdress": "0xa3F5c4B09289f482A362e031B6ACA4b662B23b6b",
                "identityProviderAdress": "0x9eE22087c9C06922145c3F7D6aEBd8e486f3A18e",
                "date": "2019-12-04T00:27:18.140Z",
                "payload": { "id": 1, "fullName": "Politia Rutiera Iasi", "transcript": "istoric-amenzi" }
            },
            selectedFile: '',
            filename: 'Choose file',
            loading: false,
            fileRegex: new RegExp('[^.]+(.png|.jpeg|.gif|.tiff|.bmp|.jpg)'),
            fileError: '',
            fileContent: '',
            ipfsHash: '',
            txHash: '',
            requests: [],
            encryptedFile: '',
            status: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;

        let accountAddress = await getAccountAddress();
        this.setState({ accountAddress: accountAddress });
        axios.get(`${centralDatabaseAPI}/Requests/users?userAdress=${this.state.accountAddress}&id=${params.id}`)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: response });
            });
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

    onReject() {
        this.setState({ loading: true });
        axios.put(`${centralDatabaseAPI}/Requests/users?userAdress=${this.state.accountAddress}&id=${params.id}`, this.state.request)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: response, loading: false, status: 'Successfully rejected' });
            });
    }

    onAccept() {
        this.setState({ loading: true });
        axios.post(`${centralDatabaseAPI}/Requests/users?userAdress=${this.state.accountAddress}&id=${params.id}`, this.state.request)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: response, loading: false, status: 'Successfully accepted' });
            });
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
        let { institution, requestType, description } = this.state.request.payload;
        let fields = this.populatFields();

        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                <h2>Request</h2>
                    <div><span>Institution</span><span>{institution}</span></div>
                    <div><span>Request type</span><span>{requestType}</span></div>
                    <div>Please choose response</div>
                    <input type="file" id="fileInput" name="fileInput" onChange={this.onChange} />
                    <h3>Your response</h3>
                    {fields}
                    <div><button type="button" className="button button2" onClick={this.onSubmit}>Upload</button></div>
                    <div><button type="button" className="button button2" onClick={this.onReject}>Reject</button></div>
                    {this.state.loading ? <Loader /> : null}
                    <div>Encrypteded file de somon {this.state.encryptedFile}</div>
                    <div>IPFS Hashpeste-o de aici: {this.state.ipfsHash}</div>
                    <div>TX Hash: {this.state.txHash}</div>
                    <h3>User iden(titties) saved in Ethereum Blyat</h3>
                    {JSON.stringify(this.state.requests)}
                    {status}
                </main>
            </React.Fragment >
        )
    }
}