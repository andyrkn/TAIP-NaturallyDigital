import React from 'react';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders } from '../../components/ethereum/ethereum';

export default class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            identities: [],
            value: '',
            txHash: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let accountAddress = await getAccountAddress();
        // await createIdentity(accountAddress, "435644", "0x91ba5ac30060b1b33b953186B04D4F540B717D9c");
        this.setState({ accountAddress: accountAddress });
        let result = await getAllIdentities(this.state.accountAddress);
        console.log(result);
        this.setState({ identities: result });
        let ip = await getAllIdentityProviders();
        console.log(ip);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(event) {
        let tx;
        try { tx = await createIdentity(this.state.accountAddress, this.state.value, "0x91ba5ac30060b1b33b953186B04D4F540B717D9c"); }
        catch (err) {
            console.log(err);
        }
        this.setState({ txHash: tx });
        let result = await getAllIdentities(this.state.accountAddress);
        this.setState({ identities: result });
        event.preventDefault();
    }

    renderIdentities = () => {
        const ids = [];
        for (const [index, value] of this.state.identities.entries()) {
            ids.push(<li>{value.ipfsHash} {value.identityProvider}</li>);
        }
        return ids;
    }

    render() {
        let ids = this.renderIdentities();
        return <div>
            <h2>Contul este: {this.state.accountAddress}</h2>
            <h2>Identitati create</h2>
            <ul>
                {ids}
            </ul>

            <label>
                IPFS hash:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button type="submit" onClick={this.handleSubmit} >Add</button>
            <div>{this.state.txHash}</div>
        </div>;
    }
}