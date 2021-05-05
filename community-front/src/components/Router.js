import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppliedRoute from "./routing/AppliedRoute";
import AuthenticatedRoute from "./routing/AuthenticatedRoute";
import LoginModal from './LoginModal';
import Home from "../routes/Home";
import Detail from "../routes/Detail";
//import Signup from "../routes/Signup";
//import Profile from "../routes/Profile"

const AppRouter = ({ isAuthenticated, user, setModal, userHasAuthenticated}) => {
  return (
    <Router>
      <Switch>
        {isAuthenticated ? (
          <>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            {/*<Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser}/>
            </Route>*/}
            <Route path="/detail/:id"
              render={(id) => <Detail user={user} post_id={id}/>}
            />
          </>
        ) : (
		  <>
		  <Route exact path="/">
		    <Home user={user} />
          </Route>
          <Route exact path="/login">
            <LoginModal setModal={setModal} userHasAuthenticated={userHasAuthenticated} isAuthenticated={isAuthenticated} />
          </Route>
          </>
		)}
      </Switch>
    </Router>
  );
};

export default AppRouter;
