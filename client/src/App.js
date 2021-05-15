import React from "react";

import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

import Join from "./components/Join";
import Chat from "./components/Chat";

const App = () => (
  <Router history={history}>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
