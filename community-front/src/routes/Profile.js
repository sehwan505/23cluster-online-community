import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default ({userObj, refreshUser}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    refreshUser();
  };
  const onSubmit =async (event) =>{
    event.preventDefault();
    if(userObj.displayName !== newDisplayName){
      await userObj.updateProfile({displayName:newDisplayName})
    } 
    console.log(userObj.displayName)
    refreshUser();
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  return (
    <>
        <Link to="/">홈</Link> <br/>
        <span>{userObj.displayName}</span>
        <button onClick={onLogOutClick}>로그아웃</button>
        <form onSubmit={onSubmit}>
        <input type="text" placeholder="이름 설명" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="제출"/>

      </form>
    </>
  );
};
