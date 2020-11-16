import React, { useEffect, useState } from "react";
import Post from "components/Post"
import axios from "axios"
import {authService} from "fbase";
import { useHistory, Link } from "react-router-dom";


function Home({userObj, refreshUser}){
  const [postTitle , setPostTitle] = useState("");
  const [postContent , setPostContent] = useState("");
  const [nweet, setNweet] = useState([]);
  const history = useHistory();


useEffect(async() => {
  try {
        const res = await fetch('http://localhost:8000/api/');
        const posts = await res.json();
        setNweet(posts);
        console.log(userObj);
    } 
    catch (e) {
        console.log(e);
    }
}, []);


  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/add/', {
        title: postTitle,
        content: postContent,
        writer_id: userObj.uid,
        writer_name: userObj.displayName 

    }).then((response) => {
    // 응답 처리
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

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    refreshUser();
  };
  return (
    <>
    <div align="center">
      <Link to="/profile">프로필</Link>
    </div>
    <div>
      <span>
        {userObj.displayName}
      </span>
      <button onClick={onLogOutClick}>로그아웃</button>
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
            <input
              value={postContent}
              placeholder="고쳐라"
              type="text"
              onChange={onChangeContent}
            />
            <input type="submit" value="에딧"/>
        </form>
    </div>
    <div>
        {nweet.map((post) => (
            <Post key={post.id} post={post} isOwner={userObj.uid === post.writer_id}/>
        ))}
    </div>
    </>
  );
};

export default Home;