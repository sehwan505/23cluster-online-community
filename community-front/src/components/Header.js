import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/common.css';

function Header({num, isAuthenticated}) {
	return (
		<>
		<div class="top-wrap">
        <ul>
          <Link className="logo" to="/"><li></li></Link>
          <li>
            <input type="text" placeholder="검색어" />&nbsp;
            <img src={require('../img/search.png').default} />
          </li>
          <li>
		    <span class="bubble-text">버블필터</span>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
			{isAuthenticated ? (
			<>
            <Link to='/profile'><img src={require('../img/user.png').default} /></Link>
			</>
			):
			(
			<>
			<Link to='/login'><img src={require('../img/user.png').default} /></Link>
			</>
			)}
			{/*<div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                    <li><a class="dropdown-item" href="/logout">로그아웃</a></li>
                    <li><a class="dropdown-item" href="/profile">프로필</a></li>        
                </ul>
            </div>*/}
			<i class="bi bi-caret-down-fill"></i>
          </li>
        </ul>        
      </div>
      <div class="nav-bar">
        <ul>
		  {
		  <>
		  <Link to="/section/1"><li class={num === "1" ? "on" : ""}>정치</li></Link>
          <Link to="/section/2"><li class={num == "2" ? "on" : ""}>게임</li></Link>
          <Link to="/section/3"><li class={num == "3" ? "on" : ""}>연애</li></Link>
		  <Link to="/section/4"><li class={num == "4" ? "on" : ""}>유머</li></Link>
		  </>
		  }
		</ul>
      </div>
		</>
	)
}

export default Header;