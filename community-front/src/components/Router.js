import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import Profile from "../routes/Profile"

const AppRouter = ({ isLoggedIn, userObj, refreshUser}) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} refreshUser={refreshUser}/>
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser}/>
            </Route>
            <Route path="/detail/:id"
              render={(id) => <Detail userObj={userObj} refreshUser={refreshUser} post_id={id}/>}
            />
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
