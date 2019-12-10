import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, ListItem, ListItemText, List, SwipeableDrawer, ListItemIcon, Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';

import '../../shared/shared.scss';
import './navbar.styles.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    background: '#fff',
  },
  logo: {
    margin: 0,
    padding: 0,
    width: '70%',
  },
  menuButton: {
    marginRight: '2.3rem',
    transform: 'scale(1.5, 1.5)',
    color: '#404040',
  },
  backButton: {
    width: "8em",
    height: '8em',
  },
  box: {
    height: '11vh',
  },
  icon: {
    transform: 'scale(1.5, 1.5)',
  },
  drawerHeader: {
    //   backgroundColor: "red
    fontSize: '22px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: "10%",
  },
  listContainer: {
    width: '32vh',
  },
  list: {
    "&:last-child": {
      borderBottom: 'none',
    },
  },
  paper: {
    background: 'white',
    color: 'black',
    width: '80%',
  },
  listItem: {
    textAlign: 'center',
    padding: '4em 0 4em 0',
    borderBottom: '1px solid black',
  },
  listItemText: {
    fontSize: '2rem',
    color: '#000',
  },
}));


export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const menuDictionary = {
    Home: '/',
    'Get Credentials': '/credentials',
    Wallet: '/wallet',
    Contact: '/contact',
    Login: '/login',
    'Create IP': 'identity-provider',
    Requests: '/requests'
  }

  let logo = require('../../assets/images/spiderman.png');

  const sideList = () => (
    <div
      className={classes.listContainer}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.list}>
        {['Home', 'Wallet', 'Get Credentials', 'Contact', 'Login', 'Create IP', 'Requests'].map((text) => (
          <Link to={menuDictionary[text]} key={text} style={{ textDecoration: 'none' }}>
            <ListItem classes={{ root: classes.listItem }} button key={text}>
              <ListItemText classes={{ primary: classes.listItemText }} primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.nav}>
        <Box className={classes.box} display="flex" alignItems="center" justifyContent="space-between" flexDirection="row">
          <img src={logo} className="navbar-logo" alt="DSC-Logo" />
          <IconButton className={classes.menuButton} onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
            <MenuIcon className={classes.icon} />
          </IconButton>
          <SwipeableDrawer
            anchor="right"
            classes={{ paper: classes.paper }}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div className="drawerContent">
              {sideList()}
            </div>
          </SwipeableDrawer>
        </Box>
      </AppBar>
    </div>
  );
}