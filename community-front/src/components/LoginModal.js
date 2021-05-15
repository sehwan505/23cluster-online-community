import React, { useState } from 'react';
import { useHistory } from 'react-router'
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';

function LoginModal(props){
  let [JoinLogin,setJoinLogin] = useState('로그인')
  const history = useHistory()

  //구글 아이디로 회원가입 및 이미 회원일경우
  let responseGoogle = (res)=>{
	console.log(res);
    let email = res.profileObj.email
    let id_token = res.profileObj.googleId
    let data = {
      username: email,
      password: id_token,
      provider: 'google'
    }

    fetch('http://localhost:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.username && json.token) {
        props.userHasAuthenticated(true, json.username, json.token);
        history.push("/");
      }else{
        // 서버에 Google 계정 이미 저장돼 있다면 Login 작업 수행
        // 로그인을 시도하기 전에 서버에 접근하기 위한 access token을 발급 받음
        fetch('http://localhost:8000/user/login/', {  
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
          // 발급 완료 되었다면 해당 토큰을 클라이언트 Local Storage에 저장
          if (json.user && json.user.username && json.token) {
            props.userHasAuthenticated(true, json.user.username, json.token);
            history.push("/");
          }
        })
        .catch(error => {
          console.log(error);
          window.gapi && window.gapi.auth2.getAuthInstance().signOut();
        });   
      }
    })
    .catch(error => {
      console.log(error);
      window.gapi && window.gapi.auth2.getAuthInstance().signOut();
    });  
  }//구글 아이디로 회원가입 및 이미 회원일경우

  let responseKakao = (res)=>{
    let nickname = res.profile.kakao_account.profile.nickname
    let id_token = res.profile.id
    let data = {
      username: nickname,
      password: id_token,
      provider: 'kakao'
    }

    fetch('http://localhost:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.username && json.token) {
        props.userHasAuthenticated(true, json.username, json.token);
        history.push("/");
      }else{
        // 서버에 Google 계정 이미 저장돼 있다면 Login 작업 수행
        // 로그인을 시도하기 전에 서버에 접근하기 위한 access token을 발급 받음
        fetch('http://localhost:8000/user/login/', {  
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
          // 발급 완료 되었다면 해당 토큰을 클라이언트 Local Storage에 저장
          if (json.user && json.user.username && json.token) {
            props.userHasAuthenticated(true, json.user.username, json.token);
            history.push("/");
          }
        })
        .catch(error => {
          console.log(error);
          window.kapi && window.kapi.auth2.getAuthInstance().signOut();
        });   
      }
    })
    .catch(error => {
      console.log(error);
      window.kapi && window.kapi.auth2.getAuthInstance().signOut();
    });  
  }//카카오 아이디로 회원가입 및 이미 회원일경우

  return(
    <>
      <div className="login-container">
        <div className="login-box">
          <section className="social-box">
            <h4>소셜 계정으로 {JoinLogin}</h4>
            <div className="googlebox">
              <GoogleLogin
                buttonText="구글 로그인"
                clientId="993167427573-hbdhu576tcrqmhljcp8tfjbohtfu5li7.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'} />
            </div>
			<div>
				<KakaoLogin
					buttonText="카카오 로그인"
					jsKey={'8bddd75ad7eb715e2ef60468da308305'}
					onSuccess={responseKakao}
					onFailure={responseKakao}
					getProfile={true}
				/>
			</div>
          </section>
        </div>
      </div>
    </>
  )
}


export default LoginModal;