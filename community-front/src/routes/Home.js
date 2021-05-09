import React, { useEffect, useState } from "react";
import Post from "components/Post"
import axios from "axios"
import CSRFToken from "../components/csrftoken.js"
import { useHistory, Link } from "react-router-dom";


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
    <div align="center">
      <Link to="/profile">프로필</Link>
    </div>
    <div>
      <span>
        {props.user.username}
      </span>
	  <button onClick={props.handleLogout}>로그아웃</button>
    </div>
    <div>
        <form onSubmit={onSubmit}>
            <input
              value={postTitle}
              placeholder="제목"
              type="text"
              onChange={onChangeTitle}
            />
            <br/>
            <textarea
              value={postContent}
              placeholder="내용"
              type="text"
              onChange={onChangeContent}
            >
			</textarea>
            <input type="submit" value="에딧"/>
        </form>
    </div>
    <div>
        {nweet.map((post) => (
            <Post key={post.id} post={post} isOwner={props.user.user_pk === post.writer_id}/>
        ))}
    </div>
    </>
  );
};

export default Home;