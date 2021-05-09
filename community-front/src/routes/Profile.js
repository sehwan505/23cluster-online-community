import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios"

function Profile({user, handleLogout}){
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(user.username);
  const [usernameModal, setUsernameModal] = useState(true);

  const onSubmit = async (event) =>{
    event.preventDefault();
    if(user.username !== newDisplayName){
		await axios.put(`http://localhost:8000/user/profile/${user.user_pk}/update/`, {
			username: newDisplayName
		}).then((response) => {
			console.log("Ab");
		})
		.catch((error) => {
		// 예외 처리
		})
    }
	window.location.reload();
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const nameChange = () =>{
	setUsernameModal(!(usernameModal));
  }

  return (
    <>
        <Link to="/">홈</Link> <br/>
        <span>{user.username}</span>
        <button onClick={handleLogout}>로그아웃</button>
		<br/>
		<button onClick={nameChange}>이름 바꾸기</button>
		{usernameModal ? null :
		<form onSubmit={onSubmit}>
        	<input type="text" placeholder="이름 변경" value={newDisplayName == null ? '' : newDisplayName} onChange={onChange} />
        	<input type="submit" value="제출"/>
      	</form>
		}
    </>
  );
};

export default Profile;