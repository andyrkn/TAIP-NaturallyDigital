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
import { decodeRequest, encodeRequest, decodeRequestList } from "../../components/request.model";

const privateKey = '123';

export default class Transcript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            request: {
                "userAdress": "",
                "identityProviderAdress": "",
                "date": "",
                "payload": { "institution": "", "requestType": "", "description": "" },
                "id": ""
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
        axios.get(`${centralDatabaseAPI}/Requests/${params.id}`)
            .then(response => {
                console.log("Raspuns de la server");
                console.log(response.data);
                this.setState({ request: decodeRequest(response.data) });
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
        let payload = this.state.request.payload;
        payload.description = this.state.fileContent;
        console.log(payload);
        axios.put(`${centralDatabaseAPI}/Requests/${this.state.id}`, { payload: btoa(JSON.stringify(payload)) })
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