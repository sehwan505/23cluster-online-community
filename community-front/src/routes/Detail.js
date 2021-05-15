import React, { useEffect, useState } from "react";
import Comment from "components/Comment";
import Header from "../components/Header";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import CSRFToken from "../components/csrftoken.js"
import ReactMarkdown from "react-markdown";
import "../css/common.css";


function Detail({user, post_id, isAuthenticated}){
  const [commentContent , setCommentContent] = useState("");
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const history = useHistory();
  const id = post_id.match.params.id;

useEffect(async() => {
  try {
        const res = await fetch(`http://localhost:8000/api/post/detail/${id}/`);
        const posts = await res.json();
        setPost(posts);
        const res1 = await fetch(`http://localhost:8000/api/post/detail_comment/${id}/`);
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

   {/*<div>
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
      ))}*/}
  return (
	  <>
	  <div>
	  <Header num={0} isAuthenticated={isAuthenticated} />
	  <div class="body-wrap">
        <div class="flox-box" id="sidebar">
          <div class="flox-rank-wrap2">
            <table>
              <tr>
                <td>
                  <img src={require("../img/sidebar-up.jpg").default} />
                  <img src={require("../img/sidebar-down.jpg").default} />
                </td>
              </tr>
              <tr>
                <td>
                  <img src={require("img/sidebar-comment.jpg").default} />
                </td>
              </tr>              
              <tr>
                <td>
                  <img src={require("../img/sidebar-like.jpg").default} />
                  <img src={require("img/sidebar-hate.jpg").default} />
                </td>
              </tr>              
              <tr>
                <td>
                  <img src={require("img/sidebar-refresh.jpg").default} />
                </td>
              </tr>                            
            </table>           
          </div>
        </div>
        <div class="board-view-box">
          <table class="board-view-table">
            <tr>
              <td class="title">
                게시판게시판
              </td>
              <td class="depth">
                <a>1depth</a> / <a>2depth</a> / 3depth
              </td>
            </tr>
            <tr>
              <td class="subtitle">
                {post.title}
                <span>#web</span>
                <span>#UI</span>
                <span>#디자인</span>
              </td>
              <td class="date">
                2021.04.18 20:16
              </td>
            </tr>    
            <tr>
              <td class="nickname">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault" >
                    {post.writer_name}
                  </label>
                </div>
              </td>
              <td class="btn-area">
                <img src={require("../img/btn-usr-copy.jpg").default} />
                <img src={require("img/btn-report.jpg").default} />
              </td>
            </tr>
            <tr>
              <td class="tooltip-wrap" colspan="2">
                <span></span>
                <span>"* 이 게시글은 (분류)사람들이 많이보는 게시글입니다."</span>
              </td>
            </tr>             
            <tr>
              <td class="content" colspan="2"><ReactMarkdown>{post.content}</ReactMarkdown></td>
            </tr>
            <tr>
              <td class="bat-title" colspan="2">베팅 시스템</td>
            </tr>    
            <tr>
              <td class="bat-subtitle" colspan="2">주제: 탕수육</td>
            </tr>
            <tr>
              <td class="bat-stat" colspan="2">
                <table>
                  <tr>
                    <td><img src={require("img/icon-bat01.jpg").default} /></td>
                    <td>3만</td>
                    <td>3만</td>
                    <td><img src={require("img/icon-bat01.jpg").default} /></td>
                  </tr>
                  <tr>
                    <td><img src={require("img/icon-bat02.jpg").default} /></td>
                    <td>10%</td>
                    <td>10%</td>
                    <td><img src={require("img/icon-bat02.jpg").default} /></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="bat-vs" colspan="2">
                <span>찍먹</span>
                 vs
                <span>부먹</span>
              </td>
            </tr>
            <tr>
              <td class="bat-dollor" colspan="2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </td>
            </tr>
            <tr>
              <td class="bat-comment-cnt" colspan="2">
                댓글 &nbsp;&nbsp;&nbsp;<span>10</span>&nbsp;개
              </td>
            </tr>
          </table>
		  {comment.map((comment) => (
        	<Comment key={comment.comment_id} comment={comment} isOwner={user.user_pk == comment.writer_id} post_id={id} user={user}  />
		  ))}
		</div>
		<table class="board-insert-table">
            <tr>
              <td>
                <label class="form-check-label">
                  {isAuthenticated ? user.username : "로그인이 필요합니다"}
                </label>
              </td>
            </tr>           
            <tr>
              <td>
                <textarea value={commentContent}
              			type="text"
              			onChange={onChangeContent} 
						placeholder="댓글을 남겨보세요">
				</textarea>
              </td>
            </tr>
            <tr>
              <td>
                <span>등록</span>
              </td>
            </tr>
            <tr>
              <td class="paging">
                <a></a>
                <a class="on">1</a>
                <a>2</a>
                <a>3</a>
                <a>4</a>
                <a>5</a>
                <a>6</a>
                <a>7</a>
                <a>8</a>
                <a>a</a>
              </td>
            </tr>            
          </table>
        </div>
	  </div>
    </>
  );
};

export default Detail;