import React from 'react';
import Navbar from '../../components/navbar';

import './home.styles.scss';
import '../../shared/shared.scss';

export default function Home() {
    let logo = require('../../assets/images/icons8-spider-64.png');

    return (
        <React.Fragment>
            <Navbar />
            <div className="home-message">
                <p>Welcome! This app is meant to be used as a daily identity wallet.</p>
                <p>If you have any questions, please contact the team.</p>
                <p>Have a great day!</p>
                <img src={logo} className="spider-logo"/>
            </div>
        </React.Fragment>
    )
}