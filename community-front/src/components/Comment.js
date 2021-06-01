import React, {useState} from "react";
import axios from "axios";
import CSRFToken from "../components/csrftoken.js";
import timeForToday from "./TimeForToday.js";
import { useHistory } from "react-router";


const Comment = ({ comment, isOwner, user, post_id, isAuthenticated }) => {
  const [commentContent , setCommentContent] = useState("");
  const [editing, setEditing] = useState(false);
  const created_at = timeForToday(comment.created_at);
  const history = useHistory();
  const color = ['white','red', 'yellow', 'blue', 'purple'];

  const onSubmit = async (event) => {
    event.preventDefault();
    if(commentContent === ""){
		alert("댓글 내용이 없습니다");
		return ;
	}
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
    var csrftoken = CSRFToken();
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
    await axios.post(`http://13.124.51.99:80/api/post/add_comment/${post_id}/`, {
        post_id:post_id,
		parent_comment_id:comment.comment_id,
        content:commentContent,
        writer_id:user.user_pk,
        writer_name:user.username,
		writer_category:user.category,
        depth:1,
		csrfmiddlewaretoken	: csrftoken
    }, config).then((response) => {
    // 응답 처리
    })
    .catch((error) => {
    // 예외 처리
    })
    toggleEditing();
	history.go(0);
  }

  const onChangeContent = (event) => {
    const {
      target: { value },
    } = event;
    setCommentContent(value);
  }
  
  const onLikeClick = async () => {
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
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
	await axios.post(`http://13.124.51.99:80/api/post/like_comment/${comment.comment_id}/`, {
		category: user.category
	}, config).then((response) => {
	// 응답 처리
	})
	.catch((error) => {
	  console.log(error);
	})
	history.go(0);
  }
  const onUnlikeClick = async () => {
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
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
	await axios.post(`http://13.124.51.99:80/api/post/unlike_comment/${comment.comment_id}/`, {
		category: user.category
	}, config).then((response) => {
	// 응답 처리
	})
	.catch((error) => {
	  console.log(error);
	})
	history.go(0);
  }

  const onDeleteClick = async () => {
    const ok = window.confirm("진짜 지우시겠습니까?");
    if (ok) {
		const config = {
			headers: {
				'Authorization' : `JWT ${localStorage.getItem('token')}`	
			}
		}
        await axios.post(`http://13.124.51.99:80/api/post/delete_comment/${comment.comment_id}/`, {
        }, config).then((response) => {
        // 응답 처리
        })
        .catch((error) => {
          console.log(error);
        })
    }
    history.go(0);
  };
  const toggleEditing = () => setEditing((prev) => !prev);
{/*<span><img src={require("img/icon-link.jpg").default} className="link" />&nbsp;&nbsp;댓글로가기</span>&nbsp;&nbsp;&nbsp;*/} 
  return (
    <div>
        {
          <>          
          { comment.depth ?
          (
			<>
				<table className="board-view-table sub-depth" style={{tableLayout:"fixed"}}>
				<colgroup>
					<col width="75%"/>
					<col width="*"/>
				</colgroup>
				<tbody>
				<tr></tr>
				<tr>
				<td className="bat-comment-row row-top">
					<img src={require("../img/icon-comment-arrow.jpg").default} className="comment-arrow" alt={"오류"} />&nbsp;&nbsp;
					<span className={`profile-picture-${comment.writer_category}`}></span>
					<label className="form-check-label" htmlFor="flexCheckDefault">
						{comment.writer_name}
					</label>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<span className="time">{created_at}</span>
				</td>
				<td className="bat-comment-row">

					{
						user.user_comment_like.includes(parseFloat(comment.comment_id)) ?
						(
							<>
								<span onClick={onLikeClick}><img src={require("../img/icon-like2.jpg").default} alt={"오류"} style={{cursor:"pointer"}}/>&nbsp;{comment.like_num}</span>&nbsp;&nbsp;
							</>
						):
						(
							<>
								<span onClick={onLikeClick}><img src={require("../img/icon-like2-on.jpg").default} alt={"오류"} style={{cursor:"pointer"}}/>&nbsp;{comment.like_num}</span>&nbsp;&nbsp;
							</>
						)
					}
					{
						user.user_comment_unlike.includes(parseFloat(comment.comment_id)) ?
						(
							<>
								<span onClick={onUnlikeClick}><img src={require("../img/icon-hate2.jpg").default} alt={"오류"} className="hate" style={{cursor:"pointer"}} />&nbsp;{comment.unlike_num}</span>&nbsp;&nbsp;
							</>
						):
						(
							<>
								<span onClick={onUnlikeClick}><img src={require("../img/icon-hate2-on.jpg").default} alt={"오류"} className="hate" style={{cursor:"pointer"}} />&nbsp;{comment.unlike_num}</span>&nbsp;&nbsp;
							</>
						)
					}
				</td>
				</tr>
				<tr>
				<td className="bat-comment-row content2">
					{comment.content}
				</td>
				<td className="bat-comment-row caret" style={{paddingLeft:"21%"}}>
					<div className="btn-group dropstart three-dot">
					<span data-bs-toggle="dropdown" style={{cursor: "pointer"}}><img className="more" src={require("img/icon-more.jpg").default} alt={"오류"} /></span>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						{isOwner &&
						<div className="dropdown-item" onClick={onDeleteClick} style={{cursor: "pointer"}}>삭제</div>}
					</div>
					</div>		
				</td>
				</tr>
				</tbody>
				</table>
		  </>
          )
          : (
			<>
			<table className={`board-view-table ${color[comment.category_calculated]}`} style={{tableLayout:"fixed"}}>
			<colgroup>
				<col width="75%"/>
				<col width="*"/>
			</colgroup>
			<tbody>
			<tr></tr>
            <tr>
              <td className="bat-comment-row row-top">
                {/*<span className="best">BEST</span>&nbsp;&nbsp;*/}
				<span className={`profile-picture-${comment.writer_category}`}></span>
                <label className="form-check-label" htmlFor="flexCheckDefault">
					{comment.writer_name}
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="time">{created_at}</span>
              </td>
              <td className="bat-comment-row">
                {
					user.user_comment_like.includes(parseFloat(comment.comment_id)) ?
					(
						<>
							<span onClick={onLikeClick}><img src={require("../img/icon-like2.jpg").default} alt={"오류"} style={{cursor:"pointer"}}/>&nbsp;{comment.like_num}</span>&nbsp;&nbsp;
						</>
					):
					(
						<>
							<span onClick={onLikeClick}><img src={require("../img/icon-like2-on.jpg").default} alt={"오류"} style={{cursor:"pointer"}}/>&nbsp;{comment.like_num}</span>&nbsp;&nbsp;
						</>
					)
				}
				{
					user.user_comment_unlike.includes(parseFloat(comment.comment_id)) ?
					(
						<>
							<span onClick={onUnlikeClick}><img src={require("../img/icon-hate2.jpg").default} alt={"오류"} className="hate" style={{cursor:"pointer"}}/>&nbsp;{comment.unlike_num}</span>&nbsp;&nbsp;
						</>
					):
					(
						<>
							<span onClick={onUnlikeClick}><img src={require("../img/icon-hate2-on.jpg").default} alt={"오류"} className="hate" style={{cursor:"pointer"}} />&nbsp;{comment.unlike_num}</span>&nbsp;&nbsp;
						</>
					)
				}
              </td>
            </tr>
            <tr>
              <td className="bat-comment-row content2">
			    {comment.content}
			  </td>
              <td className="bat-comment-row caret" style={{paddingLeft:"21%"}}>
				<div className="btn-group dropstart three-dot">
				<span data-bs-toggle="dropdown" style={{cursor: "pointer"}}><img className="more" src={require("img/icon-more.jpg").default} alt={"오류"} /></span>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{isOwner &&
					<div className="dropdown-item" onClick={onDeleteClick} style={{cursor: "pointer"}}>삭제</div>}
					<div className="dropdown-item" onClick={toggleEditing} style={{cursor: "pointer"}}>대댓글 쓰기</div>
				</div>
				</div>		
			  </td>
            </tr>
			</tbody>
          	</table>
			</>
          )
          }
          {editing && (
            <>
            <table class="board-insert-table">
			<tbody>
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
						placeholder="대댓글을 남겨보세요">
				</textarea>
              </td>
            </tr>
            <tr>
              <td>
                <span onClick={onSubmit}>등록</span>
              </td>
            </tr>
			<tr>
			  {/*<td>
			  {isOwner && (
			  <>
			    <span onClick={onDeleteClick}>삭제</span>
			  </>)
			  }
			  </td>*/}
			</tr>   
			</tbody>       
            </table>
            </>
          )}
        </>
      }
    </div>
  );
};

export default Comment;
