import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/navbar';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

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
    const [age, setAge] = React.useState('');

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    
    const handleChange = event => {
        setAge(event.target.value);
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
                            onChange={handleChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={20}>Politia Rutiera Iasi</MenuItem>
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
                            onChange={handleChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={10}>Istoric amenzi</MenuItem>
                            <MenuItem value={20}>Plata amenzi</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="row">
                    <p>Select time intervals:</p>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel}>
                            Time
                        </InputLabel>
                        <Select
                            onChange={handleChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={10}>Last month</MenuItem>
                            <MenuItem value={20}>Last year</MenuItem>
                            <MenuItem value={20}>Since first item</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="row">
                    <p>Select priority order:</p>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel}>
                            Order
                        </InputLabel>
                        <Select
                            onChange={handleChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={10}>Latest First</MenuItem>
                            <MenuItem value={20}>Highest First</MenuItem>
                            <MenuItem value={20}>Lowest First</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Button variant="contained" color="primary" className={classes.button}>
                    Send request
                </Button>
            </div>
        </React.Fragment>
    )
}