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


export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/wallet">
            <Wallet />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/transcript/:id">
            <Transcript />
          </Route>
          <Route path="/credentials">
            <Credentials></Credentials>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
