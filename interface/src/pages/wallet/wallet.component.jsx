import React from 'react';
import { Link } from 'react-router-dom';
import { decrypt } from '../../components/crypto';
import { getAccountAddress, getAllIdentities } from '../../components/ethereum/ethereum';
import { getContent } from '../../components/ipfs/ipfs';
import Navbar from '../../components/navbar';
import Request from "../../components/request/request.component";
import './wallet.styles.scss';

let privateKey = '123';

export default class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            transcripts: [
            ],
        }
    }

    async componentDidMount() {
        privateKey = sessionStorage.getItem("privateKey");
        if (privateKey !== null && privateKey !== "") {
            let accountAddress = await getAccountAddress();
            this.setState({ accountAddress: accountAddress });
            let result = await getAllIdentities(this.state.accountAddress);
            console.log("User identities");
            console.log(result);
            this.setState({ identities: result });
            for (let i = 0; i < result.length; i++) {
                const encryptedRequest = JSON.parse(await getContent(result[i].ipfsHash));
                console.log(encryptedRequest);
                const request = decrypt(encryptedRequest.encryptedContent, privateKey);
                result[i] = request;
                result[i].id = i;
            }
            this.setState({ transcripts: result });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="transcripts">
                    {this.state.transcripts.length === 0 ? <div>0 identities or no permission to view</div> : this.state.transcripts.map(request =>
                        <div className="request-card" key={request.id}>
                            <div className="card-container">
                                <Link to={`/saved-transcript/${request.id}`} key={request.id} style={{ textDecoration: 'none', color: 'black' }}>
                                    <Request institution={request.payload.institution} requestType={request.payload.requestType} title="Identity" />
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
            </React.Fragment>
        )
    }
}