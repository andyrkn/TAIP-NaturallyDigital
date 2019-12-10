import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/navbar';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import axios from 'axios';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders, createIdentityProvider } from '../../components/ethereum/ethereum';
import { decodeRequest, encodeRequest, decodeRequestList } from "../../components/request.model";

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

    const handleInstitutionChange = event => {
        setInstitution(event.target.value);
    };

    const handleTranscriptChange = event => {
        setTranscript(event.target.value);
    }

    const handleTranscriptRequest = async (e) => {
        e.preventDefault();
        let accountAddress = await getAccountAddress();
        // let res = await axios.get(`http://109.100.27.188:5000/api/Requests`);
        // await console.log("API GET call succesfull!");
        await axios.post('http://109.100.27.188:5000/api/Requests', encodeRequest({
            userAdress: accountAddress,
            identityProviderAdress: "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
            payload: { "institution": institution, "requestType": transcript }
        }))
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
                            <MenuItem value={"spclep"}>SPCLEP Iasi</MenuItem>
                            <MenuItem value={"omniasig_insurance"}>Omniasig</MenuItem>
                            <MenuItem value={"medical-records"}>Spitalul Clinic Parhon, Iasi</MenuItem>
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
                            <MenuItem value={"istoric"}>Istoric</MenuItem>
                            <MenuItem value={"plata"}>Plata</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Button variant="contained" color="primary" className={classes.button} onClick={handleTranscriptRequest}>
                    Send request
                </Button>
            </div>
        </React.Fragment>
    )
}