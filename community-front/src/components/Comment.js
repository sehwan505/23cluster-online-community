import React, {useState} from "react";
import axios from "axios";
import CSRFToken from "../components/csrftoken.js";


const Comment = ({ comment, isOwner, user, post_id }) => {
  const [commentContent , setCommentContent] = useState("");
  const [editing, setEditing] = useState(false);

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
    await axios.post(`http://127.0.0.1:8000/api/post/add_comment/${post_id}/`, {
        post_id:post_id,
		parent_comment_id:comment.comment_id,
        content:commentContent,
        writer_id:user.user_pk,
        writer_name:user.username,
        depth:1,
		csrfmiddlewaretoken	: csrftoken
    }, config).then((response) => {
    // 응답 처리
    })
    .catch((error) => {
    // 예외 처리
    })
    toggleEditing();
    window.location.reload();
  }

  const onChangeContent = (event) => {
    const {
      target: { value },
    } = event;
    setCommentContent(value);
  }
  
  const onLikeClick = async () => {
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
	await axios.post(`http://127.0.0.1:8000/api/post/like_comment/${comment.comment_id}/`, {
	}, config).then((response) => {
	// 응답 처리
	})
	.catch((error) => {
	  console.log(error);
	})
	window.location.reload();
  }

  const onDeleteClick = async () => {
    const ok = window.confirm("진짜 지울거임?");
    if (ok) {
		const config = {
			headers: {
				'Authorization' : `JWT ${localStorage.getItem('token')}`	
			}
		}
        await axios.post(`http://127.0.0.1:8000/api/post/delete_comment/${comment.comment_id}/`, {
        }, config).then((response) => {
        // 응답 처리
        })
        .catch((error) => {
          console.log(error);
        })
    }
    window.location.reload();
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <div>
      {
          <>          
          { comment.depth ?
          (
			<>
			<div onClick={toggleEditing}>
				<table className="board-view-table sub-depth">
				<tr>
				<td className="bat-comment-row row-top">
					<img src={require("../img/icon-comment-arrow.jpg").default} className="comment-arrow" />&nbsp;&nbsp;
					<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
					<label className="form-check-label" for="flexCheckDefault">
						{comment.writer_name}
					</label>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<span className="time">2시간 전</span>
				</td>
				<td className="bat-comment-row">
					<span><img src={require("../img/icon-link.jpg").default} className="link" />&nbsp;&nbsp;댓글로가기</span>&nbsp;&nbsp;&nbsp;
					<span><img src={require("../img/icon-like2.jpg").default} />&nbsp;49</span>&nbsp;&nbsp;
					<span><img src={require("img/icon-hate2.jpg").default} className="hate" />&nbsp;49</span>
				</td>
				</tr>
				<tr>
				<td className="bat-comment-row content2">
					{comment.content}
				</td>
				<td className="bat-comment-row">
					<span><img src={require("img/icon-more.jpg").default} /></span>
				</td>
				</tr>
				</table>
			</div>
		  </>
            
          )          
          : (
			<>
			<table className="board-view-table yellow">
            <tr>
              <td className="bat-comment-row row-top">
                <span className="best">BEST</span>&nbsp;&nbsp;
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" for="flexCheckDefault">
					{comment.writer_name}
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="time">2시간 전</span>
              </td>
              <td className="bat-comment-row">
                <span><img src={require("img/icon-link.jpg").default} className="link" />&nbsp;&nbsp;댓글로가기</span>&nbsp;&nbsp;&nbsp;
                <span><img src={require("img/icon-like2.jpg").default} />&nbsp;49</span>&nbsp;&nbsp;
                <span><img src={require("img/icon-hate2.jpg").default} className="hate" />&nbsp;49</span>
              </td>
            </tr>
            <tr>
              <td className="bat-comment-row content2">
			    {comment.content}
			  </td>
              <td className="bat-comment-row">
                <span><img src={require("img/icon-more.jpg").default} /></span>
              </td>
            </tr>
          	</table>
			</>
          )
          }
		  { user &&  
		  (
			user.user_comment_like.includes(comment.comment_id) ?
			(
				<>
					<button onClick={onLikeClick}>취소</button>
				</>
			):
			(
				<>
					<button onClick={onLikeClick}>좋아요</button>
				</>
			)		  
		  )
		  }
		  {isOwner && (
          <>
          <button onClick={onDeleteClick}>삭제</button>
          </>)
          }
          {editing && (
            <>
            <form onSubmit={onSubmit}>
            <input
              value={commentContent}
              placeholder="대댓글"
              type="text"
              onChange={onChangeContent}
              name="comment"
            />
            <input type="submit" value="에딧"/>
            </form>
            </>
          )}
        </>
      }
    </div>
  );
};

export default Comment;
