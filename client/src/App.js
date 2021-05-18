import React from "react";

import { Router, Route } from "react-router-dom";
import history from "./history";

import Join from "./components/Join";
import ChatApp from "./components/ChatApp";

const App = () => (
  <Router history={history}>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={ChatApp} />
  </Router>
);

export default App;
