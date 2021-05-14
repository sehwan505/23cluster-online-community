import React, { useEffect, useState } from "react";
import Post from "components/Post";
import axios from "axios";
import '../css/common.css';
import Header from "../components/Header.js";

function Section({user, num}){
	const sec_num = num.match.params.num;
	const [nweet, setNweet] = useState([]);  
  
  	useEffect(async() => {
	  try {
		  const res = await fetch('http://localhost:8000/api/post');
		  const posts = await res.json();
		  setNweet(posts);
	  } 
	  catch (e) {
		  console.log(e);
	  }
 	}, []);
	return (
		<>
		<div>
		<Header num={sec_num}/>
		<div class="body-wrap">
			<div class="flox-box" id="sidebar2">
			<div class="flox-rank-wrap">
				<div>해시태크 순위</div>
				<ul>
				<li class="on">1</li>
				<li class="on">가나다라마바사</li>
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
			</div>
			<div class="issue-wrap">
			<div>
				<ul>
				<li>
					<img src={require("img/btn-issue.jpg").default} />
				</li>
				<li>
					<div>
					<select class="form-select">
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
			<div class="issue-row-box">
			<div class="issue-row-wrap">       
				<ul class="noti">
				<li>
					<table>              
					<tr>
						<td rowspan="2"><img src={ require("../img/mark-tip.jpg").default } /></td>
						<td>좋은 팁 쓰고 문화상품권 받아가세요!</td>
					</tr>
					<tr>
						<td colspan="2" class="newline">2일 잔 kein</td>
					</tr>                
					</table>
				</li>
				<li>
					<table>              
					<tr>
						<td rowspan="2"><img src={ require("../img/mark-tip.jpg").default } /></td>
						<td>좋은 팁 쓰고 문화상품권 받아가세요!</td>
					</tr>
					<tr>
						<td colspan="2" class="newline">2일 잔 kein</td>
					</tr>                
					</table>
				</li>            
				</ul>
			</div>
			{nweet.map((post) => (
            <Post key={post.id} post={post} isOwner={user.user_pk === post.writer_id}/>
        	))}
			</div>
		</div>
		</div>
		</>
	)
}

export default Section;