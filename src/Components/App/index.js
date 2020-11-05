import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Pagination from "../Pagination";

const App = () => (
  <Router>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/pagination/1">Pagination</Link>
      </li>
    </ul>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pagination/:id">
        <Pagination />
      </Route>
    </Switch>
  </Router>
);

const Home = () => <div>Home</div>;

export default App;
