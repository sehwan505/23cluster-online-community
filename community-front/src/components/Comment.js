import React, {useState} from "react";
import axios from "axios";



const Comment = ({ comment, isOwner, userObj, id }) => {
  const [commentContent , setCommentContent] = useState("");
  const [editing, setEditing] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if(commentContent === ""){
      document.getElementsByName("comment").focus();
    }
    await axios.post(`http://127.0.0.1:8000/api/add_comment/${id}/`, {
        post_id: id,
        content: commentContent,
        writer_id: userObj.uid,
        writer_name: userObj.displayName,
        parent_comment_id: comment.comment_id,
        depth:1
    }).then((response) => {
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
  const onDeleteClick = async () => {
    const ok = window.confirm("진짜 지울거임?");
    if (ok) {
        await axios.post(`http://127.0.0.1:8000/api/delete_comment/${comment.comment_id}/`, {
        }).then((response) => {
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
              </th>
              <tfoot>
                <tr>내용 : {comment.content}</tr>
              </tfoot>
          </table>
          </button>
          )
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
          {isOwner && (
          <>
          <button onClick={onDeleteClick}>삭제</button>
          </>)
          }
        </>
      }
    </div>
  );
};

export default Comment;
