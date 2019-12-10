import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';

import { getContent } from '../../components/ipfs/ipfs';
import { getAccountAddress, getIdentity, deleteIdentity } from '../../components/ethereum/ethereum';
import { decrypt } from '../../components/crypto';
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";
import { decodeRequest, encodeRequest, decodeRequestList } from "../../components/request.model";

const privateKey = '123';

const ApprovedTranscript = (props) => {
    let [accountAddress, setAccountAddress] = useState('');
    let [request, setRequest] = useState({
        "userAdress": "",
        "identityProviderAdress": "",
        "date": "",
        "payload": {
            "institution": "", "requestType": "", "description": {}
        },
        "id": ""
    });
    let [id, setId] = useState(null);
    let [txHash, setTxHash] = useState('');
    let [status, setStatus] = useState('');
    let [loading, setLoading] = useState(false);

    const getRequest = () => {
        async function loadRequest() {
            setLoading(true);
            const { match: { params } } = props;
            setId(params.id);

            let address = await getAccountAddress();
            setAccountAddress(address);
            let identity = await getIdentity(address, params.id);

            const encryptedRequest = JSON.parse(await getContent(identity.ipfsHash));
            console.log(encryptedRequest);
            const request = decrypt(encryptedRequest.encryptedContent, privateKey);
            console.log(request);
            setRequest(request);
            setLoading(false);
        }
        loadRequest();
    }

    useEffect(getRequest, []);

    const onDelete = () => {
        setLoading(true);
        deleteIdentity(accountAddress, id)
            .then(result => { setTxHash(result); setLoading(false); })
            .catch(err => { setStatus(err); setLoading(false); });
    }

    let { institution, requestType, description } = request.payload;

    return (
        <React.Fragment>
            <Navbar />
            <main className="main">
                {loading ? null :
                    <div>
                        <Request institution={institution} requestType={requestType} />
                        <Response payload={description} />
                        <div><button type="button" className="button button2" onClick={onDelete}>Delete</button></div>
                        {txHash == '' ? null :
                            <div><a href={`https://ropsten.etherscan.io/tx/${txHash}`}>TX Hash:</a> {txHash}</div>
                        }
                        <div className="error">{status}</div>
                    </div>
                }

            </main>
        </React.Fragment >
    )
}

export default ApprovedTranscript;