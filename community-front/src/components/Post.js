    import React from "react";
    import {Link} from "react-router-dom";
	import "../css/common.css";
	import timeForToday from "./TimeForToday.js";

    const Post = ({ post, isOwner }) => {
	  const created_at = timeForToday(post.created_at);
      const color = ['white','red', 'yellow', 'blue', 'purple'];

      return (
        <div>
          {
            <>
			<Link to={`/detail/${post.id}`}>
			<div className={`issue-row-wrap2 ${color[post.category_calculated]}`}>
				<ul className="nrml">
				<li>
					<table>
					<tbody>
					<tr>
						<td rowSpan="2"><i className="bi bi-hand-thumbs-up"></i>{post.like_num}</td>
						<td>
						{post.title}<span>[{post.view_num}]</span>
						<img src={require("../img/mark-backdrop.jpg").default} alt={"오류"}/>
						</td>
						<td>{created_at}</td>
						<td>
						<img src={require("../img/mark-user.jpg").default} alt={"오류"}/>&nbsp;
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
    