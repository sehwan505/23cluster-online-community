import React from "react";
import '../css/common.css';
import Header from "../components/Header.js";
import StickyBox from "react-sticky-box";

function Home(props){
  
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
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>
        <div className="card-wrap">
          <div>
            <span>123456789</span>
            <span>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
              <i className="bi bi-circle-fill"></i>
            </span>
          </div>          
          <ul>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
            <li>
              <span>추천</span>
              <span><i className="bi bi-file-text"></i></span>
              <span>피카부는 참 아까운 재능이다 못해도 LCK4강팀 주전 서폿 노려볼만한 애인데<span>[122]</span></span>
            </li>
          </ul>
        </div>       
      </div>
    </div>
    </>
  );
};

export default Home;