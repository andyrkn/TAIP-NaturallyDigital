import React from 'react';
import { Redirect } from 'react-router-dom';

let monitorAccountChanges = (updateComponent) => {
    if ('ethereum' in window)
        window.ethereum.on('accountsChanged', function (accounts) {
            console.log("Account changed: " + accounts[0]);
            sessionStorage.setItem("logged", false);
            sessionStorage.setItem('privateKey', "");
            // return <Redirect to="/" />;
            updateComponent();
        });
}

export default monitorAccountChanges;