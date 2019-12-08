import React from 'react';
import Navbar from '../../components/navbar';
import "./transcript.styles.css";
import axios from 'axios';
import { uploadContent } from '../../components/ipfs/ipfs';

const privateKey = '123';

export default class ApprovedTranscript extends React.Component {
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
            encryptedFile: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;

        let accountAddress = await getAccountAddress();
        this.setState({ accountAddress: accountAddress });
        axios.get(`${centralDatabaseAPI}/ApprovedRequests/users?userAdress=${this.state.accountAddress}&id=${params.id}`)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: response });
            });
    }

    async onSubmit() {
        this.setState({ loading: true });
        const encrypted = encrypt(this.state.request, privateKey);
        this.setState({ encryptedFile: encrypted });
        console.log(encrypted);

        const ipfsHash = await uploadContent(JSON.stringify({ encryptedContent: encrypted }));
        console.log(ipfsHash);
        this.setState({ ipfsHash: ipfsHash });

        let ide = await createIdentity(this.state.accountAddress, ipfsHash, this.state.request.identityProviderAdress);
        console.log(ide);
        this.setState({ txHash: ide, loading: false });

        axios.delete(`${centralDatabaseAPI}/ApprovedRequests/users?userAdress=${this.state.accountAddress}&id=${params.id}`)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
            });
    }

    populatFields(payload) {
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

    render() {
        let { institution, requestType, description } = this.state.request.payload;
        let fields = this.populatFields(description);

        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                    <h2>Request</h2>
                    <div><span>Institution</span><span>{institution}</span></div>
                    <div><span>Request type</span><span>{requestType}</span></div>
                    <div>Description</div>
                    {fields}
                    <div><button type="button" className="button button2" onClick={this.onSubmit}>Upload</button></div>
                    {this.state.loading ? <Loader /> : null}
                    <div>IPFS Hash: {this.state.ipfsHash}</div>
                    <div>TX Hash: {this.state.txHash}</div>
                </main>
            </React.Fragment >
        )
    }
}