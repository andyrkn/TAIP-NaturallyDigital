import React from 'react';
import Navbar from '../../components/navbar';

import axios from 'axios';
import centralDatabaseAPI from '../../shared/centralDatabase';
import { getAccountAddress } from '../../components/ethereum/ethereum';
import Request from "../../components/request/request.component";
import "./request-list.styles.css";
import { Link } from 'react-router-dom';
import { decodeRequest, encodeRequest, decodeRequestList } from "../../components/request.model";

const role = sessionStorage.getItem('role');

export default class RequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [
                // {
                //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                //     "date": "2019-12-04T00:27:18.140Z",
                //     "payload": {
                //         "id": 1, "institution": "Politia Rutiera Iasi", "requestType": "istoric-amenzi", "description": {
                //             "date": "10.09.2019",
                //             "amount": "$1300",
                //             "reason": "Speeding",
                //             "officer": "Pomohaci Alex"
                //         }
                //     }
                // },
                // {
                //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                //     "date": "2019-12-04T00:27:18.140Z",
                //     "payload": {
                //         "id": 1, "institution": "Politia Rutiera Iasi", "requestType": "istoric-amenzi", "description": {
                //             "date": "10.09.2019",
                //             "amount": "$1300",
                //             "reason": "Speeding",
                //             "officer": "Pomohaci Alex"
                //         }
                //     }
                // },
                // {
                //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                //     "date": "2019-12-04T00:27:18.140Z",
                //     "payload": {
                //         "id": 1, "institution": "Politia Rutiera Iasi", "requestType": "istoric-amenzi", "description": {
                //             "date": "10.09.2019",
                //             "amount": "$1300",
                //             "reason": "Speeding",
                //             "officer": "Pomohaci Alex"
                //         }
                //     }
                // },
                // {
                //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                //     "date": "2019-12-04T00:27:18.140Z",
                //     "payload": {
                //         "id": 1, "institution": "Politia Rutiera Iasi", "requestType": "istoric-amenzi", "description": {
                //             "date": "10.09.2019",
                //             "amount": "$1300",
                //             "reason": "Speeding",
                //             "officer": "Pomohaci Alex"
                //         }
                //     }
                // }
            ],
            approvedRequests: [
                // {
                //     "userAdress": "0x2a1f9582d39b35f548D9aeCBCdeaC4f3c42fb199",
                //     "identityProviderAdress": "0x32C31A1AC1F98e4dF6C4D91F8b4959a904312e0D",
                //     "date": "2019-12-04T00:27:18.140Z",
                //     "payload": "{\"institution\":\"Politia Rutiera Iasi\",\"requestType\":\"istoric-amenzi\",\"description\":{\"date\":\"10.09.2019\",\"amount\":\"$1300\",\"reason\":\"Speeding\",\"officer\":\"Pomohaci Alex\"}}",
                //     "id": 1
                // }
            ],
            submitedRequests: []
        }
    }

    async componentDidMount() {
        let account = await getAccountAddress();
        if (role == "ip") {
            axios.get(`${centralDatabaseAPI}/Requests/ip?identityProvider=${account}`)
                .then(requests => {
                    console.log(requests.data);
                    this.setState({ requests: decodeRequestList(requests.data) });
                });
        } else {
            axios.get(`${centralDatabaseAPI}/Requests/users?userAdress=${account}`)
                .then(requests => {
                    console.log(requests.data);
                    this.setState({ submitedRequests: decodeRequestList(requests.data) });
                });
            axios.get(`${centralDatabaseAPI}/ApprovedRequests/?userAdress=${account}`)
                .then(requests => {
                    console.log(requests.data);
                    this.setState({ approvedRequests: decodeRequestList(requests.data) });
                });
        }
    }

    identityProviderView() {
        return (
            <React.Fragment>
                <h2>Requests to approve</h2>
                {this.state.requests.length == 0 ? null : this.state.requests.map(request =>
                    <div className="request-card">
                        <div className="card-container">
                            <Link to={`/transcript/${request.id}`} key={request.id} style={{ textDecoration: 'none', color: 'black' }}>
                                <Request institution={request.payload.institution} requestType={request.payload.requestType} />
                            </Link>
                        </div>
                    </div>)
                }
            </React.Fragment>
        );
    }

    userView() {
        let r = this.state.approvedRequests[0];
        return (
            <React.Fragment>
                <h2>Requests submited</h2>
                {this.state.submitedRequests.length == 0 ? null : this.state.submitedRequests.map(request =>
                    <div className="request-card">
                        <div className="card-container">
                            <Link to={`/transcript/${request.id}`} key={request.id} style={{ textDecoration: 'none', color: 'black' }}>
                                <Request institution={request.payload.institution} requestType={request.payload.requestType} />
                            </Link>
                        </div>
                    </div>)
                }
                <h2>Requests approved</h2>
                {this.state.approvedRequests.length == 0 ? null : this.state.approvedRequests.map(request =>
                    <div className="request-card">
                        <div className="card-container">
                            <Link to={`/approved-transcript/${request.id}`} key={request.id} style={{ textDecoration: 'none', color: 'black' }}>
                                <Request institution={request.payload.institution} requestType={request.payload.requestType} />
                            </Link>
                        </div>
                    </div>)
                }
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="main">
                    {role == "ip" ? this.identityProviderView() : this.userView()}
                </div>
            </React.Fragment>
        )
    }
}