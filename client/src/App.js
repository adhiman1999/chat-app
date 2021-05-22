import React from "react";

import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Join from "./components/Join";
import ChatApp from "./components/ChatApp";

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Join} />
      <Route path="/chat" component={ChatApp} />
    </Switch>
  </Router>
);

export default App;
