import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/common.css';

function Header({user, num, handleLogout, isAuthenticated}) {
	const [checked, setChecked] = useState(Boolean(localStorage.getItem('checked')));
	const color = ['red', 'yellow', 'green', 'purple'];

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
              <input type="checkbox" checked={checked} onClick={checkedHandler} readOnly/>
              <span className="slider round"></span>
            </label>
			<img src={require('../img/user.png').default} />
          </li>
		  <li>
		    {isAuthenticated ? (
			<>
            <div className="btn-group caret">
			<a className="dropdown-toggle" href="#" role="button" aria-haspopup="true" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
			</a>
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            	<div className="dropdown-item" onClick={handleLogout} style={{cursor: "pointer"}}>로그아웃</div>
            	<Link to="/profile"><div className="dropdown-item">프로필</div></Link>
            	<hr />
            	<Link to="/write"><div className="dropdown-item">글쓰기</div></Link>
            	</div>
			</div>
			</>
			):
			(
			<>
			<div className="btn-group caret">
			<a className="dropdown-toggle" href="#" role="button" aria-haspopup="true" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
			</a>
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            	<Link to="/login"><div className="dropdown-item">로그인</div></Link>
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