import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../css/common.css";

function Profile({user, handleLogout, isAuthenticated}){
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(user.username);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [usernameModal, setUsernameModal] = useState(true);

  const onSubmit = async (event) =>{
    event.preventDefault();
    if(user.username !== newDisplayName){
		await axios.put(`http://localhost:8000/user/profile/${user.user_pk}/update/`, {
			username: newDisplayName
		}).then((response) => {
			console.log("Ab");
		})
		.catch((error) => {
		// 예외 처리
		})
    }
	window.location.reload();
  }
  const onSubmitIntroduction = async (event) =>{
    event.preventDefault();
    if(user.introduction !== introduction){
		await axios.put(`http://localhost:8000/user/profile/${user.user_pk}/update/`, {
			introduction: introduction
		}).then((response) => {
			console.log("Ab");
		})
		.catch((error) => {
		// 예외 처리
		})
    }
	window.location.reload();
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

  const nameChange = () =>{
	setUsernameModal(!(usernameModal));
  }

  return (
    <>
        {/*<Link to="/">홈</Link> <br/>
        <span>{user.username}</span>
        <button onClick={handleLogout}>로그아웃</button>
		<br/>
		<button onClick={nameChange}>이름 바꾸기</button>
		{usernameModal ? null :
		<form onSubmit={onSubmit}>
        	<input type="text" placeholder="이름 변경" value={newDisplayName == null ? '' : newDisplayName} onChange={onChange} />
        	<input type="submit" value="제출"/>
      	</form>
		}*/}
		<div>
		<Header num={0} isAuthenticated={isAuthenticated}/>
		<div className="mypage-wrap">
          <ul>
            <li>
              <table>
                <tr>
                  <td rowspan="5">
					<span className="mypage-picture" style={{background : `url(require("../img/user.png"))`}}></span>
                    {/*<span className="mypage-picture" style={{background:url(data:image/jpeg;base64,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)}}></span>*/}
                  </td>
				  <td>
					<form onSubmit={onSubmit}>	
						<input type="text" value={newDisplayName == null ? '' : newDisplayName} onChange={onChange} />
						<button>변경</button>
					</form>
                  </td>
                </tr>
                <tr>
				  <td>
					<form onSubmit={onSubmitIntroduction}>	 
						<input type="text" value="123"  value={introduction == null ? '' : introduction} onChange={onChangeIntroduction}/>
						<button>변경</button>
					</form>
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
                    <span><img src={require("img/mark-book.jpg").default} /></span>
                    <span>게시글 수</span>
                    <span>5</span>
                  </td>
                  <td>
                    <span><img src={require("img/mark-point.jpg").default} /></span>
                    <span>포인트</span>
                    <span>{user.point}p</span>
                  </td>
                  <td>
                    <span><img src={require("img/mark-comment.jpg").default} /></span>
                    <span>댓글 수</span>
                    <span>10 </span>
                  </td>                  
                </tr>                                                               
              </table>
            </li>            
          </ul>  
        </div>
        <div className="mypage-wrap2">
          <span className="title">
            <i className="bi bi-stop-fill"></i> 베팅
          </span>
          <table className="mypage-wrap2-table">   
            <tr>
              <th colspan="3">
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
              <th colspan="3">
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
        </div>

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
    </>
  );
};

export default Profile;