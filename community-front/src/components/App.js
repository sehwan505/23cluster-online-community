import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
//import NavBar from "./components/routing/Nav";
//import Routes from "./Routes";

function App() {
	const [user, setUser] = useState([]);
	let [isAuthenticated, setisAuthenticated] = useState(localStorage.getItem('token') ? true : false);

	const asyncLocalStorage = {
		setItem: function (key, value) {
			return Promise.resolve().then(function () {
				localStorage.setItem(key, value);
			});
		},
		getItem: function (key) {
			return Promise.resolve().then(function () {
				return localStorage.getItem(key);
			});
		}
	};
	
	const userHasAuthenticated = (authenticated, username, token) => { 
	  asyncLocalStorage.setItem('token', token);
      setUser(username)
	  setisAuthenticated(authenticated)
	}//회원가입이나 로그인이 성공했을 때 토큰을 저장
  
	const handleLogout = () => {
		setisAuthenticated(false)
		setUser("")
		localStorage.removeItem('token');
		window.location.href = '/';
	}//로그아웃

	useEffect(() => {
	  // 토큰(access token)이 이미 존재하는 상황이라면 서버에 GET /validate 요청하여 해당 access token이 유효한지 확인
	  
	  async function init(){
	  setUser({
		user_comment_like : [],
		user_comment_unlike : [],
		user_post_like : [],
		user_post_unlike : [],	
	  });
	  if (isAuthenticated) {
		// 현재 JWT 토큰 값이 타당한지 GET /validate 요청을 통해 확인하고
		// 상태 코드가 200이라면 현재 GET /user/current 요청을 통해 user정보를 받아옴
		const res = await fetch('http://52.78.40.184:80/user/verify/', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			token: localStorage.getItem('token')
		  })
		});
		if (!res.ok)
		{
			handleLogout();
			window.location.href('/');
		}
		console.log(res);
		let res1 = await fetch('http://52.78.40.184:80/user/current/', {
			headers: {
			  Authorization : localStorage.getItem('token')
			}
		  });
		if (!res1.ok)
		{
		  handleLogout();
		}
		let json = await res1.json();
		// 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
		if (json.username) {
		  //include라는 함수가 array에 있고 이건 __proto__에 f 뭐시기로 잘 나와있다.
		  setUser(json);
		  setisAuthenticated(true);
		}else{
		  //유저가 undefined라면 로그인버튼이 나오도록 modal을 false로 항상 맞춰줌
		  setisAuthenticated(false);
		}
		// Refresh Token 발급 받아 token의 만료 시간 연장
		let res2 = await fetch('http://52.78.40.184:80/user/refresh/', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			token : localStorage.getItem('token')
		  })
		})
		let json2 = await res2.json();
		localStorage.setItem('token', json2.token);
		//  userHasAuthenticated(true, json.user.username, json.token);
	  }
	}
	init();
	},[isAuthenticated])

  return (
    <>
      <AppRouter isAuthenticated={isAuthenticated} user={user} userHasAuthenticated={userHasAuthenticated} 
	  handleLogout={handleLogout} />
    </>
  );
}

export default App;
