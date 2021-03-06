import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import Pagination from "../Pagination";
import Filter from "../Filter";
import Sort from "../Sort";

const App = () => (
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pagination/1">Pagination</Link>
        </li>
        <li>
          <Link to="/filter">Filter</Link>
        </li>
        <li>
          <Link to="/sort?order=asc&sort=id">Sort</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pagination/:id">
          <Pagination />
        </Route>
        <Route path="/filter">
          <Filter />
        </Route>
        <Route path="/sort">
          <Sort />
        </Route>
      </Switch>
    </QueryParamProvider>
  </Router>
);

const Home = () => <div>Home</div>;

export default App;
