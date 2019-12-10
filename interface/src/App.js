import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Credentials from './pages/credentials';
import Home from './pages/home';
import Wallet from "./pages/wallet";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import Transcript from "./pages/transcript/transcript.component";
import ApprovedTranscript from "./pages/approved-transcript/approved-transcript.component";
import SavedTranscript from "./pages/saved-transcript/saved-transcript.component";
import IdentityProvider from "./pages/identity-provider/identity-provider";
import RequestList from "./pages/request-list/request-list.component";


export default function BasicExample() {
    return (<Router >
        <div >
            <Switch >
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route exact path="/login" >
                    <Login />
                </Route>
                <Route exact path="/register" >
                    <Register />
                </Route>
                <Route path="/wallet" >
                    <Wallet />
                </Route>
                <Route path="/contact" >
                    <Contact />
                </Route>
                <Route path="/transcript/:id" component={Transcript}
                />
                <Route path="/approved-transcript/:id" component={ApprovedTranscript}
                />
                <Route path="/saved-transcript/:id" component={SavedTranscript}
                />
                <Route path="/credentials" >
                    <Credentials > </Credentials> </Route >
                <Route path="/identity-provider" component={IdentityProvider}
                />
                <Route path="/requests" component={RequestList} />
            </Switch > </div >
    </Router >
    );
}