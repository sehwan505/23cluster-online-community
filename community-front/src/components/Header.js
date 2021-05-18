import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/common.css';

function Header({num, handleLogout, isAuthenticated}) {
	const [checked, setChecked] = useState(localStorage.getItem('checked'));

	const checkedHandler = () =>{
		localStorage.setItem('checked', !checked);
		setChecked(!checked);
	}
	return (
		<>
		<div className="top-wrap">
        <ul>
          <Link className="logo" to="/"><li></li></Link>
          <li>
            <input type="text" placeholder="검색어" />&nbsp;
            <img src={require('../img/search.png').default} />
          </li>
          <li>
		    <span className="bubble-text">버블필터</span>
            <label className="switch">
              <input type="checkbox" checked={checked} onClick={checkedHandler}/>
              <span className="slider round"></span>
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
          </li>
		  <li>
		    {isAuthenticated ? (
			<>
            <div class="btn-group caret">
			<a class="dropdown-toggle" href="#" role="button" aria-haspopup="true" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
			</a>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            	<div class="dropdown-item" onClick={handleLogout}>로그아웃</div>
            	<Link to="/profile"><div class="dropdown-item">프로필</div></Link>
            	<hr />
            	<Link to="/write"><div class="dropdown-item">글쓰기</div></Link>
            	</div>
			</div>
			</>
			):
			(
			<>
			<div class="btn-group caret">
			<a class="dropdown-toggle" href="#" role="button" aria-haspopup="true" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
			</a>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            	<Link to="/login"><div class="dropdown-item">로그인</div></Link>
            </div>
			</div>
			</>
			)}
			
		  </li>
        </ul>        
      </div>
      <div className="nav-bar">
        <ul>
		  {
		  <>
		  <Link to="/section/1/"><li className={num === "1" ? "on" : ""}>시사</li></Link>
          <Link to="/section/2/"><li className={num == "2" ? "on" : ""}>유머</li></Link>
          <Link to="/section/3/"><li className={num == "3" ? "on" : ""}>연애</li></Link>
		  <Link to="/section/4/"><li className={num == "4" ? "on" : ""}>스포츠</li></Link>
		  <Link to="/section/5/"><li className={num == "5" ? "on" : ""}>본진</li></Link>
		  </>
		  }
		</ul>
      </div>
		</>
	)
}

export default Header;