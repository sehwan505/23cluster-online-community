import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppliedRoute from "./routing/AppliedRoute";
import AuthenticatedRoute from "./routing/AuthenticatedRoute";
import LoginModal from './LoginModal';
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import Profile from "../routes/Profile";
import Section from "../routes/Section";

const AppRouter = ({ isAuthenticated, user, setModal, userHasAuthenticated, handleLogout}) => {
  return (
    <Router>
      <Switch>
        {isAuthenticated ? (
          <>
            <Route exact path="/">
              <Home user={user} handleLogout={handleLogout}/>
            </Route>
            <Route exact path="/profile">
              <Profile user={user} handleLogout={handleLogout}/>
            </Route>
            <Route path="/detail/:id"
              render={(id) => <Detail user={user} post_id={id}/>}/>
			<Route path="/section/:num" 
		  	render={(num) => <Section user={user} num={num} />}/>
          </>
        ) : (
		  <>
		  <Route exact path="/">
		    <Home user={user} />
          </Route>
          <Route exact path="/login">
            <LoginModal setModal={setModal} userHasAuthenticated={userHasAuthenticated} isAuthenticated={isAuthenticated}/>
          </Route>
		  <Route path="/section/:num" 
		  	render={(num) => <Section user={user} num={num} />}/>
		  <Route path="/detail/:id"
              render={(id) => <Detail user={user} post_id={id}/>}
            />
          </>
		)}
      </Switch>
    </Router>
  );
};

export default AppRouter;
