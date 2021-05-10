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
            <table border="3" style={{marginLeft:'50px', backgroundColor:'white'}}>
              <th>
                <tr>depth : {comment.depth}</tr>
                <tr>id : {comment.parent_comment_id}</tr>
                <tr>글쓴이 :{comment.writer_name}</tr>
				<tr>좋아요 수 : {comment.like_num}</tr>
              </th>
              <tfoot>
                <tr>  내용 : {comment.content}</tr>
              </tfoot>
          </table>
          )          
          : (
          <button onClick={toggleEditing}>
          <table border="1">

              <th>
                <tr>depth : {comment.depth}</tr>
                <tr>id : {comment.parent_comment_id}</tr>
                <tr>글쓴이 :{comment.writer_name}</tr>
				<tr>좋아요 수 : {comment.like_num}</tr>
              </th>
              <tfoot>
                <tr>내용 : {comment.content}</tr>
              </tfoot>
          </table>
          </button>
          )
          }
		  {user.user_comment_like.includes(comment.comment_id) ?
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
