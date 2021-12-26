import React, { useEffect, useState } from "react";
import '../css/common.css';
import Header from "../components/Header.js";
import StickyBox from "react-sticky-box";
import axios from "axios";
import { toast } from  "react-toastify";
import {Link} from "react-router-dom";


function Home(props){
  const [postList, setPostList] = useState({});
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(async() =>{
	async function fetchHome(){
		const res = await axios.get(`${process.env.REACT_APP_URL}/api/post/home/`);
		if (res.status === 404){
			toast.error("오류, 새로고침 해주세요");
			window.location.href = '/';
		}
		setPostList(res.data);
	  }
	fetchHome();
  },[]);
  
  return (
    <>
    {/*<div align="center">
      <Link to="/profile">프로필</Link>
    </div>
    <div>
      <span>
        {props.user.username}
      </span>
	  <button onClick={props.handleLogout}>로그아웃</button>
    </div>
    <div>
		<DraftEditor user={props.user}/>
    </div>
    <div>
        {nweet.map((post) => (
            <Post key={post.id} post={post} isOwner={props.user.user_pk === post.writer_id}/>
        ))}
    </div>*/}
	
	<div>
      <Header user={props.user} num={0} handleLogout={props.handleLogout} isAuthenticated={props.isAuthenticated}/>
      <div className="body-wrap no-border">
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
        <div className="card-wrap">
          <div>
            <span>시사 게시판</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
			{postList.section1 && postList.section1.map((post, index)=>{
				return(
					<>
					<Link to={`/detail/${post.id}`}>
					<li>
					{index < 3 ?
						<span className="recommend">추천</span>
						:
						<span className="recommend2">관심</span>
					}			
					<span><i className="bi bi-file-text"></i></span>
					<span>{post.title}<span>[{post.view_num}]</span></span>
					</li>
					</Link>
					</>
				);
			}
			)}
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>유머 게시판</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
		  {postList.section2 && postList.section2.map((post, index)=>{
				return(
					<>
					<Link to={`/detail/${post.id}`}>
					<li>
					{index < 3 ?
						<span className="recommend">추천</span>
						:
						<span className="recommend2">관심</span>
					}			
					<span><i className="bi bi-file-text"></i></span>
					<span>{post.title}<span>[{post.view_num}]</span></span>
					</li>
					</Link>
					</>
				);
			}
			)}
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>스포츠 게시판</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
		  {postList.section4 && postList.section4.map((post, index)=>{
				return(
					<>
					<Link to={`/detail/${post.id}`}>
					<li>
					{index < 3 ?
						<span className="recommend">추천</span>
						:
						<span className="recommend2">관심</span>
					}			
					<span><i className="bi bi-file-text"></i></span>
					<span>{post.title}<span>[{post.view_num}]</span></span>
					</li>
					</Link>
					</>
				);
			}
			)}
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>연예 게시판</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
			{postList.section3 && postList.section3.map((post, index)=>{
				return(
					<>
					<Link to={`/detail/${post.id}`}>
					<li>
					{index < 3 ?
						<span className="recommend">추천</span>
						:
						<span className="recommend2">관심</span>
					}			
					<span><i className="bi bi-file-text"></i></span>
					<span>{post.title}<span>[{post.view_num}]</span></span>
					</li>
					</Link>
					</>
				);
			}
			)}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;