import React from 'react';

import Navbar from '../../components/navbar';
import Loader from '../../components/loader';
import FileInput from "../../components/fileInput/fileInput";
import IdentityProviderView from "../../components/identity-provider/identity-provider.component";

import { getAccountAddress, createIdentityProvider, getAllIdentityProviders, getIdentityProvider } from '../../components/ethereum/ethereum';
import { uploadContent } from '../../components/ipfs/ipfs';

export default class IdentityProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identityProvider: '',
            ipfsHash: '',
            txHash: '',
            identityProviders: [],
            fileContent: null,
            loading: false,
            status: ''
        }
        this.onCreate = this.onCreate.bind(this);
        this.handleIpChange = this.handleIpChange.bind(this);
        this.loadIP = this.loadIP.bind(this);
        this.onRead = this.onRead.bind(this);
    }

    async onCreate() {
        const { identityProvider, fileContent } = { ...this.state };
        this.setState({ loading: true });
        const ipfsHash = await uploadContent(JSON.stringify(fileContent));
        this.setState({ ipfsHash })
        let account = await getAccountAddress();
        try {
            let txHash = await createIdentityProvider(account, identityProvider, ipfsHash);
            this.setState({ txHash, loading: false });
        } catch (err) {
            this.setState({ status: "Transaction failed", loading: false });
        }
    }

    async loadIP() {
        let identityProviders = await getAllIdentityProviders();
        this.setState({ identityProviders })
        console.log(await getIdentityProvider(0));
    }

    handleIpChange(event) {
        this.setState({ identityProvider: event.target.value });
    }


    onRead = (file) => {
        const jsonFile = JSON.parse(file);
        console.log(jsonFile);
        this.setState({ fileContent: jsonFile });
    };


    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                    <h2>Create identity provider</h2>
                    <label htmlFor="ip">Identity provider address:</label>
                    <input type="text" id="ip" value={this.state.identityProvider} onChange={this.handleIpChange} />
                    <div>Identity provider data:<FileInput onRead={this.onRead} /></div>
                    <IdentityProviderView identityProvider={this.state.fileContent} />
                    <button type="submit" onClick={this.onCreate}>Create</button>
                    <hr></hr>
                    {this.state.loading ? <Loader /> : null}
                    <div>IPFS hash with uploaded data: {this.state.ipfsHash}</div>
                    <div>Transaction hash: {this.state.txHash}</div>
                    <button type="submit" onClick={this.loadIP}>Get IPs</button>
                    <div>{JSON.stringify(this.state.identityProviders)}</div>
                    <div>{this.state.status}</div>
                </main>
            </React.Fragment>
        );
    }
}