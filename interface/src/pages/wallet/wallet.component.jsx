import React from 'react';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders, createIdentityProvider } from '../../components/ethereum/ethereum';
import { uploadContent, getContent } from '../../components/ipfs/ipfs';
import { encrypt, decrypt } from '../../components/crypto';

import Navbar from '../../components/navbar';
import './wallet.styles.scss';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Request from "../../components/request/request.component";

const privateKey = '123';

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
        this.setState({transcripts: result});
        console.log(this.state.transcripts);

    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="transcripts">
                {this.state.transcripts.length == 0 ? null : this.state.transcripts.map(request =>
                    <div className="request-card">
                        <div className="card-container">
                            <Link to={`/saved-transcript/${request.id}`} key={request.id} style={{ textDecoration: 'none', color: 'black' }}>
                                <Request institution={request.payload.institution} requestType={request.payload.requestType} />
                            </Link>
                        </div>
                    </div>)
                }
                </div>
            </React.Fragment>
        )
    }
}