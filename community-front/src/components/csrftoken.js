import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'; 
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; 

function getCookie(name) { 
	var cookieValue = null; 
	if (document.cookie && document.cookie !== '') 
	{ 
		var cookies = document.cookie.split(';'); 
		for (var i = 0; i < cookies.length; i++) 
		{ 
			var cookie = cookies[i].replace(' ', ''); 
			if (cookie.substring(0, name.length + 1) === (name + '=')) 
			{ 
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
				break; 
			} 
		} 
	} 
	return cookieValue; 
} 
const CSRFToken = () => { 
	const csrftoken = getCookie('csrftoken');
	return(csrftoken) 
}; 

export default CSRFToken // 이걸로 <CSRFToken/>이라는 컴포넌트를 사용할 수 있게 됨.