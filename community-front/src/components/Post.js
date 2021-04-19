    import React from "react";
    import axios from "axios";
    import {Link} from "react-router-dom";
	import Table from '@material-ui/core/Table';
	import TableHead from '@material-ui/core/TableHead';
	import TableBody from '@material-ui/core/TableBody';
	import TableRow from '@material-ui/core/TableRow';
	import TableCell from '@material-ui/core/TableCell';

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
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>글쓴이</TableCell>
							<TableCell>제목</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					<TableRow>
							<TableCell>{post.writer_name}</TableCell>
							<TableCell>
								<Link to={`/detail/${post.id}`}>
									{post.title}
								</Link>
							</TableCell>
							<TableCell>
							{isOwner && (
							<>
							<button onClick={onDeleteClick}>삭제</button>
							</>)
							}
							</TableCell>
							</TableRow>
					</TableBody>
				</Table>
			</div>
            </>
          }
        </div>
      );
    };
    
    export default Post;
    