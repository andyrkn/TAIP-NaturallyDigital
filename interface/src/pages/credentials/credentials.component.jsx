import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';
import { getAccountAddress } from '../../components/ethereum/ethereum';
import Navbar from '../../components/navbar';
import { encodeRequest } from "../../components/request.model";
import centralDatabaseAPI from '../../shared/centralDatabase';
import "../../shared/shared.scss";
import "./credentials.styles.scss";
import Loader from '../../components/loader/loader.component';


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
    const [status, setStatus] = React.useState("");

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
        setStatus("Loading");
        let request = encodeRequest({
            userAdress: accountAddress,
            identityProviderAdress: "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
            payload: { "institution": institution, "requestType": transcript }
        });
        console.log(request);
        await axios.post(`${centralDatabaseAPI}/Requests`, request)
            .then(() => setStatus("Succeded"))
            .catch(err => setStatus("Error"));
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
                            id="institution"
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
                        <InputLabel ref={inputLabel} id="transcript">
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
                <div id="status" className="row">
                    {status == "Loading" ? <Loader /> : null}
                    {status}
                </div>
            </div>
        </React.Fragment>
    )
}