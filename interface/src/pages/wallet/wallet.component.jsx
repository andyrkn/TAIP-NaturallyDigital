import React from 'react';
import { getAccountAddress, createIdentity, getAllIdentities, getAllIdentityProviders } from '../../components/ethereum/ethereum';

export default class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: '',
            identities: []
        }
    }

    async componentDidMount() {
        let accountAddress = await getAccountAddress();
        // let result = await createIdentity("122345", "0x91ba5ac30060b1b33b953186B04D4F540B717D9c");
        this.setState({ accountAddress: accountAddress });
        let result = await getAllIdentities(this.state.accountAddress);
        console.log(result);
        this.setState({ identities: result });
        let ip = await getAllIdentityProviders();
        console.log(ip);
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
        </div>;
    }
}