import React from "react";
import { ToastContainer } from  "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginModal from './LoginModal';
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import Profile from "../routes/Profile";
import Section from "../routes/Section";
import Write from "../routes/Write";
import Search from "../routes/Search";
import Signup from "../routes/Signup";

const AppRouter = ({ isAuthenticated, user, userHasAuthenticated, handleLogout}) => {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        {isAuthenticated ? (
          <>
            <Route exact path="/">
              <Home user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
            </Route>
			<Route exact path="/write">
              <Write user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
            </Route>
            <Route exact path="/profile">
              <Profile user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
            </Route>
            <Route path="/detail/:id"
              render={(id) => <Detail user={user} post_id={id} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>}/>
			<Route path="/section/:num"
		  	render={(num) => <Section user={user} num={num} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />}/>
			<Route path="/search">
			  <Search user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
		    </Route>
            <Route path="/signup">
			  <Signup user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
		    </Route>
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
		  <Route path="/search">
			<Search user={user} isAuthenticated={isAuthenticated} />
		  </Route>
          </>
		)}
      </Switch>
    </Router>
  );
};

export default AppRouter;
