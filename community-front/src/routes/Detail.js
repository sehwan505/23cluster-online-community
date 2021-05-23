import React, { useEffect, useState } from "react";
import Comment from "components/Comment";
import Header from "components/Header";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import CSRFToken from "components/csrftoken.js"
import Post from "components/Post";
import ReactMarkdown from "react-markdown";
import "../css/common.css";
import Pagination from "components/Pagination"
import timeForToday from "components/TimeForToday"
import StickyBox from "react-sticky-box";


function Detail({user, post_id, handleLogout ,isAuthenticated}){
  const [commentContent , setCommentContent] = useState("");
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [postList, setPostList] = useState([]);
  const [pageNum, setPageNum] = useState(localStorage.getItem('pageNum') ? localStorage.getItem('pageNum') : 1);
  const [itemsCount, setItemsCount] = useState(0);
  const [commentItemsCount, setCommentItemsCount] = useState(0);
  const [commentPageNum, setCommentPageNum] = useState(1);
  const history = useHistory();
  const section_name = ['','시사', '유머', '연예', '스포츠','본진'];
  const id = post_id.match.params.id;

  async function fetchComment(){
	try {
		const res2 = await fetch(`http://localhost:8000/api/post/detail_comment/${id}/?page=${commentPageNum}`);
		const comments = await res2.json();
		setComment(comments.results);
		setCommentItemsCount(comments.count);
	}
	catch (e) {
		console.log(e);
	}
  }
  
  useEffect(async() => {
		try {
			window.scrollTo(0,0);
			const res = await fetch(`http://localhost:8000/api/post/detail/${id}/`)
			const posts = await res.json()
			setPost(posts);
			if (commentPageNum == 1){
				fetchComment();
			}
			else{
				setCommentPageNum(1);
			}
		}
		catch (e) {
			console.log(e);
		}

}, [post_id]);

useEffect(() => {
	fetchComment();
}, [commentPageNum]);

useEffect(async() => {
	try{
		const res = await fetch(`http://localhost:8000/api/post/detail/${id}/`)
		const posts = await res.json()
		const res1 = await fetch(`http://localhost:8000/api/post/section/${posts.section}/?page=${pageNum}`);
		const post_list = await res1.json();
		if (res1.status == 404){
			alert("오류, 새로고침 해주세요");
			window.location.href = '/';
		}
		setItemsCount(post_list.count);
		setPostList(post_list.results);
		console.log(user);
	}
	catch(e){
		console.log(e);
	}
},[pageNum]);

const onSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated){
		const ok = window.confirm("로그인이 필요합니다\n로그인하시겠습니까?");
		if (ok){
			history.push('/login');
			return ;
		}
		else{
			return ;
		}
	}
	if(commentContent === ""){
      document.getElementsByName("comment").focus();
	  return ;
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
	history.go(0);
  }
  const onChangeContent = (event) => {
    const {
      target: { value },
    } = event;
    setCommentContent(value);
  };
  const url_copy = () => {
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = window.location.href;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
  };
  

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
	  <Header user={user} num={post.section} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
	  <div class="body-wrap">
		<StickyBox offsetTop={20}>
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
		</StickyBox>
        <div class="board-view-box">
          <table class="board-view-table">
            <tr>
              <td class="title">
                {section_name[post.section]}게시판
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
                {timeForToday(post.created_at)}
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
                <span onClick={url_copy}><img src={require("../img/btn-usr-copy.jpg").default} /></span>
                <span><img src={require("img/btn-report.jpg").default} /></span>
              </td>
            </tr>
            <tr>
              <td class="tooltip-wrap" colSpan="2">
                <span></span>
                <span>"* 이 게시글은 (분류)사람들이 많이보는 게시글입니다."</span>
              </td>
            </tr>             
            <tr>
              <td class="content" colSpan="2"><ReactMarkdown>{post.content}</ReactMarkdown></td>
            </tr>
            <tr>
              <td class="bat-title" colSpan="2">베팅 시스템</td>
            </tr>    
            <tr>
              <td class="bat-subtitle" colSpan="2">주제: 탕수육</td>
            </tr>
            <tr>
              <td class="bat-stat" colSpan="2">
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
              <td class="bat-vs" colSpan="2">
                <span>찍먹</span>
                 vs
                <span>부먹</span>
              </td>
            </tr>
            <tr>
              <td class="bat-dollor" colSpan="2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </td>
            </tr>
            <tr>
              <td class="bat-comment-cnt" colSpan="2">
                댓글 &nbsp;&nbsp;&nbsp;<span>{commentItemsCount}</span>&nbsp;개
              </td>
            </tr>
          </table>
		  {comment.map((comment) => (
        	<Comment key={comment.comment_id} comment={comment} isOwner={user.user_pk == comment.writer_id} post_id={id} user={user} isAuthenticated={isAuthenticated} />
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
                <span onClick={onSubmit}>등록</span>
              </td>
            </tr>
			<tr>
			</tr>
          </table>
		  <Pagination itemsCount={commentItemsCount} pageSize={10} currentPage={commentPageNum} setPageNum={setCommentPageNum}/>
		  <div class="issue-row-box">
          <div class="issue-row-wrap2-top">
            {isAuthenticated && 	
			  <>
			  <Link to="/write"><span>글쓰기</span></Link>
              </>
            }
		  </div>  
          {postList.map((post) => (
            <Post key={post.id} post={post} isOwner={user.user_pk === post.writer_id} />
        	))} 
          <Pagination itemsCount={itemsCount} pageSize={10} currentPage={pageNum} setPageNum={setPageNum}/>
          <table class="board-search-wrap">
            <tr>
              <td>
                <div>
                  <select class="form-select">
                    <option>제목</option>
                  </select>
                </div>
                <div>
                  <input type="text" placeholder="검색어" /><img src={require("img/mark-search.jpg").default} />
                </div>                
              </td>           
            </tr>
          </table><br/><br/><br/>
        </div>
        </div>
	  </div>
    </>
  );
};

export default Detail;