import React, { useEffect, useState, useRef } from "react";
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
  const focusRef = useRef([React.createRef(), React.createRef()]);

  async function fetchComment(){
	try {
		const res2 = await fetch(`http://13.124.51.99:80/api/post/detail_comment/${id}/?page=${commentPageNum}`);
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
			const res = await fetch(`http://13.124.51.99:80/api/post/detail/${id}/`)
			const posts = await res.json()
			setPost(posts);
			if (commentPageNum === 1){
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
		const res = await fetch(`http://13.124.51.99:80/api/post/detail/${id}/`)
		const posts = await res.json()
		if (res.status === 404){
			alert("오류, 새로고침 해주세요");
			window.location.href = '/';
		}
		const res1 = await fetch(`http://13.124.51.99:80/api/post/section/${posts.section}/?page=${pageNum}`);
		const post_list = await res1.json();
		if (res1.status === 404){
			alert("오류, 새로고침 해주세요");
			window.location.href = '/';
		}
		setItemsCount(post_list.count);
		setPostList(post_list.results);
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
      alert("댓글 내용이 없습니다");
	  return ;
    }
	var csrftoken = CSRFToken();
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
    await axios.post(`http://13.124.51.99:80/api/post/add_comment/${id}/`, {
        post_id:id,
        content:commentContent,
        writer_id:user.user_pk,
        writer_name:user.username,
        writer_category:user.category,
		depth:0,
		csrfmiddlewaretoken	: csrftoken,
    }, config).then((response) => {
    // 응답 처리	
    })
    .catch((error) => {
	  alert("오류 발생");
	})
	history.go(0);
  }
  const onDeleteClick = async () => {
    const ok = window.confirm("진짜 지우시겠습니까?");
	if (post.writer_id !== user.user_pk)
		return ;
    if (ok) {
		const config = {
			headers: {
				'Authorization' : `JWT ${localStorage.getItem('token')}`	
			}
		}
        await axios.post(`http://13.124.51.99:80/api/post/delete_post/${id}/`, {
        }, config).then((response) => {
		  alert('삭제 완료');
		  history.push('/');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  };
  const onChangeContent = (event) => {
    const {
      target: { value },
    } = event;
    setCommentContent(value);
  };
  const urlCopy = () => {
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = window.location.href;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
  };
  const sidebarUp = () =>{
	window.scrollTo(0,0);
  }
  const sidebarDown = () =>{
	focusRef.current[0].current.scrollIntoView({behavior:"smooth"});
  }
  const sidebarComment = () =>{
	focusRef.current[1].current.scrollIntoView({behavior:"smooth"});
  }
  const sidebarRefresh = () =>{
	history.go(0);
  }
  const sidebarLike = async () => {
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
	if (user.user_post_like.includes(parseInt(id))){
		alert("이미 좋아요를 누르셨습니다.");
		return ;
	}
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
	await axios.post(`http://13.124.51.99:80/api/post/like_post/${id}/`, {
	}, config).then((response) => {
	// 응답 처리
	})
	.catch((error) => {
	  console.log(error);
	})
	history.go(0);
  }
  const sidebarUnlike = async () => {
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
	if (user.user_post_unlike.includes(parseInt(id))){
		alert("이미 싫어요를 누르셨습니다.");
		return ;
	}
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
	await axios.post(`http://13.124.51.99:80/api/post/unlike_post/${id}/`, {
	}, config).then((response) => {
	// 응답 처리
	})
	.catch((error) => {
	  console.log(error);
	})
	history.go(0);
  }
//  <td className="bat-title" colSpan="2">베팅 시스템</td>
//  </tr>    
//  <tr>
//	<td className="bat-subtitle" colSpan="2">주제: 탕수육</td>
//  </tr>
//  <tr>
//	<td className="bat-stat" colSpan="2">
//	  <table>
//		<tr>
//		  <td><img src={require("img/icon-bat01.jpg").default} /></td>
//		  <td>3만</td>
//		  <td>3만</td>
//		  <td><img src={require("img/icon-bat01.jpg").default} /></td>
//		</tr>
//		<tr>
//		  <td><img src={require("img/icon-bat02.jpg").default} /></td>
//		  <td>10%</td>
//		  <td>10%</td>
//		  <td><img src={require("img/icon-bat02.jpg").default} /></td>
//		</tr>
//	  </table>
//	</td>
//  </tr>
//  <tr>
//	<td className="bat-vs" colSpan="2">
//	  <span>찍먹</span>
//	   vs
//	  <span>부먹</span>
//	</td>
//  </tr>
//  <tr>
//	<td className="bat-dollor" colSpan="2">
//	  <span>1</span>
//	  <span>2</span>
//	  <span>3</span>
//	  <span>4</span>
//	  <span>5</span>
//	</td>
//  </tr>
  return (
	  <>
	  <div>
	  <Header user={user} num={post.section} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
	  <div className="body-wrap">
		<StickyBox offsetTop={20}>
          <div className="flox-rank-wrap2">
            <table>
			<tbody>
              <tr>
                <td>
                  <img src={require("../img/sidebar-up.jpg").default} alt={"오류"} onClick={sidebarUp} />
                  <img src={require("../img/sidebar-down.jpg").default} alt={"오류"} onClick={sidebarDown}/>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={require("img/sidebar-comment.jpg").default} alt={"오류"} onClick={sidebarComment} />
                </td>
              </tr>              
              <tr>
                <td>
                  <img src={require("../img/sidebar-like.jpg").default} alt={"오류"} onClick={sidebarLike}/>
                  <img src={require("img/sidebar-hate.jpg").default} alt={"오류"} onClick={sidebarUnlike}/>
                </td>
              </tr>              
              <tr>
                <td>
                  <img src={require("img/sidebar-refresh.jpg").default} alt={"오류"}  onClick={sidebarRefresh} />
                </td>
              </tr>
			  </tbody>                            
            </table>           
          </div>
		</StickyBox>
        <div className="board-view-box">
          <table className="board-view-table">
			<tbody>
            <tr>
              <td className="title">
                {section_name[post.section]}게시판
              </td>
              <td className="depth">
                <a>1depth</a> / <a>2depth</a> / 3depth
              </td>
            </tr>
            <tr>
              <td className="subtitle">
                {post.title}
                {post.hashtag1 && <span>#{post.hashtag1}</span>}
                {post.hashtag2 && <span>#{post.hashtag2}</span>}
                {post.hashtag3 && <span>#{post.hashtag3}</span>}
              </td>
              <td className="date">
                {timeForToday(post.created_at)}
              </td>
            </tr>    
            <tr>
              <td className="nickname">
                <div className="form-check">
				  <span className={`profile-picture-${post.writer_category}`}></span>
                  <label className="form-check-label" htmlFor="flexCheckDefault" >
                    {post.writer_name}
                  </label>
                </div>
              </td>
              <td className="btn-area">
                <span onClick={urlCopy} style={{cursor:"pointer"}}><img src={require("../img/btn-usr-copy.jpg").default} alt={"오류"} /></span>
                <span><img src={require("img/btn-report.jpg").default} alt={"오류"} /></span>
				{parseInt(post.writer_id) === parseInt(user.user_pk) &&
				  <button onClick={onDeleteClick}>삭제</button>
				}
			  </td>
            </tr>
            <tr>
              <td className="tooltip-wrap" colSpan="2">
                <span></span>
                <span>"* 이 게시글은 (분류)사람들이 많이보는 게시글입니다."</span>
              </td>
            </tr>             
            <tr>
              <td className="content" colSpan="2"><ReactMarkdown>{post.content}</ReactMarkdown></td>
            </tr>
            <tr>
              <td className="bat-comment-cnt" colSpan="2" ref={focusRef.current[0]}>
                댓글 &nbsp;&nbsp;&nbsp;<span>{commentItemsCount}</span>&nbsp;개
              </td>
            </tr>
			</tbody>
          </table>
		  {comment.map((comment) => (
        	<Comment key={comment.comment_id} comment={comment} isOwner={parseInt(user.user_pk) === parseInt(comment.writer_id)} post_id={id} user={user} isAuthenticated={isAuthenticated} />
		  ))}
		</div>
		<table className="board-insert-table">
			<tbody>
            <tr>
              <td ref={focusRef.current[1]}>
                <label className="form-check-label">
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
			</tbody>
          </table>
		  <Pagination itemsCount={commentItemsCount} pageSize={10} currentPage={commentPageNum} setPageNum={setCommentPageNum} isComment={true}/>
		  <div className="issue-row-box">
          <div className="issue-row-wrap2-top">
            {isAuthenticated && 	
			  <>
			  <Link to="/write"><span>글쓰기</span></Link>
              </>
            }
		  </div>  
          {postList.map((post) => (
            <Post key={post.id} post={post} isOwner={user.user_pk === post.writer_id} />
        	))} 
          <Pagination itemsCount={itemsCount} pageSize={10} currentPage={pageNum} setPageNum={setPageNum} isComment={false}/>
          <table className="board-search-wrap">
			<tbody>
            <tr>
              <td>
                <div>
                  <input type="text" placeholder="검색어" /><img src={require("img/mark-search.jpg").default} alt={"오류"} />
                </div>                
              </td>           
            </tr>
			</tbody>
          </table><br/><br/><br/>
        </div>
        </div>
	  </div>
    </>
  );
};

export default Detail;