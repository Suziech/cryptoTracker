import React from "react";
import { HashRouter, BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <HashRouter>
      <Switch>
        {/* <Route path='/:coinId'> */}
        <Route path='/:coinId'>
          <Coin />
        </Route>
        {/* <Route path='/'> */}
        <Route path='/'>
          <Coins />
        </Route>
      </Switch>
      </HashRouter>
    // </BrowserRouter>
  );
}

export default Router;
