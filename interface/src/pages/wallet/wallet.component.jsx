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
            transcripts: [
                    // {
                    //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                    //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                    //     "date": "2019-12-04T00:27:18.140Z",
                    //     "payload": {
                    //         "id": 1, "institution": "Politia Rutiera Iasi", "requestType": "istoric", "description": {
                    //             "date": "10.09.2019",
                    //             "amount": "$1300",
                    //             "reason": "Speeding",
                    //             "officer": "Pomohaci Alex"
                    //         }
                    //     }
                    // },
                    // {
                    //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                    //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                    //     "date": "2019-12-04T00:27:18.140Z",
                    //     "payload": {
                    //         "id": 1, "institution": "SPCLEP Iasi", "requestType": "identity_card", "description": {
                    //             "date": "10.09.2019",
                    //             "name": "Pomohaci Alex",
                    //             "address": "Anastasie Panu nr. 33",
                    //             "city": "Miroslava",
                    //             "region": "Iasi", 
                    //             "CNP": "1972196333663",
                    //             "series": "XT",
                    //             "number": "333444"
                    //         }
                    //     }
                    // },
                    // {
                    //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                    //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                    //     "date": "2019-12-04T00:27:18.140Z",
                    //     "payload": {
                    //         "id": 1, "institution": "Omniasig Iasi", "requestType": "istoric", "description": {
                    //             "date": "10.09.2019",
                    //             "name": "Pomohaci Alex",
                    //             "type": "Life Insurance",
                    //             "value": "$250000",
                    //             "region": "Iasi", 
                    //         }
                    //     }
                    // },

                    // {
                    //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                    //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                    //     "date": "2019-12-04T00:27:18.140Z",
                    //     "payload": {
                    //         "id": 1, "institution": "Omniasig Iasi", "requestType": "plata", "description": {
                    //             "date": "10.09.2019",
                    //             "name": "Pomohaci Alex",
                    //             "monthly_payment": "$50",
                    //             "amount_payed": "$50000",
                    //             "amount_left": "$200000", 
                    //             "date_of_last_payment": "06.09.2019",
                    //         }
                    //     }
                    // },
                    // {
                    //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                    //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                    //     "date": "2019-12-04T00:27:18.140Z",
                    //     "payload": {
                    //         "id": 1, "institution": "Spitalul Clinic Parhon, Iasi", "requestType": "istoric", "description": {
                    //             "date": "10.09.2019",
                    //             "name": "Pomohaci Alex",
                    //             "cause": "Blood Analysis",
                    //             "gravity": "4",
                    //         }
                    //     }
                    // },
            ],
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