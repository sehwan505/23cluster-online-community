import React, { useEffect, useState } from "react";
import Post from "components/Post";
import 'css/common.css';
import Header from "components/Header.js";
import { useHistory } from "react-router";
import StickyBox from "react-sticky-box";

function Search({user, handleLogout, isAuthenticated}){
	const [postList, setPostList] = useState([]);
	const [itemsCount, setItemsCount] = useState(0);
	const history = useHistory();
	const query = window.location.search;

	async function fetchSearch(){
		try {
			const res = await fetch(`http://52.78.40.184:80/api/post/search/${query}`);
			if (res.status === 404){
				alert("오류, 새로고침 해주세요");
				window.location.href = '/';
			}
			const posts = await res.json();
			setItemsCount(posts.count);
			setPostList(posts.posts);
		} 
		catch (e) {
			console.log(e);
		}
	}

  	useEffect(() => {
	  fetchSearch();
 	}, [history]);

	return (
		<>
		<div>
		<Header user={user} num={0} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
		<div className="body-wrap">
			<StickyBox offsetTop={20}>
			<div className="flox-rank-wrap">
				<div>해시태크 순위</div>
				<ul>
				<li className="on">1</li>
				<li className="on">가나다라마바사</li>
				<li>2</li>
				<li>가나다라마바사</li>
				<li>3</li>
				<li>가나다라마바사</li>              
				<li>4</li>
				<li>가나다라마바사</li>              
				<li>5</li>
				<li>가나다라마바사</li>              
				<li>6</li>
				<li>가나다라마바사</li>              
				<li>7</li>
				<li>가나다라마바사</li>              
				<li>8</li>
				<li>가나다라마바사</li>              
				<li>9</li>
				<li>가나다라마바사</li>              
				<li>10</li>
				<li>가나다라마바사</li>              
				</ul>            
			</div>
			</StickyBox>
			<div className="issue-wrap">
			<div>
				<ul>
				<li>
					<img src={require("img/btn-issue.jpg").default} alt={"오류"}/>
				</li>
				<li>
					<div>
					<select className="form-select">
						<option>제목</option>
					</select>
					</div>
					<div>
					<input type="text" placeholder="검색어" /><img src={require("img/mark-search.jpg").default} alt={"오류"}/>
					</div>                
				</li>
				</ul>            
			</div>
			</div>
			<div className="issue-row-wrap">       
				<p>{query.slice(7)}의 검색 결과입니다</p>
				<p>{itemsCount}의 검색결과</p>
			</div>
			<div className="issue-row-box">
			{postList.map((post) => (
            <Post key={post.id} post={post} isOwner={user.user_pk === post.writer_id}/>
        	))}
			</div>
			{/*<Pagination itemsCount={itemsCount} pageSize={10} currentPage={pageNum} setPageNum={setPageNum}/>*/}
		</div>
		</div>
		</>
	)
}

export default Search;