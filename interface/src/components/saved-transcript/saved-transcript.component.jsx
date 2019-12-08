import React from 'react';
import Navbar from '../../components/navbar';
import "./transcript.styles.css";

import { getContent } from '../../components/ipfs/ipfs';
import { getAccountAddress, getIdentity } from '../../components/ethereum/ethereum';

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
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;

        let accountAddress = await getAccountAddress();
        this.setState({ accountAddress: accountAddress });
        let identity = await getIdentity(accountAddress, this.props.id);

        const encryptedRequest = JSON.parse(await getContent(identity.ipfsHash));
        console.log(encryptedRequest);
        const request = decrypt(encryptedRequest.encryptedContent, privateKey);
        console.log(request);
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
                </main>
            </React.Fragment >
        )
    }
}