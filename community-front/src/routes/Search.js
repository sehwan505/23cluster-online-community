import React, { useEffect, useState } from "react";
import Post from "components/Post";
import axios from "axios";
import 'css/common.css';
import Header from "components/Header.js";
import Pagination from "components/Pagination";
import { useHistory } from "react-router";
import StickyBox from "react-sticky-box";

function Search({user, handleLogout, isAuthenticated}){
	const [postList, setPostList] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [itemsCount, setItemsCount] = useState(0);
	const history = useHistory();
	const query = window.location.search;

	async function fetchSearch(){
		try {
			const res = await fetch(`http://localhost:8000/api/post/search/${query}`);
			if (res.status == 404){
				alert("오류, 새로고침 해주세요");
				window.location.href = '/';
			}
			const posts = await res.json();
			console.log(posts);
			setItemsCount(posts.count);
			setPostList(posts.posts);
		} 
		catch (e) {
			console.log(e);
		}
	}

  	useEffect(() => {
	  console.log(query);
	  fetchSearch();
 	}, [history]);

	 const scrollHeight = 120;
	 const scrollHeight2 = 120;
	 function sidebar(){
	 
	if(window.scrollTop > scrollHeight){
	 let top = window.scrollTop - scrollHeight + 20;
	 document.getElementById('sidebar').style.top = top +'px';
	}else{
	 document.getElementById('sidebar').style.top = '20px';
	}
	if(window.scrollTop > scrollHeight2){
	 let top = window.scrollTop - scrollHeight2 + 20;
	 document.getElementById('sidebar2').style.top = top +'px';
	}else{
	 document.getElementById('sidebar2').style.top = '20px';
	}    
	}

	const onscroll = () =>{
		sidebar();
	}

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
					<img src={require("img/btn-issue.jpg").default} />
				</li>
				<li>
					<div>
					<select className="form-select">
						<option>제목</option>
					</select>
					</div>
					<div>
					<input type="text" placeholder="검색어" /><img src={require("img/mark-search.jpg").default}/>
					</div>                
				</li>
				</ul>            
			</div>
			</div>
			<div className="issue-row-wrap">       
				<p>{query.slice(7)}의 검색 결과입니다</p>
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