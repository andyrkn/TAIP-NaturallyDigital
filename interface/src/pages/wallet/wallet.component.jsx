import React from 'react';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders, createIdentityProvider } from '../../components/ethereum/ethereum';
import { uploadContent, getContent } from '../../components/ipfs/ipfs';
import { encrypt, decrypt } from '../../components/crypto';

import Navbar from '../../components/navbar';
import './wallet.styles.scss';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

export default class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            transcripts: [],
        }
    }

    async componentDidMount() {
        let accountAddress = await getAccountAddress();
        this.setState({ accountAddress: accountAddress });
        // let ipc = await createIdentityProvider(accountAddress, "0x9eE22087c9C06922145c3F7D6aEBd8e486f3A18e", "ipfsHash");
        // console.log(ipc);
        let ips = await getAllIdentityProviders();
        console.log(ips);
        // let ide = await createIdentity(accountAddress, "hash", "0x9eE22087c9C06922145c3F7D6aEBd8e486f3A18e");
        // console.log(ide);
        let result = await getAllIdentities(this.state.accountAddress);
        console.log("User identities");
        console.log(result);
        this.setState({ identities: result });
        // console.log("Preparing to make the API GET call for the wallet content...");
        // axios.get(`http://localhost:3000/wallet`).then(response => this.setState({transcripts: response.data}));
        // console.log("API GET call sucessfull! Wallet information rceived!");
        const encrypted = encrypt({name: 'naturally digital e pe ipfs'},'restanta');
        console.log(encrypted);
        const ipfsHash = await uploadContent(JSON.stringify({encryptedContent: encrypted}));
        console.log(ipfsHash);
        const file = JSON.parse(await getContent(ipfsHash));
        console.log(file);
        console.log(file.encryptedContent);
        const res = decrypt(file.encryptedContent, 'restanta');
        console.log(res);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="transcripts">
                    <div className="title-text">The following are all the transcripts you have linked here:</div>
                    {this.state.transcripts && this.state.transcripts.map((elem) => (
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Transcript
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {elem.transcriptContent[0].fullName}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {elem.transcriptContent.map((el) => {
                                        return <span key={el} className="individual-transcript">
                                            {
                                                el.content.map((e) => {
                                                    return <span className="transcript-info-block">
                                                        <span><b>Category:</b> {el.transcript === "istoric-amenzi" ? "Istoricul amenzilor" : "Plata amenzi"}</span>
                                                        <span><b>Date emitted:</b> {e.date}</span>
                                                        <span><b>Amount needed to pay:</b> {e.amount}</span>
                                                        <span><b>Reason for the ticket:</b> {e.reason}</span>
                                                        <span>
                                                            <b>{el.transcript === "istoric-amenzi" ? "Officer on the job:" : "Paid ticket status:"}</b>
                                                            {el.transcript === "istoric-amenzi" ? e.officer : e.paid}
                                                        </span>
                                                    </span>
                                                })
                                            }
                                        </span>
                                    })}
            
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}