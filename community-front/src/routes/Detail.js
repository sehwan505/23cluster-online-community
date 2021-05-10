import React, { useEffect, useState } from "react";
import Comment from "components/Comment"
import axios from "axios"
import { useHistory, Link } from "react-router-dom";
import CSRFToken from "../components/csrftoken.js"
import ReactMarkdown from "react-markdown";


function Detail({user, post_id}){
  const [commentContent , setCommentContent] = useState("");
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const history = useHistory();
  const id = post_id.match.params.id;

useEffect(async() => {
  try {
        const res = await fetch(`http://localhost:8000/api/post/detail/${id}`);
        const posts = await res.json();
        setPost(posts);
        const res1 = await fetch(`http://localhost:8000/api/post/detail_comment/${id}`);
        const comments = await res1.json();
        setComment(comments)
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
	var csrftoken = CSRFToken();
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
    await axios.post(`http://127.0.0.1:8000/api/post/add_comment/${id}/`, {
        post_id:id,
        content:commentContent,
        writer_id:user.user_pk,
        writer_name:user.username,
        depth:0,
		csrfmiddlewaretoken	: csrftoken
    }, config).then((response) => {
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

  return (
    <>
    <div>
      <span>
        {user.username}
      </span>
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
            <tr>내용 : <ReactMarkdown>{post.content}</ReactMarkdown></tr>
          </tfoot>
     </table>

     {comment.map((comment) => (
        <Comment key={comment.comment_id} comment={comment} isOwner={user.user_pk == comment.writer_id} post_id={id} user={user}  />
      ))}
    </>
  );
};

export default Detail;