import React, { useEffect, useState } from "react";
import Post from "components/Post"
import axios from "axios"
import CSRFToken from "../components/csrftoken.js"
import { useHistory, Link } from "react-router-dom";
import '../css/common.css';
import Header from "../components/Header.js";
//import search_png from '../img/search.png';
//import user_png from "../img/user.png";

import DraftEditor from "../components/Editor.js";


function Home(props){
  const [postTitle , setPostTitle] = useState("");
  const [postContent , setPostContent] = useState("");
  const [nweet, setNweet] = useState([]);
  const history = useHistory();


useEffect(async() => {
    try {
        const res = await fetch('http://localhost:8000/api/post');
        const posts = await res.json();
        setNweet(posts);
    } 
    catch (e) {
        console.log(e);
    }
}, []);

const onSubmit = async (event) => {
    event.preventDefault();
	var csrftoken = CSRFToken();
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
    await axios.post('http://127.0.0.1:8000/api/post/add/', {
        title: postTitle,
        content: postContent,
        writer_id: props.user.user_pk,
        writer_name: props.user.username,
		csrfmiddlewaretoken	: csrftoken
    }, config).then((response) => {
		console.log("Ab");
    })
    .catch((error) => {
    // 예외 처리
    })
    window.location.reload();
  }
  const onChangeTitle = (event) => {
    const {
      target: { value },
    } = event;
    setPostTitle(value);
  }

  const onChangeContent = (event) => {
    const {
      target: { value },
    } = event;
    setPostContent(value);
  }

  return (
    <>
    {/*<div align="center">
      <Link to="/profile">프로필</Link>
    </div>
    <div>
      <span>
        {props.user.username}
      </span>
	  <button onClick={props.handleLogout}>로그아웃</button>
    </div>
    <div>
		<DraftEditor user={props.user}/>
    </div>
    <div>
        {nweet.map((post) => (
            <Post key={post.id} post={post} isOwner={props.user.user_pk === post.writer_id}/>
        ))}
    </div>*/}
	<div>
      <Header num={0}/>
      <div className="body-wrap no-border">
        <div className="flox-box" id="sidebar2">
          <div className="flox-rank-wrap">
            <div>해시태크 순위</div>
            <ul>
              <li className="on">1</li>
              <li className="on">가나다라마바사</li>
              <li>2</li>
              <li>가나다라마바사</li>
              <li>3</li>
              <li>가나다라마바사</li>              
              <li>4</li>
              <li>가나다라마바사</li>              
              <li>5</li>
              <li>가나다라마바사</li>              
              <li>6</li>
              <li>가나다라마바사</li>              
              <li>7</li>
              <li>가나다라마바사</li>              
              <li>8</li>
              <li>가나다라마바사</li>              
              <li>9</li>
              <li>가나다라마바사</li>              
              <li>10</li>
              <li>가나다라마바사</li>              
            </ul>            
          </div>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>       
      </div>
    </div>
    </>
  );
};

export default Home;