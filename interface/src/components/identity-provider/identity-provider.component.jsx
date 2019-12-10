import React from 'react';

const IdentityProviderView = ({ identityProvider }) => (
    <React.Fragment>
        {identityProvider == null ? null :
            <div><h3>Institution: {identityProvider.name}</h3>
                <h3>Transcripts</h3>
                <ul>
                    {identityProvider.transcripts.map(t => <li>{t}</li>)}
                </ul></div>
        }
    </React.Fragment>
)

export default IdentityProviderView;