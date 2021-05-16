import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppliedRoute from "./routing/AppliedRoute";
import AuthenticatedRoute from "./routing/AuthenticatedRoute";
import LoginModal from './LoginModal';
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import Profile from "../routes/Profile";
import Section from "../routes/Section";
import Write from "../routes/Write";

const AppRouter = ({ isAuthenticated, user, userHasAuthenticated, handleLogout}) => {
  return (
    <Router>
      <Switch>
        {isAuthenticated ? (
          <>
            <Route exact path="/">
              <Home user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
            </Route>
			<Route exact path="/write">
              <Write user={user} isAuthenticated={isAuthenticated}/>
            </Route>
            <Route exact path="/profile">
              <Profile user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
            </Route>
            <Route path="/detail/:id"
              render={(id) => <Detail user={user} post_id={id} isAuthenticated={isAuthenticated}/>}/>
			<Route path="/section/:num" 
		  	render={(num) => <Section user={user} num={num} isAuthenticated={isAuthenticated} />}/>
          </>
        ) : (
		  <>
		  <Route exact path="/">
		    <Home user={user} isAuthenticated={isAuthenticated}/>
          </Route>
          <Route exact path="/login">
            <LoginModal userHasAuthenticated={userHasAuthenticated} isAuthenticated={isAuthenticated}/>
          </Route>
		  <Route path="/section/:num" 
		  	render={(num) => <Section user={user} num={num} isAuthenticated={isAuthenticated} />}/>
		  <Route path="/detail/:id"
              render={(id) => <Detail user={user} post_id={id} isAuthenticated={isAuthenticated}/>}
            />
          </>
		)}
      </Switch>
    </Router>
  );
};

export default AppRouter;
