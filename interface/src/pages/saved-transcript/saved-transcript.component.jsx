import React from 'react';
import Navbar from '../../components/navbar';

import { getContent } from '../../components/ipfs/ipfs';
import { getAccountAddress, getIdentity, deleteIdentity } from '../../components/ethereum/ethereum';
import { decrypt } from '../../components/crypto';
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";

const privateKey = '123';

export default class ApprovedTranscript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            request: {
                "userAdress": "0xa3F5c4B09289f482A362e031B6ACA4b662B23b6b",
                "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                "date": "2019-12-04T00:27:18.140Z",
                "payload": {
                    "id": 1, "institution": "", "requestType": "", "description": {
                        
                    }
                }
            },
            id: '',
            txHash: '',
            status: ''
        }

        this.onDelete = this.onDelete.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ id: params.id });

        let accountAddress = await getAccountAddress();
        this.setState({ accountAddress: accountAddress });
        let identity = await getIdentity(accountAddress, params.id);

        const encryptedRequest = JSON.parse(await getContent(identity.ipfsHash));
        console.log(encryptedRequest);
        const request = decrypt(encryptedRequest.encryptedContent, privateKey);
        console.log(request);
        this.setState({ request });
    }

    onDelete() {
        deleteIdentity(this.state.accountAddress, this.state.id)
            .then(txHash => this.setState({ loading: false, txHash }))
            .catch(err => this.setState({ loading: false, status: err }));
    }

    render() {
        let { institution, requestType, description } = this.state.request.payload;

        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                    <Request institution={institution} requestType={requestType} />
                    <Response payload={description} />
                    <div><button type="button" className="button button2" onClick={this.onDelete}>Delete</button></div>
                    {this.state.txHash == '' ? null :
                        <div><h4>TX Hash:</h4> {this.state.txHash}</div>
                        // https://ropsten.etherscan.io/tx/0xc49a20b9bd882df95e8bd524a0b085f45d16c5d57bd31c077155ae117a7e53e9
                    }
                    <div className="error">{this.state.status}</div>
                </main>
            </React.Fragment >
        )
    }
}