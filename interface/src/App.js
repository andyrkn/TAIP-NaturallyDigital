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


export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/credentials">
            <Credentials />
          </Route>
          <Route path="/wallet">
            <Wallet />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
