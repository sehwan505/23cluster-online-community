import React from "react";
import '../css/common.css';
import Header from "../components/Header.js";
import DraftEditor from "../components/Editor.js";


function Write({user, handleLogout, isAuthenticated}){
	return (
		<>
		<Header user={user} num={0} handleLogout={handleLogout} isAuthenticated={isAuthenticated}  />
		<div className="body-wrap">
			<DraftEditor user={user} handleLogout={handleLogout} />
		</div>
		</>
	);
}

export default Write;