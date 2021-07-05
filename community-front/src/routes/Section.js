import React, { useEffect, useState } from "react";
import Post from "components/Post";
import 'css/common.css';
import Header from "components/Header.js";
import Pagination from "components/Pagination";
import StickyBox from "react-sticky-box";
import { useHistory, Link } from "react-router-dom";

function Section({user, num, handleLogout, isAuthenticated}){
	const sec_num = num.match.params.num;
	const [postList, setPostList] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [itemsCount, setItemsCount] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const history = useHistory();

	async function fetchSection(){
		try {
			let res;
            if (sec_num === "5")
            {
                if (isAuthenticated)
                {
                    res = await fetch(`https://23cluster.com/api/post/section/5/${user.category}/?page=${pageNum}`);
                }
                else
                {
                    const ok = window.confirm("로그인이 필요합니다\n로그인하시겠습니까?");
                    if (ok){
                        history.push('/login');
                        return ;
                    }
                    else{
                        history.goBack();
                        return ;
                    }
                }               
            }
            else if (localStorage.getItem('checked') === 'true')
            {
                if (isAuthenticated)
                {
                    res = await fetch(`https://23cluster.com/api/post/section/${sec_num}/${user.category}/?page=${pageNum}`);
                }
                else
                {
                    const ok = window.confirm("로그인이 필요합니다\n로그인하시겠습니까?");
                    if (ok){
                        history.push('/login');
                        return ;
                    }
                    else{
                        history.goBack();
                        return ;
                    }
                }  
            }
            else
            {
			    res = await fetch(`https://23cluster.com/api/post/section/${sec_num}/0/?page=${pageNum}`);
            }
            if (res.status === 404){
				alert("오류, 새로고침 해주세요");
				window.location.href = '/';
			}
			const posts = await res.json();
			setItemsCount(posts.count);
			setPostList(posts.results);
		} 
		catch (e) {
			console.log(e);
		}
	}

	useEffect(()=>{
	  if (pageNum === 1 && localStorage.getItem('pageNum') === '1'){
		fetchSection();
	  }
	  else{
		setPageNum(1);
		localStorage.setItem('pageNum',1);
	  }
	},[sec_num]);

  	useEffect(() => {
	  fetchSection();
 	}, [pageNum]);

	 const onChange = (event) => {
		const {
		  target: { value },
		} = event;
		setSearchQuery(value);
	};
	const search = () =>{
		if (searchQuery === "")
		{
			alert("검색어를 입력해주세요");
			return ;
		}
		history.push(`/search?query=${searchQuery}`)
	};
	return (
		<>
		<div>
		<Header user={user} num={sec_num} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
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
						{isAuthenticated && 	
						<>
						<Link to="/write"><span>글쓰기</span></Link>
						</>
						}
					</div>
					<div>
					  <input type="text" placeholder="검색어" onChange={onChange} value={searchQuery === null ? '' : searchQuery} /><img src={require("img/mark-search.jpg").default} alt={"오류"} onClick={search}/>
					</div>                
				</li>
				</ul>            
			</div>
			</div>
			<div className="issue-row-box">
			<div className="issue-row-wrap">  
				<ul className="noti">
				<li>
                    <Link to={`/detail/${37}`}> 
					<table>
					<tbody>          
					<tr>
						<td rowSpan="2"><img src={ require("../img/mark-tip.jpg").default} alt={"오류"} /></td>
						<td>공지보고 가세요</td>
					</tr>
					<tr>
						<td colSpan="2" className="newline">관리자</td>
					</tr>
					</tbody>             
					</table>
                    </Link>
				</li>
				<li>
                    <Link to={`/detail/${36}`}> 
					<table>
					<tbody>              
					<tr>
						<td rowSpan="2"><img src={ require("../img/mark-tip.jpg").default} alt={"오류"} /></td>
						<td>규칙 확인하세요</td>
					</tr>
					<tr>
						<td colSpan="2" className="newline">관리자</td>
					</tr> 
					</tbody>               
					</table>
                    </Link>
				</li>            
				</ul>
			</div>
			{postList.map((post) => (
            <Post key={post.id} post={post} isOwner={user.user_pk === post.writer_id}/>
        	))}
			</div>
			<Pagination itemsCount={itemsCount} pageSize={10} currentPage={pageNum} setPageNum={setPageNum} isComment={false}/>
		</div>
		</div>
		</>
	)
}

export default Section;