import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../css/common.css";

function Profile({user, handleLogout, isAuthenticated}){
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(user.username);
  const [introduction, setIntroduction] = useState(user.introduction);

  const onsubmit = async (event) =>{
    event.preventDefault();
    if(user.username.localeCompare(newDisplayName)){
		await axios.put(`http://localhost:8000/user/profile/${user.user_pk}/update/`, {
			username: newDisplayName,
		}).then((response) => {
			alert("이름이 변경되었습니다");
		})
		.catch((error) => {
		// 예외 처리
		})
    }
	else{
		alert("변경사항이 없습니다");
	}
  }
  const onSubmitIntroduction = async (event) =>{
    event.preventDefault();
    if(user.introduction.localeCompare(introduction)){
		await axios.put(`http://localhost:8000/user/profile/${user.user_pk}/update/`, {
			introduction: introduction,
		}).then((response) => {
			alert("자기소개가 변경되었습니다");
		})
		.catch((error) => {
		// 예외 처리
		})
    }
	else{
		alert("변경사항이 없습니다");
	}
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onChangeIntroduction = (event) => {
    const {
      target: { value },
    } = event;
    setIntroduction(value);
  };

//  {/*<Link to="/">홈</Link> <br/>
//        <span>{user.username}</span>
//        <button onClick={handleLogout}>로그아웃</button>
//		<br/>
//		<button onClick={nameChange}>이름 바꾸기</button>
//		{usernameModal ? null :
//		<form onSubmit={onSubmit}>
//        	<input type="text" placeholder="이름 변경" value={newDisplayName == null ? '' : newDisplayName} onChange={onChange} />
//        	<input type="submit" value="제출"/>
//      	</form>
//		}*/}

  return (
    <>
	<div>
	  <Header user={user} num={0} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
      <div className="body-wrap">
        <div className="mypage-wrap">
          <ul>
            <li>
              <table>
                <tr>
                  <td rowSpan="5">
				    <span className="mypage-picture" style={{background : `url(require("../img/user.png"))`}}></span>
                  </td>
                  <td>
                    <input type="text" value={newDisplayName == null ? '' : newDisplayName} onChange={onChange} />
                    <span onClick={onsubmit}>변경</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" value={introduction == null ? '' : introduction} onChange={onChangeIntroduction} />
                    <span onClick={onSubmitIntroduction}>변경</span>
                  </td>
                </tr>              
                <tr>
                  <td><span>색 바꾸기 <span>20P</span></span></td>
                </tr>
                <tr>
                  <td><span>재평가</span></td>
                </tr>                                                                
              </table>
            </li>
            <li>
              <table>
                <tr>
                  <td>
                    <span><img src={require("../img/mark-book.jpg").default} /></span>
                    <span>게시글 수</span>
                    <span>5</span>
                  </td>
                  <td>
                    <span><img src={require("img/mark-point.jpg").default} /></span>
                    <span>포인트</span>
                    <span>{user.point}P</span>
                  </td>
                  <td>
                    <span><img src={require("img/mark-comment.jpg").default} /></span>
                    <span>댓글 수</span>
                    <span>10</span>
                  </td>                  
                </tr>                                                               
              </table>
            </li>            
          </ul>  
        </div>
        {/*<div className="mypage-wrap2">
          <span className="title">
            <i className="bi bi-stop-fill"></i> 베팅
          </span>
          <table className="mypage-wrap2-table">   
            <tr>
              <th colSpan="3">
                부먹 &nbsp;&nbsp;&nbsp;VS &nbsp;&nbsp;&nbsp;찍먹
              </th>
            </tr>
            <tr>
              <td className="gage-bar-wrap bd-green">
                <div>
                  <table>
                    <colgroup>
                      <col width="20%" />
                      <col width="80%" className="bg-green" />
                    </colgroup>
                    <tr>
                      <td scope="col"></td>
                      <td scope="col"></td>
                    </tr>
                  </table>
                  <span>80%</span>
                </div>
                <div>
                  <span>50%</span>
                  <table>
                    <colgroup>
                      <col width="50%" className="bg-green" />
                      <col width="50%" />
                    </colgroup>
                    <tr>
                      <td scope="col"></td>
                      <td scope="col"></td>
                    </tr>
                  </table>
                </div>
              </td>
              <td className="mypage-wrap2-table-td2">
                <span>D-day <span>5</span></span>
                <span>종료</span>
              </td>
              <td className="mypage-wrap2-table-td3">
                <span>베팅 포인트</span>
                <span>50p</span>
              </td>                            
            </tr>                                                            
          </table>          
        </div>

        <div className="mypage-wrap2">
          <span className="title">
            <i className="bi bi-stop-fill"></i> 베팅
          </span>
          <table className="mypage-wrap2-table">   
            <tr>
              <th colSpan="3">
                부먹 &nbsp;&nbsp;&nbsp;VS &nbsp;&nbsp;&nbsp;찍먹
              </th>
            </tr>
            <tr>
              <td className="gage-bar-wrap bd-yellow">
                <div>
                  <table>
                    <colgroup>
                      <col width="20%" />
                      <col width="80%" className="bg-yellow" />
                    </colgroup>
                    <tr>
                      <td scope="col"></td>
                      <td scope="col"></td>
                    </tr>
                  </table>
                  <span>80%</span>
                </div>
                <div>
                  <span>50%</span>
                  <table>
                    <colgroup>
                      <col width="50%" className="bg-yellow" />
                      <col width="50%" />
                    </colgroup>
                    <tr>
                      <td scope="col"></td>
                      <td scope="col"></td>
                    </tr>
                  </table>
                </div>
              </td>
              <td className="mypage-wrap2-table-td2">
                <span>D-day <span>5</span></span>
                <span>종료</span>
              </td>
              <td className="mypage-wrap2-table-td3">
                <span>베팅 포인트</span>
                <span>50p</span>
              </td>                            
            </tr>                                                            
          </table>          
        </div>*/}

        <div className="mypage-wrap3">
          <span className="title">
            <i className="bi bi-stop-fill"></i> 내가 쓴 댓글
          </span>
          <table className="mypage-wrap3-table">
            <colgroup>
              <col width="20%" />
              <col width="*" />
              <col width="10%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>            
            <tr>
              <th>제목</th>
              <th>댓글 내용</th>
              <th>추천 수</th>
              <th>날짜</th>
              <th>
                <span>바로가기</span>
              </th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>             
          </table>          
        </div>

        <div className="mypage-wrap3">
          <span className="title">
            <i className="bi bi-stop-fill"></i> 내가 쓴 게시글
          </span>
          <table className="mypage-wrap3-table">
            <colgroup>
              <col width="20%" />
              <col width="*" />
              <col width="10%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>            
            <tr>
              <th>제목</th>
              <th>댓글 내용</th>
              <th>추천 수</th>
              <th>날짜</th>
              <th>
                <span>바로가기</span>
              </th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>             
          </table>          
        </div>
        <div className="mypage-wrap4">
          <span>회원탈퇴</span>
        </div>
      </div>
	</div>
    </>
  );
};

export default Profile;