import React, { useEffect, useState } from "react";
import '../css/common.css';
import Header from "../components/Header.js";
import DraftEditor from "../components/Editor.js";


function Write({user, isAuthenticated}){
	return (
		<>
		<Header num={0} isAuthenticated={isAuthenticated} />
		<DraftEditor user={user} />
		</>
	);
}

export default Write;