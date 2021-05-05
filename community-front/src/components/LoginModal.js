import React, { useState } from 'react';
import { useHistory } from 'react-router'
import GoogleLogin from 'react-google-login';

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
        props.setModal(true);
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
            props.setModal(true);
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


  let [username, setUsername] = useState()
  let [userpassword, setUserPassword] = useState()
  
  const data = {username : username, password : userpassword}

  const handleNameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value)
  }

  return(
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="exit">
              <button onClick={()=>{ history.goBack() }}>
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
              </button>
          </div>
          <span>{JoinLogin}</span>
          <form>
            {
              JoinLogin === '로그인'
              ?(
                <>
                <button className="JoinLoign-button" onClick={(e)=>{
                  e.preventDefault()
                  fetch('http://localhost:8000/user/login/', {  
                  method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  })
                  .then(res => res.json())
                  .then(json => {
                    // user data와 token정보가 일치하면 로그인 성공
                    if (json.user && json.user.username && json.token) {
                      props.userHasAuthenticated(true, json.user.username, json.token);
                      history.push("/");
                      props.setModal(true)
                      console.log(json)
                    }else{
                      alert("아이디 또는 비밀번호를 확인해주세요.")
                    }
                  })
                  .catch(error => alert(error));
                }}>{JoinLogin}</button>
                </>
              )
              :(
                <>
                <button className="JoinLoign-button" onClick={(e)=>{
                  e.preventDefault()
                  fetch('http://localhost:8000/user/', {
                    method: 'POST',
                    headers:{
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }).then(res => res.json())
                  .then(json => {
                    if (json.username && json.token) {
                      props.userHasAuthenticated(true, json.username, json.token);
                      history.push("/");
                      props.setModal(true)
                    }else{
                      alert("사용불가능한 아이디입니다.")
                    }
                  })
                  .catch(error => alert(error));
                }}
                >{JoinLogin}</button>
                </>
              )
            }
            
          </form>
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
          </section>
          <div className="login-foot">
            {
              JoinLogin === '회원가입'
              ?
              (
                <>
                <span>이미 회원이신가요  ?</span>
                <div className="foot-link" onClick={(e)=>{
                e.preventDefault()
                setJoinLogin('로그인')
                }}>로그인</div>
                </>
              )
              :
              (
                <>
                <span>아직 회원이 아니신가요 ?</span>
                <div className="foot-link" onClick={(e)=>{
                e.preventDefault()
                setJoinLogin('회원가입')
                }}>회원가입</div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}


export default LoginModal;