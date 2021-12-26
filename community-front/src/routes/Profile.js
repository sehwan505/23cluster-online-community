import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../css/common.css";
import timeForToday from "components/TimeForToday"
import { useHistory } from "react-router-dom";
import { toast } from  "react-toastify";

function Profile({user, handleLogout, isAuthenticated}){
  const [newDisplayName, setNewDisplayName] = useState(user.username);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [comment, setComment] = useState([]);
  const [post, setPost] = useState([]);
  const history = useHistory();

  async function fetchComment(){
	try {
		const config = {
			headers: {
				'Authorization' : `JWT ${localStorage.getItem('token')}`	
			}
		}
		const res = await axios.post(`${process.env.REACT_APP_URL}/api/post/profile/`,{} ,config);
		setComment(res.data.comments);
		setPost(res.data.posts);
	}
	catch (e) {
		console.log(e);
	}
  }

  useEffect(()=>{
      if (user.age === 0 || user.gender === 0)
        history.push('/signup');
	  setNewDisplayName(user.username);
	  fetchComment();
  },[]);

  const onsubmit = async (event) =>{
    event.preventDefault();
    if(user.username.localeCompare(newDisplayName)){
		await axios.put(`${process.env.REACT_APP_URL}/user/profile/${user.user_pk}/update/`, {
			username: newDisplayName,
		}).then((response) => {
			toast.success("이름이 변경되었습니다");
		})
		.catch((error) => {
		// 예외 처리
		   toast.error("변경에 실패했습니다");
		})
    }
	else{
		toast.error("변경사항이 없습니다");
	}
  }
  const onSubmitIntroduction = async (event) =>{
    event.preventDefault();
    if(user.introduction.localeCompare(introduction)){
		await axios.put(`${process.env.REACT_APP_URL}/user/profile/${user.user_pk}/update/`, {
			introduction: introduction,
		}).then((response) => {
			toast.success("자기소개가 변경되었습니다");
		})
		.catch((error) => {
		// 예외 처리
	        toast.error("변경에 실패했습니다");
		})
    }
	else{
		toast.error("변경사항이 없습니다");
	}
  }
  const onChange = (event) => {
    let {
      target: { value },
    } = event;
	if (value.length > 7)
		value = value.substr(0, 7);
    setNewDisplayName(value);
  };

  const onChangeIntroduction = (event) => {
    const {
      target: { value },
    } = event;
    setIntroduction(value);
  };

  const onResignClick = async () =>{
	const ok = window.confirm("탈퇴하시면 복구가 불가능합니다. 탈퇴하시겠습니까?");
	if (ok){
		let res = await fetch(`${process.env.REACT_APP_URL}/user/resign/`, {
			headers: {
			  Authorization : `JWT ${localStorage.getItem('token')}`
			}
		});
		if (res.ok)
		{
			handleLogout();
			toast.success("탈퇴가 완료되었습니다.");
		}
		else{
			toast.error("탈퇴에 실패했습니다.\n문의 주세요.");
		}
	}
  }

  const onRefreshClick = async () => {
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
	await axios.post(`${process.env.REACT_APP_URL}/user/refresh_category/`, {
    }, config).then(()=>{
        toast.success("재평가가 완료되었습니다.");
    });
  }

  return (
    <>
	<div>
	  <Header user={user} num={0} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
      <div className="body-wrap">
        <div className="mypage-wrap">
          <ul>
            <li>
              <table>
				<tbody>
                <tr>
                  <td rowSpan="5">
				    <span className={`mypage-picture-${user.category}`} style={{background : `url(require("../img/user.png"))`}}></span>
                  </td>
                  <td>
                    <input type="text" value={newDisplayName == null ? '' : newDisplayName} onChange={onChange} maxLength={7} />
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
                  <td><span >색 바꾸기 <span>20P</span></span></td>
                </tr>
                <tr>
                  <td><span onClick={onRefreshClick}>재평가</span></td>
                </tr> 
				</tbody>                                                              
              </table>
            </li>
            <li>
              <table>
				<tbody>
                <tr>
                  <td>
                    <span><img src={require("../img/mark-book.jpg").default} alt={"오류"} /></span>
                    <span>게시글 수</span>
                    <span>{post.length}</span>
                  </td>
                  <td>
                    <span><img src={require("img/mark-point.jpg").default} alt={"오류"} /></span>
                    <span>포인트</span>
                    <span>{user.point}P</span>
                  </td>
                  <td>
                    <span><img src={require("img/mark-comment.jpg").default} alt={"오류"}/></span>
                    <span>댓글 수</span>
                    <span>{comment.length}</span>
                  </td>                  
                </tr>
				</tbody>                                                            
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
              <col width="*" />
              <col width="10%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>        
			<tbody>    
            <tr>
              <th>댓글 내용</th>
              <th>추천 수</th>
              <th>날짜</th>
              <th>
                <span>바로가기</span>
              </th>
            </tr>
			{comment.map((comment) => (
				<>
				<tr key={comment.comment_id}>
					<td>{comment.content.length > 40 ? comment.content.slice(0,40) + "..." : comment.content}</td>
					<td>{comment.like_num}</td>
					<td>{timeForToday(comment.created_at)}</td>
					<td></td>
				</tr>
				</>
		  	))}         
			</tbody>
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
			<tbody>          
            <tr>
              <th>제목</th>
              <th>포스트 내용</th>
              <th>추천 수</th>
              <th>날짜</th>
              <th>
                <span>바로가기</span>
              </th>
            </tr>
            {post.map((post) => (
				<>
				<tr key={post.id}>
					<td>{post.title}</td>
					<td>{post.content.length > 40 ? post.content.slice(0,40) + "..." : post.content}</td>
					<td>{post.like_num}</td>
					<td>{timeForToday(post.created_at)}</td>
					<td></td>
				</tr>
				</>
		  	))}     
			</tbody>         
          </table>          
        </div>
        <div className="mypage-wrap4">
          <span onClick={onResignClick}>회원탈퇴</span>
        </div>
      </div>
	</div>
    </>
  );
};

export default Profile;