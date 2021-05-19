import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
//import NavBar from "./components/routing/Nav";
//import Routes from "./Routes";

function App() {
	const [user, setUser] = useState([]);
	let [isAuthenticated, setisAuthenticated] = useState(localStorage.getItem('token') ? true : false);
	const [checked, setChecked] = useState(localStorage.getItem('checked'));

	const userHasAuthenticated = (authenticated, username, token) => { 
	  setisAuthenticated(authenticated)
	  setUser(username)
	  localStorage.setItem('token', token);
	}//회원가입이나 로그인이 성공했을 때 토큰을 저장
  
	const handleLogout = () => {
		setisAuthenticated(false)
		setUser("")
		localStorage.removeItem('token');
		window.location.href = '/';
	}//로그아웃

	useEffect(async() => {
	  // 토큰(access token)이 이미 존재하는 상황이라면 서버에 GET /validate 요청하여 해당 access token이 유효한지 확인
	  if (isAuthenticated) {
		// 현재 JWT 토큰 값이 타당한지 GET /validate 요청을 통해 확인하고
		// 상태 코드가 200이라면 현재 GET /user/current 요청을 통해 user정보를 받아옴
		await fetch('http://localhost:8000/user/verify/', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			token: localStorage.getItem('token')
		  })
		})
		.then(async(res) => {
		  await fetch('http://localhost:8000/user/current/', {
			headers: {
			  Authorization : localStorage.getItem('token')
			}
		  })
		  .then(res => res.json())
		  .then(json => {
			// 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
			if (json.username) {
			  //include라는 함수가 array에 있고 이건 __proto__에 f 뭐시기로 잘 나와있다.
			  setUser(json);
			  setisAuthenticated(true)
			}else{
			  //유저가 undefined라면 로그인버튼이 나오도록 modal을 false로 항상 맞춰줌
			  setisAuthenticated(false)
			}
			// Refresh Token 발급 받아 token의 만료 시간 연장
			fetch('http://localhost:8000/user/refresh/', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
				token : localStorage.getItem('token')
			  })
			})
			.then(res => res.json())
			.then((json)=>{
				localStorage.setItem('token', json.token);
				//  userHasAuthenticated(true, json.user.username, json.token);
			})
			.catch(error => {
			  console.log(error);
			});
		  })
		  .catch(error => {
			handleLogout();
			console.log(error)
		  });
		})
		.catch(error => {
		  handleLogout();
		  console.log(error)
		});
	  }
	  else{
		  setUser({
			  user_comment_like : []
		  });
	  }
	},[isAuthenticated])

  return (
    <>
      <AppRouter isAuthenticated={isAuthenticated} user={user} userHasAuthenticated={userHasAuthenticated} 
	  handleLogout={handleLogout} checked={checked} />
    </>
  );
}

export default App;
