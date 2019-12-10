import React from 'react';
import Navbar from '../../components/navbar';
import Loader from '../../components/loader';

import axios from 'axios';
import { uploadContent } from '../../components/ipfs/ipfs';
import { getAccountAddress, createIdentity } from '../../components/ethereum/ethereum';
import { encrypt } from '../../components/crypto';
import centralDatabaseAPI from '../../shared/centralDatabase';
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";

const privateKey = '123';

export default class ApprovedTranscript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            request: {
                "userAdress": "",
                "identityProviderAdress": "",
                "date": "",
                "payload": {
                    "institution": "", "requestType": "", "description": {}
                },
                "id": ""
            },
            loading: false,
            fileContent: '',
            ipfsHash: '',
            txHash: '',
            encryptedFile: '',
            id: '',
            status: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ id: params.id });

        let accountAddress = await getAccountAddress();
        console.log(accountAddress);
        this.setState({ accountAddress: accountAddress });
        axios.get(`${centralDatabaseAPI}/Requests/${params.id}`)
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

        try {
            this.setState({ status: "Saving identity on IPFS" });
            const ipfsHash = await uploadContent(JSON.stringify({ encryptedContent: encrypted }));
            console.log(ipfsHash);
            this.setState({ ipfsHash: ipfsHash, status: "Saving identity on Ethereum" });

            let ide = await createIdentity(this.state.accountAddress, ipfsHash, this.state.request.identityProviderAdress);
            console.log(ide);
            this.setState({ txHash: ide });

            this.setState({status: "Deleting request from database"});
            axios.delete(`${centralDatabaseAPI}/Requests/${this.state.id}`)
                .then(response => {
                    console.log("Raspuns de la server");
                    console.log(response.data);
                });
        } catch (error) {
            this.setState({ status: 'Error while saving: ' + error });
        }
        this.setState({ loading: false, status: "Identity successfully saved" });
    }

    render() {
        let { institution, requestType, description } = this.state.request.payload;

        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                    <Request institution={institution} requestType={requestType} />
                    <Response payload={description} />
                    <div><button type="button" className="button button2" onClick={this.onSubmit}>Accept response and save</button></div>
                    {this.state.loading ? <Loader /> : null}
                    {this.state.ipfsHash == '' ? null :
                        <div>
                            <div><h4>IPFS Hash:</h4> {this.state.ipfsHash}</div>
                            <div><h4>TX Hash:</h4> {this.state.txHash}</div>
                        </div>
                    }
                    <div className="error">{this.state.status}</div>
                </main>
            </React.Fragment >
        )
    }
}