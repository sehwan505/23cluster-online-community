import React, {useState, useEffect} from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import CSRFToken from "../components/csrftoken.js";
import {useHistory} from "react-router-dom";

const DraftEditor = ({user}) => {
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
		alert("제목이 없습니다");
		return ;
	}
	if(editorRef.current.getInstance().getMarkdown() === ""){
		alert("내용이 없습니다");
		return ;
	}
	var csrftoken = CSRFToken();
	const config = {
		headers: {
			'Authorization' : `JWT ${localStorage.getItem('token')}`	
		}
	}
    await axios.post('https://23cluster.com/api/post/add/', {
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
    formData.append('image', blob);
    console.log(blob);
    let csrftoken = CSRFToken();
    return fetch('https://23cluster.com/api/post/upload_image/', {
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
            callback("https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE", 'alt text');
        }).catch(error => {
            console.log(error);
        });
};

  return (
    <>
    <div className="editor">
	  <input
        value={postTitle}
        placeholder="제목"
        type="text"
		name="title"
        onChange={onChangeTitle}
      />
	  <select name="section" onChange={onChangeSection} value={section} >
			<option value="1">시사</option>
			<option value="2">유머</option>
			<option value="3">연예</option>
			<option value="4">스포츠</option>
			<option value="5">본진</option>
	  </select>
	  <br />
	  <input
        value={hashtag}
        placeholder="해시태그 최대 3개"
        type="text"
        onChange={onChangeHashtag}
      />
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