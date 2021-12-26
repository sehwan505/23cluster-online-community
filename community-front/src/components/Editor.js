import React, {useState, useEffect} from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import { toast } from  "react-toastify";
import 'css/input.css';
import CSRFToken from "../components/csrftoken.js";
import {useHistory} from "react-router-dom";

const DraftEditor = ({user, handleLogout}) => {
  const editorRef = React.createRef();
  const [postTitle , setPostTitle] = useState("");
  const [section , setSection] = useState("1");
  const [hashtag, setHashtag] = useState("");
  const history = useHistory();

//  const handleClick = (event) => {
//	event.preventDefault();
//    setContent({
//      content: editorRef.current.getInstance().getMarkdown(),
//    });
//  };

  const onSubmit = async (event) => {
    event.preventDefault();
	if (postTitle === "")
	{
		toast.error("제목이 없습니다");
		return ;
	}
	if(editorRef.current.getInstance().getMarkdown() === ""){
		toast.error("내용이 없습니다");
		return ;
	}
	var csrftoken = CSRFToken();
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
    await axios.post(`${process.env.REACT_APP_URL}/api/post/add/`, {
        title: postTitle,
        content: editorRef.current.getInstance().getMarkdown(),
        writer_id: user.user_pk,
        writer_name: user.username,
		writer_category:user.category,
		section : section,
		hashtag : hashtag,
		csrfmiddlewaretoken	: csrftoken
    }, config).then((response) => {
	  history.push('/');
    })
    .catch((error) => {
    // 예외 처리
      toast.error("오류가 발생했습니다.");
      handleLogout();
      console.log(error);
	})
  }

  const onChangeTitle = (event) => {
    const {
      target: { value },
      
    } = event;
    setPostTitle(value);
  }

  const onChangeHashtag = (event) => {
    const {
      target: { value },
    } = event;
    setHashtag(value);
  }

  const onChangeSection = (event) => {
    const {
      target: { value },
    } = event;
    setSection(value);
	console.log(value);
  }

  const uploadImage = (blob) => {
	let formData = new FormData();
    formData.append('image', blob, blob.name);
    formData.append('image_name', blob.name);
    let csrftoken = CSRFToken();
    return axios(`${process.env.REACT_APP_URL}/api/post/upload_image/`, { //fetch는 안됨? 그냥 axios쓰는 걸로
        method: 'POST',
		headers: {
			'Content-Type' : 'multipart/form-data' ,
			'Authorization' : `JWT ${localStorage.getItem('token')}`
		},
        data: formData,
    })
    .then(res => {
        return (res);
    });
  }

  const onAddImageBlob = (blob, callback) => {
    uploadImage(blob)
        .then(response => {
            console.log(response);
            callback(`https://23cluster.s3.ap-northeast-2.amazonaws.com/${response.data.url}`, 'alt text');
        }).catch(error => {
            console.log(error);
        });
};

  return (
    <>
    <div className="editor">
		<h1 style={{"margin-top" : "15px"}} className="input_title">글쓰기</h1>
		<div style={{"margin-left" : "10px"}}>
			<div className="inputbox">
				<p>제목</p>
				<input className="textbox1" type="text" minlength="5" value={postTitle}
					placeholder="글을 한 마디로 정리해줄 수 있는 제목을 적어주세요." name="title" onChange={onChangeTitle}
					maxLength={40}/>
			</div>
			<div className="inputbox">
				<p>카테고리	</p>
				<div className="category_box">
				<select name="section" onChange={onChangeSection} value={section} >
					<option value="1">시사</option>
					<option value="2">유머</option>
					<option value="3">연예</option>
					<option value="4">스포츠</option>
					<option value="5">비밀</option>
				</select>
			</div>
		</div>
		<div className="inputbox">
			<p>해시태그</p>
			<input className="textbox1" type="text" minlength="5" value={hashtag}
				placeholder="해시태그 최대 3개 #해시태그" name="title" onChange={onChangeHashtag}
				maxLength={40}/>
		</div>
		</div>
	  <br/><br/>
      <Editor
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        placeholder="글쓰기"
		name="content"
        hideModeSwitch={true}
        ref={editorRef}
		hooks={{
			addImageBlobHook: onAddImageBlob
		}}
      />
	  <span onClick={onSubmit}>글쓰기</span>
    </div>
    </>
  );
};
export default DraftEditor;