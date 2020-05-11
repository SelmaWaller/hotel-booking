import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);
