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
}