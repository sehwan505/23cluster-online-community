import React, { useEffect, useState } from "react";
import Comment from "components/Comment"
import axios from "axios"
import {authService} from "fbase";
import { useHistory, Link } from "react-router-dom";


function Detail({userObj, refreshUser, post_id}){
  const [commentContent , setCommentContent] = useState("");
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const history = useHistory();
  const id = post_id.match.params.id;


useEffect(async() => {
  try {
        const res = await fetch(`http://localhost:8000/api/detail/${id}`);
        const posts = await res.json();
        setPost(posts);
        const res1 = await fetch(`http://localhost:8000/api/detail_comment/${id}`);
        const comments = await res1.json();
        setComment(comments)
        console.log(comments);

    } 
    catch (e) {
        console.log(e);
    }
}, []);


  const onSubmit = async (event) => {
    event.preventDefault();
    if(commentContent === ""){
      document.getElementsByName("comment").focus();
    }
    await axios.post(`http://127.0.0.1:8000/api/add_comment/${id}/`, {
        post_id:id,
        content:commentContent,
        writer_id:userObj.uid,
        writer_name:userObj.displayName,
        depth:0 
    }).then((response) => {
    // 응답 처리
    })
    .catch((error) => {
    // 예외 처리
    })
    window.location.reload();
    
  }
  const onChangeContent = (event) => {
    const {
      target: { value },
    } = event;
    setCommentContent(value);
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
              value={commentContent}
              placeholder="고쳐라"
              type="text"
              onChange={onChangeContent}
              name="comment"
            />
            <input type="submit" value="에딧"/>
        </form>
    </div>
    <table border="1">
        <th>
          <tr>글쓴이 :{post.writer_name}</tr>
        </th>
          <td>
            <tr>제목 : {post.title}</tr>
                
          </td>
          <tfoot>
            <tr>내용 : {post.content}</tr>
          </tfoot>
     </table>

     {comment.map((comment) => (
        <Comment key={comment.comment_id} comment={comment} isOwner={userObj.uid === comment.writer_id} userObj={userObj} id={id}/>
      ))}
    </>
  );
};

export default Detail;