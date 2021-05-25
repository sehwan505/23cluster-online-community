    import React from "react";
    import axios from "axios";
    import {Link} from "react-router-dom";
	import "../css/common.css";
	import timeForToday from "./TimeForToday.js";

    const Post = ({ post, isOwner }) => {
	  const created_at = timeForToday(post.created_at);
	  
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
			<Link to={`/detail/${post.id}`}>
			<div className="issue-row-wrap2 green">
				<ul className="nrml">
				<li>
					<table>
					<tbody>
					<tr>
						<td rowSpan="2"><i className="bi bi-hand-thumbs-up"></i>{post.like_num}</td>
						<td>
						{post.title}<span>[{post.view_num}]</span>
						<img src={require("../img/mark-backdrop.jpg").default} />
						</td>
						<td>{created_at}</td>
						<td>
						<img src={require("../img/mark-user.jpg").default} />&nbsp;
						{post.writer_name}
						</td>
					</tr>
					</tbody>
					</table>
				</li>            
				</ul>          
			</div>
			</Link>
            </>
          }
		</div>
      );
    };
    
    export default Post;
    