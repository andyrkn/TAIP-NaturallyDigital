import React from 'react';
import Navbar from '../../components/navbar';
import { getAccountAddress, createIdentityProvider } from '../../components/ethereum/ethereum';

export default class IdentityProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identityProvider: '',
            ipfsHash: '',
            txHash: ''
        }
        this.onCreate = this.onCreate.bind(this);
        this.handleIpChange = this.handleIpChange.bind(this);
        this.handleIpfsChange = this.handleIpfsChange.bind(this);
    }

    async onCreate() {
        const { identityProvider, ipfsHash } = { ...this.state };
        let account = await getAccountAddress();
        let txHash = await createIdentityProvider(account, identityProvider, ipfsHash);
        this.setState({ txHash });
    }

    handleIpChange(event) {
        this.setState({ identityProvider: event.target.value });
    }
    handleIpfsChange(event) {
        this.setState({ ipfsHash: event.target.value });
    }


    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main className="main">
                    <h2>Create identity provider</h2>
                    <label htmlFor="ip">Identity provider address</label>
                    <input type="text" id="ip" value={this.state.identityProvider} onChange={this.handleIpChange} />
                    <label htmlFor="ipfs">IPFS hash</label>
                    <input type="text" id="ipfs" value={this.state.ipfsHash} onChange={this.handleIpfsChange} />
                    <button type="submit" onClick={this.onCreate}>Create</button>
                    <div>Transction hash: {this.state.txHash}</div>
                </main>
            </React.Fragment>
        );
    }
}