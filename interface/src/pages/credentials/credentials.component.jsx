import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/navbar';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import axios from 'axios';

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
        let res = await axios.get(`http://localhost:3000/${institution}?transcript=${transcript}`);
        axios.post('http://localhost:3000/wallet', {
            institutionName: institution,
            transcriptContent: res.data,
        })
    };

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
                            <MenuItem value={'istoric-amenzi'}>Istoric amenzi</MenuItem>
                            <MenuItem value={'plata-amenzi'}>Plata amenzi</MenuItem>
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