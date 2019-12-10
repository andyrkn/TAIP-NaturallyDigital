import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/navbar';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import axios from 'axios';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders, createIdentityProvider } from '../../components/ethereum/ethereum';

import "./credentials.styles.scss";
import "../../shared/shared.scss";

const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(13),
        },
        input: {
            display: 'none',
        },
}));

export default function Credentials() {
    const classes = useStyles();
    const [institution, setInstitution] = React.useState(0);
    const [transcript, setTranscript] = React.useState(0);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    // let accountAddress = await getAccountAddress();
    
    const handleInstitutionChange = event => {
        setInstitution(event.target.value);
    };

    const handleTranscriptChange = event => {
        setTranscript(event.target.value);
    }

    const handleTranscriptRequest = async (e) => {
        e.preventDefault();
        await console.log("Initiating API GET call for transcripts...")
        // let res = await axios.get(`http://109.100.27.188:5000/api/Requests`);
        // await console.log("API GET call succesfull!");
        await console.log("Saving the API GET call response to the wallet...");
        await axios.post('http://109.100.27.188:5000/api/Requests', {
            userAdress: "0xa3F5c4B09289f482A362e031B6ACA4b662B23b6b",
            identityProviderAdress: "add",
            payload:  JSON.stringify({"fullName":institution, "transcript":transcript })
        })
        await console.log("Transcript sucesfully saved in the wallet!");
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className="dropdowns">
                <div className="row">
                    <p>Select an institution:</p>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel}>
                            Institution
                        </InputLabel>
                        <Select
                            onChange={handleInstitutionChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={"rutiera"}>Politia Rutiera Iasi</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="row">
                    <p>Select the transcript:</p>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel}>
                            Transcript
                        </InputLabel>
                        <Select
                            onChange={handleTranscriptChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={"istoric-amenzi"}>Istoric amenzi</MenuItem>
                            <MenuItem value={"plata-amenzi"}>Plata amenzi</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* <div className="row">
                    <p>Select time intervals:</p>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel}>
                            Time
                        </InputLabel>
                        <Select
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={10}>Last month</MenuItem>
                            <MenuItem value={20}>Last year</MenuItem>
                            <MenuItem value={20}>Since first item</MenuItem>
                        </Select>
                    </FormControl>
                </div> */}

                <Button variant="contained" color="primary" className={classes.button} onClick={handleTranscriptRequest}>
                    Send request
                </Button>
            </div>
        </React.Fragment>
    )
}