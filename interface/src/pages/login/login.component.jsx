import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from '../../components/navbar';
import { MenuItem, Button } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './login.styles.scss';
import centralDatabaseAPI from '../../shared/centralDatabase';

const roles = [
    {
        value: 'user',
    },
    {
        value: 'ip',
    }
]

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
        width: '140px',
    },
}));

export default function Login() {
    let logo = require('../../assets/images/icons8-spider-64.png');
    const classes = useStyles();
    const [role, setRole] = React.useState('user');
    const [password, setPassword] = React.useState('');
    const [redirectHome, setRedirectHome] = React.useState(false);

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }
    const handleChange = event => {
        setRole(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        sessionStorage.setItem('role', role);
        axios.get(`${centralDatabaseAPI}/Login?userName=user&password=${password}`)
            .then(res => {
                if (res.status === 200) {
                    setRedirectHome(true);
                };
            }, error => {
                // alert("Wrong password & role selected. Try again!");
            });
    }

    if (redirectHome) {
        return <Redirect to="/" />;
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className="home-message">
                <p>Welcome! Please, write the password for your address and the role that you want to login as:</p>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" onChange={handlePasswordChange} label="Password" type="password" variant="outlined" />
                    <TextField
                        id="outlined-select-role"
                        select
                        label="Select"
                        className={classes.textField}
                        value={role}
                        onChange={handleChange}
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select your role"
                        margin="normal"
                        variant="outlined"
                        >
                        {roles.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmit}
                    startIcon={<LockOpenIcon />}
                >
                    Login
                </Button>
                <p>Not a member yet? Don't worry! Register here:</p>
                <Link to="/register">
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<TelegramIcon />}
                    >
                        Register
                    </Button>
                </Link>
            </div>
        </React.Fragment>
    )
}