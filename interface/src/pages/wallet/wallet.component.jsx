import React from 'react';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders } from '../../components/ethereum/ethereum';
import { uploadContent, getContent } from '../../components/ipfs/ipfs';

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
            identities: [],
            value: '',
            txHash: '',
            transcripts: [],
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        let accountAddress = await getAccountAddress();
        // await createIdentity(accountAddress, "hash#123", "0x91ba5ac30060b1b33b953186B04D4F540B717D9c");
        this.setState({ accountAddress: accountAddress });
        let result = await getAllIdentities(this.state.accountAddress);
        console.log("User identities");
        console.log(result);
        this.setState({ identities: result });
    //     let ip = await getAllIdentityProviders();
    //     console.log(ip);
    // }

    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }

    // async handleSubmit(event) {
    //     let tx;
    //     try { tx = await createIdentity(this.state.accountAddress, this.state.value, "0x91ba5ac30060b1b33b953186B04D4F540B717D9c"); }
    //     catch (err) {
    //         console.log(err);
    //     }
    //     this.setState({ txHash: tx });
    //     let result = await getAllIdentities(this.state.accountAddress);
    //     this.setState({ identities: result });
    //     event.preventDefault();
    // }

    // renderIdentities = () => {
    //     const ids = [];
    //     for (const [index, value] of this.state.identities.entries()) {
    //         ids.push(<li>{value.ipfsHash} {value.identityProvider}</li>);
    //     }
    //     return ids;
    // }

    // render() {
    //     let ids = this.renderIdentities();
    //     return <div>
    //         <h2>Contul este: {this.state.accountAddress}</h2>
    //         <h2>Identitati create</h2>
    //         <ul>
    //             {ids}
    //         </ul>

    //         <label>
    //             IPFS hash:
    //       <input type="text" value={this.state.value} onChange={this.handleChange} />
    //         </label>
    //         <button type="submit" onClick={this.handleSubmit} >Add</button>
    //         <div>{this.state.txHash}</div>
    //     </div>;

        // let accountAddress = await getAccountAddress();
        // // let result = await createIdentity("122345", "0x91ba5ac30060b1b33b953186B04D4F540B717D9c");
        // this.setState({ accountAddress: accountAddress });
        // let result = await getAllIdentities(this.state.accountAddress);
        // console.log(result);
        // this.setState({ identities: result });
        // let ip = await getAllIdentityProviders();
        // console.log(ip);
        console.log("Preparing to make the API GET call for the wallet content...");
        axios.get(`http://localhost:3000/wallet`).then(response => this.setState({transcripts: response.data}));
        console.log("API GET call sucessfull! Wallet information rceived!");
        const ipfsHash = await uploadContent(JSON.stringify({title: 'naturally digital e pe ipfs'}));
        console.log(ipfsHash);
        const file = await getContent(ipfsHash);
        console.log(file);
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