import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { decrypt } from '../../components/crypto';
import { deleteIdentity, getAccountAddress, getIdentity } from '../../components/ethereum/ethereum';
import { getContent } from '../../components/ipfs/ipfs';
import Navbar from '../../components/navbar';
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";
import monitorAccountChanges from '../../components/ethereum/monitor';
import { withRouter } from 'react-router-dom';

let privateKey = '123';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(3),
    },
    input: {
        display: 'none',
    },
}));

export const ApprovedTranscript = (props) => {
    const classes = useStyles();
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

            let address = await props.getAccountAddress();
            setAccountAddress(address);
            let identity = await props.getIdentity(address, params.id);

            const encryptedRequest = JSON.parse(await props.getContent(identity.ipfsHash));
            console.log(encryptedRequest);
            const request = decrypt(encryptedRequest.encryptedContent, privateKey);
            console.log(request);
            setRequest(request);
            setLoading(false);
        }
        privateKey = sessionStorage.getItem("privateKey");
        if(privateKey !== null && privateKey !== "") loadRequest();
        monitorAccountChanges(accountChange);
    }

    let accountChange = () => {
        props.history.push("/");
    }

    useEffect(getRequest, []);

    const onDelete = () => {
        setLoading(true);
        props.deleteIdentity(accountAddress, id)
            .then(result => { setTxHash(result); setLoading(false); })
            .catch(err => { setStatus("Error when deleting"); setLoading(false); });
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
                        <Button variant="contained" color="primary" className={classes.button} onClick={onDelete}>
                            Delete
                        </Button>
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

export default withRouter(ApprovedTranscript);

ApprovedTranscript.defaultProps = {
    getAccountAddress: getAccountAddress,
    getIdentity: getIdentity,
    getContent: getContent,
    deleteIdentity: deleteIdentity
}