import React from 'react';
import Navbar from '../../components/navbar';
import Loader from '../../components/loader';

import "./transcript.styles.css";
import axios from 'axios';
import { getAccountAddress } from '../../components/ethereum/ethereum';
import centralDatabaseAPI from '../../shared/centralDatabase';
import FileInput from "../../components/fileInput/fileInput";
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";

const privateKey = '123';

export default class Transcript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            request: {
                "userAdress": "0xa3F5c4B09289f482A362e031B6ACA4b662B23b6b",
                "identityProviderAdress": "0x9eE22087c9C06922145c3F7D6aEBd8e486f3A18e",
                "date": "2019-12-04T00:27:18.140Z",
                "payload": { "id": 1, "institution": "Politia Rutiera Iasi", "requestType": "istoric-amenzi" }
            },
            loading: false,
            fileContent: '',
            ipfsHash: '',
            txHash: '',
            encryptedFile: '',
            status: '',
            id: ''
        }
        this.onAccept = this.onAccept.bind(this);
        this.onReject = this.onReject.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ id: params.id });

        let accountAddress = await getAccountAddress();
        this.setState({ accountAddress: accountAddress });
        axios.get(`${centralDatabaseAPI}/Requests/users?userAdress=${this.state.accountAddress}&id=${params.id}`)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: response });
            });
    }

    onRead = (file) => {
        const jsonFile = JSON.parse(file);
        console.log(jsonFile);
        this.setState({ fileContent: jsonFile });
    };

    onReject() {
        this.setState({ loading: true });
        axios.put(`${centralDatabaseAPI}/Requests/users?userAdress=${this.state.accountAddress}&id=${this.state.id}`, this.state.request)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: response, loading: false, status: 'Successfully rejected' });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false, status: 'Response submision failed' });
            });
    }

    onAccept() {
        this.setState({ loading: true });
        let response = this.state.request;
        response.payload.response = JSON.stringify(this.state.fileContent);
        console.log(response);
        axios.post(`${centralDatabaseAPI}/Requests/users?userAdress=${this.state.accountAddress}&id=${this.state.id}`, response)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: response, loading: false, status: 'Successfully accepted' });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false, status: 'Response submision failed' });
                throw err;
            });
    }

    render() {
        let notFileUploaded = this.state.fileContent == '';

        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                    <Request {...this.state.request.payload} />
                    <div>
                        <FileInput onRead={this.onRead} />
                    </div>
                    {notFileUploaded ? null : <div>
                        <Response payload={this.state.fileContent} />
                    </div>}
                    <div>
                        <button type="button" className="button button2" onClick={this.onAccept} disabled={notFileUploaded}>Upload</button>
                        <button type="button" className="button button2" onClick={this.onReject}>Reject</button>
                    </div>
                    {this.state.loading ? <Loader /> : null}
                    <div className="error">{this.state.status}</div>
                </main>
            </React.Fragment >
        )
    }
}