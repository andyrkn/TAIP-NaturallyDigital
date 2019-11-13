import React, { useEffect } from 'react';
import Navbar from '../../components/navbar';
import './wallet.styles.scss';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
    card: {
      width: 220,
      backgroundColor: 'red',
      border: '1px solid black',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function Wallet() {
    const classes = useStyles();
    const [transcripts, setTranscripts] = React.useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:3000/wallet`);
            await setTranscripts(result.data);
        };
        fetchData();
    }, []);
    return (
        <React.Fragment>
            <Navbar />
            <div className="transcripts">
                <p></p>The following are all the transcripts you have linked here:
                {transcripts && transcripts.map((elem) => (
                    <Card className={classes.card}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Transcript
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {elem.institutionName}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                      {elem.transcriptContent.ticketHistory}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {elem.transcriptContent.map((el) => (
                            el.ticketHistory.map((e) => (
                                e.date
                            ))
                            ))}
                          
                      </Typography>
                    </CardContent>
                    </Card>
                ))}
            </div>
        </React.Fragment>
    )
import React from 'react';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders } from '../../components/ethereum/ethereum';

export default class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            identities: []
        }
    }

    async componentDidMount() {
        let accountAddress = await getAccountAddress();
        // let result = await createIdentity("122345", "0x91ba5ac30060b1b33b953186B04D4F540B717D9c");
        this.setState({ accountAddress: accountAddress });
        let result = await getAllIdentities(this.state.accountAddress);
        console.log(result);
        this.setState({ identities: result });
        let ip = await getAllIdentityProviders();
        console.log(ip);
    }

    renderIdentities = () => {
        const ids = [];
        for (const [index, value] of this.state.identities.entries()) {
            ids.push(<li>{value.ipfsHash} {value.identityProvider}</li>);
        }
        return ids;
    }

    render() {
        let ids = this.renderIdentities();
        return <div>
            <h2>Contul este: {this.state.accountAddress}</h2>
            <h2>Identitati create</h2>
            <ul>
                {ids}
            </ul>
        </div>;
    }
}