    import React from "react";
    import axios from "axios";
    import {Link} from "react-router-dom";

    
    const Post = ({ post, isOwner }) => {
      const onDeleteClick = async () => {
        const ok = window.confirm("진짜 지울거임?");
        if (ok) {
            await axios.post(`http://127.0.0.1:8000/api/delete/${post.id}/`, {
            }).then((response) => {
            // 응답 처리
            })
            .catch((error) => {
            // 예외 처리
            })
        }
        window.location.reload();
      };
      return (
        <div>
          {
              <>
              <table border="1">
                  <th>
                    <tr>글쓴이 :{post.writer_name}</tr>
                  </th>
                  <td>
                    <Link to={`/detail/${post.id}`}>
                    <tr>제목 : {post.title}</tr>
                    </Link>
                  </td>
                  <tfoot>
                    <tr>내용 : {post.content}</tr>
                  </tfoot>
              </table>
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
    
    export default Post;
    