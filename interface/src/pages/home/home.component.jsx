import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import './home.styles.scss';
import '../../shared/shared.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 350,
    },
    headCell: {
        fontSize: '19px',
        fontWeight: 'bold',
    }
});

export default function Home() {
    let logo = require('../../assets/images/icons8-spider-64.png');
    let [payload, setPayload] = useState('');
    let [logged, setLogget] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        // axios.get(`http://109.100.27.188:5000/api/Requests/users?userAdress=0xa3F5c4B09289f482A362e031B6ACA4b662B23b6b`)
        // .then(res => {
        //     setPayload(JSON.parse(res.data[0].payload));
        // })
        let log = sessionStorage.getItem("logged");
        setLogget(log);
        console.log(logged);
    }, []);


    function createData(type, value) {
        return { type, value };
    }

    const rows = [
        createData('Institution', `${payload.fullName}`),
        createData('Transcript', `${payload.transcript}`),
        createData('Amount', `${payload.amount}`),
        createData('Date', `${payload.date}`),
        createData('Reason', `${payload.reason}`),
        createData('Officer', `${payload.officer}`),
    ]

    return (
        <React.Fragment>
            <Navbar />
            <div className="home-message">
                {/* <p>Welcome! Below, you can see your request history:</p> */}
                {/* <p>Institution: {payload.fullName}</p>
                <p>Transcript: {payload.transcript}</p>
                <p>Amount: {payload.amount}</p>
                <p>Date: {payload.date}</p>
                <p>Reason: {payload.reason}</p>
                <p>Officer Name: {payload.officer}</p> */}
                {/* <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headCell}>Category</TableCell>
                                <TableCell className={classes.headCell}>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.type}>
                                    <TableCell component="th" scope="row">
                                        {row.type}
                                    </TableCell>
                                    <TableCell align="left">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper> */}
                <p>If you have any questions, please contact the team.</p>
                <p>Have a great day!</p>
                {(logged !== null && logged !== "false") ? <p id="welcome">Welcome back!</p> : null}
                <img src={logo} className="spider-logo" />
            </div>
        </React.Fragment>
    )
}