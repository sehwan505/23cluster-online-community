import React, { useEffect, useState } from "react";
import 'css/input.css';
import { useHistory } from "react-router";
import CSRFToken from "components/csrftoken";
import { toast } from  "react-toastify";
import axios from "axios";

function Signup({user, handleLogout, isAuthenticated}){
    const [signup, setSignup] = useState({ nickname: "", age: "16"})
    const [sex, setSex] = useState(0);
    const history = useHistory();

    const resign = async () =>{
        let res = await fetch(`${process.env.REACT_APP_URL}/user/resign/`, {
            headers: {
              Authorization : `JWT ${localStorage.getItem('token')}`
            }
        });
        if (res.ok)
        {
            handleLogout();
            toast.error("오류가 발생해 회원 탈퇴했습니다..");
        }
        else{
            toast.error("회원 탈퇴에 실패했습니다.\n문의 주세요.");
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (signup.nickname === "")
        {
            toast.error("닉네임이 비어있습니다.");
            return ;
        }
        if(signup.age === 0){
            toast.error("나이를 설정하지 않았습니다");
            return ;
        }
        if(sex === 0){
            toast.error("성별을 설정하지 않았습니다");
            return ;
        }
        var csrftoken = CSRFToken();
        const config = {
            headers: {
                'Authorization' : `JWT ${localStorage.getItem('token')}`
            }
        }
        await axios.post(`${process.env.REACT_APP_URL}/user/signup/`, {
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
            toast.error("예기치 못할 오류가 발생했습니다.");
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
        let { name, value } = event.target;
        if (value.length > 7)
            value = value.substr(0, 7);
        setSignup({...signup, [name] : value});
      };
	return (
		<>
		<div className="body-wrap">
			<form onSubmit={handleSubmit} id="1">
			<h1 style={{"margin-top" : "15px"}} className="input_title">회원가입</h1>
			<div style={{"margin-left" : "10px"}}>
			<div className="inputbox">
				<p>닉네임</p>
				<input className="textbox1" type="text" value={signup.nickname}
					placeholder="닉네임" name="nickname" onChange={handleNickname}
					maxLength={7}/>
			</div>
			<div className="inputbox">
				<p>나이</p>
				<input type="range" name="age" min="16" max="45" onChange={handleChange} value={signup.age}/>{signup.age}
			</div>
			<div className="inputbox">
				<p>성별</p>
				<input type="radio" value="1" name="sex" onChange={handleRadio} checked={sex === 1 ? true : false}/><label htmlFor="1">남</label> <input type="radio" value="2" name="sex" onChange={handleRadio} checked={sex === 2 ? true : false}/><label htmlFor="2">여</label>
			</div>
			</div>
			<button type="submit" class="btn btn-outline-success" form="1">완료</button>
			</form>
		</div>
		</>
	)
}

export default Signup;