import React from "react";

//useeffect가 특정 변수의 update에만 반응하도록 만든 함수
const useEffectOnlyOnUpdate = (callback, dependencies) => {
	const didMount = React.useRef(false);
   
	React.useEffect(() => {
	  if (didMount.current) {
		callback(dependencies);
	  } else {
		didMount.current = true;
	  }
	}, [callback, dependencies]);
  };

export default useEffectOnlyOnUpdate;