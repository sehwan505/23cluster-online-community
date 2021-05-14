    import React from "react";
    import axios from "axios";
    import {Link} from "react-router-dom";
	import "../css/common.css";

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
			<Link to={`/detail/${post.id}`}>
			<div className="issue-row-wrap2 green">
				<ul className="nrml">
				<li>
					<table>
					<tbody>
					<tr>
						<td rowSpan="2"><i className="bi bi-hand-thumbs-up"></i>15</td>
						<td>
						{post.title}<span>[122]</span>
						<img src={require("../img/mark-backdrop.jpg").default} />
						</td>
						<td>1분 전</td>
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
    