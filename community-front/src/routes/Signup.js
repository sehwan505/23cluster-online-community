import React, { useEffect, useState } from "react";
import 'css/common.css';
import { useHistory } from "react-router";
import CSRFToken from "components/csrftoken";
import axios from "axios";

function Signup({user, handleLogout, isAuthenticated}){
    const [signup, setSignup] = useState({ nickname: "", age: "0"})
    const [sex, setSex] = useState(0);
    const history = useHistory();

    const resign = async () =>{
        let res = await fetch('http://127.0.0.1:8000/user/resign/', {
            headers: {
              Authorization : `JWT ${localStorage.getItem('token')}`
            }
        });
        if (res.ok)
        {
            handleLogout();
            alert("오류가 발생해 회원 탈퇴했습니다..");
        }
        else{
            alert("회원 탈퇴에 실패했습니다.\n문의 주세요.");
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (signup.nickname === "")
        {
            alert("닉네임이 비어있습니다.");
            return ;
        }
        if(signup.age === 0){
            alert("나이를 설정하지 않았습니다");
            return ;
        }
        if(sex === 0){
            alert("성별을 설정하지 않았습니다");
            return ;
        }
        var csrftoken = CSRFToken();
        const config = {
            headers: {
                'Authorization' : `JWT ${localStorage.getItem('token')}`
            }
        }
        await axios.post('http://127.0.0.1:8000/user/signup/', {
            nickname : signup.nickname,
            age : signup.age,
            sex : sex,
            csrfmiddlewaretoken	: csrftoken
        }, config).then((response) => {
          if (response.status === 200)
          { 
            history.push('/');
            history.go(0);
          }
          else
          {
            alert("예기치 못할 오류가 발생했습니다.");
            resign();
            history.push('/');
            history.go(0);
          }
        })
        .catch((error) => {
        // 예외 처리
          resign();
          console.log(error);
        })
      }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignup({...signup, [name] : parseInt(value)});
    }
    const handleRadio = (event) =>{
        const { value } = event.target;
        setSex(parseInt(value));
    }
    const handleNickname = (event) => {
        const { name, value } = event.target;
        if (value.length > 7)
            value = value.substr(0, 7);
        setSignup({...signup, [name] : value});
      };
	return (
		<>
		<div className="body-wrap">
            <form onSubmit={handleSubmit}>
                닉네임 : <input type="text" name="nickname" placeholder="닉네임을 지정하세요" onChange={handleNickname} value={signup.nickname} maxLength={7}/><br/>
                나이 : <input type="range" name="age" min="16" max="45" onChange={handleChange} value={signup.age}/>{signup.age}<br/>
                성별 : <input type="radio" value="1" name="sex" onChange={handleRadio} checked={sex === 1 ? true : false}/><label htmlFor="1">남</label> <input type="radio" value="2" name="sex" onChange={handleRadio} checked={sex === 2 ? true : false}/><label htmlFor="2">여</label>
                <input type="submit" value="확인"/>
            </form>
		</div>
		</>
	)
}

export default Signup;